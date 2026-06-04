const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "blockquote",
  "div",
  "span",
  "a",
  "h1",
  "h2",
  "h3",
  "h4",
  "code",
  "pre",
]);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeBasicEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function sanitizeHref(value: string) {
  const trimmed = value.trim();
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(trimmed)) {
    return trimmed;
  }
  return "";
}

export function sanitizeRichText(value: string) {
  if (!value) {
    return "";
  }

  let html = value.replace(/<!--[\s\S]*?-->/g, "");
  html = html.replace(/<\s*(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "");

  html = html.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (match, rawTag, rawAttributes) => {
    const tag = String(rawTag).toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) {
      return "";
    }

    if (match.startsWith("</")) {
      return `</${tag}>`;
    }

    if (tag === "br") {
      return "<br />";
    }

    if (tag === "a") {
      const hrefMatch = rawAttributes.match(/\bhref\s*=\s*["']([^"']*)["']/i);
      const titleMatch = rawAttributes.match(/\btitle\s*=\s*["']([^"']*)["']/i);
      const targetMatch = rawAttributes.match(/\btarget\s*=\s*["']([^"']*)["']/i);
      const href = hrefMatch ? sanitizeHref(hrefMatch[1]) : "";
      const title = titleMatch ? ` title="${escapeHtml(titleMatch[1])}"` : "";
      const target = targetMatch ? ` target="${escapeHtml(targetMatch[1])}"` : "";
      const rel = targetMatch?.[1] === "_blank" ? ' rel="noreferrer noopener"' : "";

      if (!href) {
        return "";
      }

      return `<a href="${escapeHtml(href)}"${title}${target}${rel}>`;
    }

    return `<${tag}>`;
  });

  return html
    .replace(/\son[a-z-]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\sstyle\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

export function stripRichText(value: string) {
  return decodeBasicEntities(
    sanitizeRichText(value)
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
  ).trim();
}

export function richTextToHtml(value: string) {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  if (/<\/?[a-z][\s\S]*>/i.test(trimmed)) {
    return sanitizeRichText(trimmed);
  }

  const paragraphs = trimmed
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

export function isEmojiLike(value?: string) {
  return Boolean(value && /[\p{Extended_Pictographic}\uFE0F]/u.test(value));
}
