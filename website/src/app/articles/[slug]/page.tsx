import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getAllSlugs } from "@/lib/articles";
import ArticleLayout from "@/components/ArticleLayout";
import "./article.css";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  return <ArticleLayout title={article.title} content={article.content} />;
}
