import HomeCard from "@/components/HomeCard";
import { getAllArticles, getArticleMeta } from "@/lib/articleMeta";
import { getAllPlants } from "@/lib/plants";
import { getAllCaArticles, getCaArticleMeta } from "@/lib/caArticleMeta";
import { getAllCaPlants } from "@/lib/caPlants";
import "./page.css";

const FEATURED = [
  { slug: "planting-palettes", region: "ca" as const },
  { slug: "plant-pairing-cheatsheet", region: "fl" as const },
  { slug: "tropical-fence-planter-recipe", region: "fl" as const },
  { slug: "design-principles", region: "fl" as const },
  { slug: "japanese-maples", region: "ca" as const },
  { slug: "vines-vertical", region: "ca" as const },
  { slug: "outdoor-rooms", region: "ca" as const },
  { slug: "tree-guide", region: "ca" as const },
];

export default function Home() {
  const flArticles = getAllArticles();
  const flPlantCount = getAllPlants().length;
  const caArticles = getAllCaArticles();
  const caPlantCount = getAllCaPlants().length;

  const featured = FEATURED.map((f) => {
    const meta =
      f.region === "ca"
        ? getCaArticleMeta(f.slug)
        : getArticleMeta(f.slug);
    const href =
      f.region === "ca"
        ? `/ca/articles/${f.slug}`
        : `/articles/${f.slug}`;
    const badge = f.region === "ca" ? "CA" : "FL";
    return { ...meta!, slug: f.slug, href, badge };
  });

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Plants Encyclopedia</h1>
        <p className="home-subtitle">
          A comprehensive guide to landscape design, plant care, and garden
          planning. Compiled from expert YouTube channels covering{" "}
          <strong>Florida (Zone 10A)</strong> and{" "}
          <strong>California (Zone 9)</strong>.
        </p>
        <div className="home-stats">
          <span>{flPlantCount + caPlantCount} plants cataloged</span>
          <span>{flArticles.length + caArticles.length} in-depth guides</span>
          <span>Zone 10A &amp; Zone 9</span>
        </div>
      </div>

      <h2 className="home-section-title">Featured Guides</h2>
      <div className="home-grid">
        {featured.map((item) => (
          <div key={item.slug} className="featured-card-wrapper">
            <span className="featured-badge">{item.badge}</span>
            <HomeCard
              href={item.href}
              title={item.title}
              description={item.description}
            />
          </div>
        ))}
      </div>

      <div className="home-region-header">
        Florida
        <span className="home-region-badge">Zone 10A</span>
      </div>
      <div className="home-section">
        <HomeCard
          href="/encyclopedia"
          title="Plant Encyclopedia"
          description={`Browse all ${flPlantCount} tropical plants organized by category: palms, crotons, bromeliads, and more.`}
        />
      </div>
      <h2 className="home-section-title">Guides &amp; References</h2>
      <div className="home-grid">
        {flArticles.map((article) => (
          <HomeCard
            key={article.slug}
            href={`/articles/${article.slug}`}
            title={article.title}
            description={article.description}
          />
        ))}
      </div>

      <div className="home-region-header">
        California
        <span className="home-region-badge">Zone 9</span>
      </div>
      <div className="home-section">
        <HomeCard
          href="/ca/encyclopedia"
          title="Plant Encyclopedia"
          description={`Browse all ${caPlantCount} California landscape plants: trees, perennials, edibles, roses, and more.`}
        />
      </div>
      <h2 className="home-section-title">Guides &amp; References</h2>
      <div className="home-grid">
        {caArticles.map((article) => (
          <HomeCard
            key={article.slug}
            href={`/ca/articles/${article.slug}`}
            title={article.title}
            description={article.description}
          />
        ))}
      </div>
    </div>
  );
}
