interface Heading {
  level: number;
  text: string;
  id: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const rawText = match[2];
      const text = rawText.replace(/\*\*/g, "").replace(/\*/g, "").trim();
      headings.push({ level, text, id: slugify(text) });
    }
  }

  return headings;
}

export default function TableOfContents({ content }: { content: string }) {
  const headings = extractHeadings(content);

  if (headings.length === 0) return null;

  return (
    <nav className="toc">
      <h4 className="toc-title">On this page</h4>
      <ul className="toc-list">
        {headings.map((h, i) => (
          <li key={i} className={h.level === 3 ? "toc-sub" : ""}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
