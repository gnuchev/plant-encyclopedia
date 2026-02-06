import Link from "next/link";
import { getArticlesGroupedByCategory } from "@/lib/articleMeta";

const CATEGORY_ICONS: Record<string, string> = {
  Design: "Design",
  "Plant Reference": "Plant Reference",
  "Care & Maintenance": "Care & Maintenance",
  Tutorials: "Tutorials",
  "Hardscape & Structure": "Hardscape & Structure",
};

export default function Sidebar({
  currentPath,
  onNavigate,
}: {
  currentPath?: string;
  onNavigate?: () => void;
}) {
  const groups = getArticlesGroupedByCategory();

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <Link href="/" onClick={onNavigate} className="sidebar-logo">
          <span className="sidebar-logo-icon">&#x1F33F;</span>
          <span className="sidebar-logo-text">
            Tropical Plants
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
        <Link
          href="/encyclopedia"
          onClick={onNavigate}
          className={`sidebar-link ${currentPath === "/encyclopedia" ? "active" : ""}`}
        >
          Plant Encyclopedia
        </Link>

        <div className="sidebar-divider" />

        {groups.map((group) => (
          <details key={group.category} className="sidebar-group" open>
            <summary className="sidebar-category">
              {CATEGORY_ICONS[group.category] || group.category}
            </summary>
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
      </div>
    </nav>
  );
}
