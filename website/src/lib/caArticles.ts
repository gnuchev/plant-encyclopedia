import fs from "fs";
import path from "path";
import type { Article } from "./types";
import { getCaArticleMeta } from "./caArticleMeta";

const CA_ARTICLES_DIR = path.join(process.cwd(), "content", "ca-articles");

export function getCaArticleBySlug(slug: string): Article | null {
  const meta = getCaArticleMeta(slug);
  if (!meta) return null;

  const filePath = path.join(CA_ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, "utf-8");
  return { slug, ...meta, content };
}

// Re-export everything from caArticleMeta for convenience in server components
export {
  getAllCaArticles,
  getCaArticlesGroupedByCategory,
  getAllCaSlugs,
} from "./caArticleMeta";
