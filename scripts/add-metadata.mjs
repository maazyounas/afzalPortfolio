import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../src/app');

function toTitleCase(str) {
  if (!str || str === '(website)' || str === 'app') return 'Home';
  return str.replace(/[-_]/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function getPageInfo(filePath) {
  const relativePath = path.relative(rootDir, filePath);
  const dirName = path.dirname(relativePath);
  
  let urlPath = '/' + dirName.split(path.sep).filter(p => !p.startsWith('(') && p !== '.').join('/');
  if (urlPath === '//') urlPath = '/';
  
  const segments = dirName.split(path.sep).filter(p => p !== '.');
  const lastSegment = segments[segments.length - 1];
  
  let pageName = toTitleCase(lastSegment);
  
  const isDynamic = dirName.includes('[');
  
  return { urlPath, pageName, isDynamic };
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('export const metadata') || content.includes('export function generateMetadata') || content.includes('export async function generateMetadata')) {
    console.log(`Skipping (already has metadata): ${filePath}`);
    return;
  }

  if (content.match(/["']use client["']/)) {
      console.log(`Skipping (client component): ${filePath}`);
      return;
  }

  const { urlPath, pageName, isDynamic } = getPageInfo(filePath);
  
  let metadataString = '';
  
  if (isDynamic) {
    metadataString = `
export async function generateMetadata({ params }: any) {
  return {
    title: \`\${'${pageName}'} | Afzal's Portfolio\`,
    description: \`Detailed view of \${'${pageName}'} on Afzal's Portfolio.\`,
    keywords: ["portfolio", "${pageName.toLowerCase()}", "Afzal"],
    alternates: {
      canonical: \`${urlPath}\`, // Update dynamically if needed
    },
    openGraph: {
      title: \`\${'${pageName}'} | Afzal's Portfolio\`,
      description: \`Detailed view of \${'${pageName}'} on Afzal's Portfolio.\`,
      url: \`${urlPath}\`,
    },
  };
}
`;
  } else {
    metadataString = `
export const metadata = {
  title: "${pageName} | Afzal's Portfolio",
  description: "${pageName} page of Afzal's Portfolio.",
  keywords: ["portfolio", "${pageName.toLowerCase()}", "Afzal"],
  alternates: {
    canonical: "${urlPath}",
  },
  openGraph: {
    title: "${pageName} | Afzal's Portfolio",
    description: "${pageName} page of Afzal's Portfolio.",
    url: "${urlPath}",
  },
};
`;
  }

  const importRegex = /^import\s+.*?(?:from\s+['"].*?['"]|['"].*?['"]);?$/gm;
  let lastIndex = 0;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    lastIndex = match.index + match[0].length;
  }
  
  const insertIndex = lastIndex === 0 ? 0 : lastIndex + 1;
  
  const newContent = content.slice(0, insertIndex) + '\n' + metadataString + '\n' + content.slice(insertIndex);
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated: ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file === 'page.tsx') {
      processFile(filePath);
    }
  }
}

walkDir(rootDir);
console.log('Done!');
