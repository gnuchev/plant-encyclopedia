import HomeCard from "@/components/HomeCard";
import { getAllArticles } from "@/lib/articleMeta";
import { getAllPlants } from "@/lib/plants";
import "./page.css";

export default function Home() {
  const articles = getAllArticles();
  const plantCount = getAllPlants().length;

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Tropical Plants Encyclopedia</h1>
        <p className="home-subtitle">
          A comprehensive guide to tropical landscape design, plant care, and
          garden planning for <strong>USDA Zone 10A</strong>. Compiled from the{" "}
          <strong>True Gardener</strong> YouTube channel &mdash; Vero Beach,
          Florida.
        </p>
        <div className="home-stats">
          <span>{plantCount} plants cataloged</span>
          <span>{articles.length} in-depth guides</span>
          <span>Zone 10A focused</span>
        </div>
      </div>

      <div className="home-section">
        <HomeCard
          href="/encyclopedia"
          title="Plant Encyclopedia"
          description={`Browse all ${plantCount} tropical plants organized by category: palms, crotons, bromeliads, and more.`}
        />
      </div>

      <h2 className="home-section-title">Guides & References</h2>
      <div className="home-grid">
        {articles.map((article) => (
          <HomeCard
            key={article.slug}
            href={`/articles/${article.slug}`}
            title={article.title}
            description={article.description}
          />
        ))}
      </div>
    </div>
  );
}
