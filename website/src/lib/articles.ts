import fs from "fs";
import path from "path";
import type { Article } from "./types";
import { getArticleMeta } from "./articleMeta";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export function getArticleBySlug(slug: string): Article | null {
  const meta = getArticleMeta(slug);
  if (!meta) return null;

  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, "utf-8");
  return { slug, ...meta, content };
}

// Re-export everything from articleMeta for convenience in server components
export {
  getAllArticles,
  getArticlesGroupedByCategory,
  getAllSlugs,
} from "./articleMeta";
