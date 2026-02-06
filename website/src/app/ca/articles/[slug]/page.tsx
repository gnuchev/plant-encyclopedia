import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaArticleBySlug, getAllCaSlugs } from "@/lib/caArticles";
import ArticleLayout from "@/components/ArticleLayout";
import "../../../articles/[slug]/article.css";

export function generateStaticParams() {
  return getAllCaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getCaArticleBySlug(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function CaArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getCaArticleBySlug(slug);

  if (!article) notFound();

  return <ArticleLayout title={article.title} content={article.content} />;
}
