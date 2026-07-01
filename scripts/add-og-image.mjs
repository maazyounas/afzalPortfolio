import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../src/app');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('openGraph: {') && !content.includes('images: [')) {
    content = content.replace(/openGraph:\s*{/g, 'openGraph: {\n    images: ["/opengraph-image"],');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated OG Image: ${filePath}`);
  }
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
console.log('Done adding og:image explicitly to all pages!');
