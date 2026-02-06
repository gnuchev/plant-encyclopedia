import Link from "next/link";
import { getArticlesGroupedByCategory } from "@/lib/articleMeta";
import { getCaArticlesGroupedByCategory } from "@/lib/caArticleMeta";

export default function Sidebar({
  currentPath,
  onNavigate,
}: {
  currentPath?: string;
  onNavigate?: () => void;
}) {
  const flGroups = getArticlesGroupedByCategory();
  const caGroups = getCaArticlesGroupedByCategory();

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <Link href="/" onClick={onNavigate} className="sidebar-logo">
          <span className="sidebar-logo-icon">&#x1F33F;</span>
          <span className="sidebar-logo-text">
            Plants
            <br />
            <small>Encyclopedia</small>
          </span>
        </Link>
      </div>

      <div className="sidebar-links">
        <Link
          href="/"
          onClick={onNavigate}
          className={`sidebar-link ${currentPath === "/" ? "active" : ""}`}
        >
          Home
        </Link>

        <div className="sidebar-divider" />

        <div className="sidebar-region-header">Florida &mdash; Zone 10A</div>
        <Link
          href="/encyclopedia"
          onClick={onNavigate}
          className={`sidebar-link ${currentPath === "/encyclopedia" ? "active" : ""}`}
        >
          Plant Encyclopedia
        </Link>

        {flGroups.map((group) => (
          <details key={group.category} className="sidebar-group" open>
            <summary className="sidebar-category">{group.category}</summary>
            <div className="sidebar-group-items">
              {group.articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  onClick={onNavigate}
                  className={`sidebar-link sub ${currentPath === `/articles/${article.slug}` ? "active" : ""}`}
                >
                  {article.title}
                </Link>
              ))}
            </div>
          </details>
        ))}

        <div className="sidebar-divider" />

        <div className="sidebar-region-header">California &mdash; Zone 9</div>
        <Link
          href="/ca/encyclopedia"
          onClick={onNavigate}
          className={`sidebar-link ${currentPath === "/ca/encyclopedia" ? "active" : ""}`}
        >
          Plant Encyclopedia
        </Link>

        {caGroups.map((group) => (
          <details key={group.category} className="sidebar-group">
            <summary className="sidebar-category">{group.category}</summary>
            <div className="sidebar-group-items">
              {group.articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/ca/articles/${article.slug}`}
                  onClick={onNavigate}
                  className={`sidebar-link sub ${currentPath === `/ca/articles/${article.slug}` ? "active" : ""}`}
                >
                  {article.title}
                </Link>
              ))}
            </div>
          </details>
        ))}
      </div>
    </nav>
  );
}
