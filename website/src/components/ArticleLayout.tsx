import MarkdownRenderer from "./MarkdownRenderer";
import TableOfContents from "./TableOfContents";

export default function ArticleLayout({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  // Strip the first H1 from content since we render the title separately
  const contentWithoutTitle = content.replace(/^#\s+.+\n+/, "");

  return (
    <div className="article-page">
      <div className="article-main">
        <h1 className="article-title">{title}</h1>
        <MarkdownRenderer content={contentWithoutTitle} />
      </div>
      <aside className="article-toc">
        <TableOfContents content={content} />
      </aside>
    </div>
  );
}
