import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-stone prose-headings:scroll-mt-20 max-w-none article-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
