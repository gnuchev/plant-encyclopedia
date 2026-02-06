import type { Metadata } from "next";
import { getCaPlantsByCategory } from "@/lib/caPlants";
import PlantCard from "@/components/PlantCard";
import "../../encyclopedia/encyclopedia.css";

export const metadata: Metadata = {
  title: "California Plant Encyclopedia",
  description:
    "Browse all 280 California landscape plants organized by category. Zone 9, Mediterranean climate.",
};

function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function CaEncyclopediaPage() {
  const categories = getCaPlantsByCategory();
  const totalPlants = categories.reduce(
    (sum, cat) => sum + cat.plants.length,
    0
  );

  return (
    <div className="encyclopedia-page">
      <h1 className="encyclopedia-title">California Plant Encyclopedia</h1>
      <p className="encyclopedia-subtitle">
        {totalPlants} landscape plants organized by category. All data compiled
        from the John Valentino / John and Bob&rsquo;s YouTube channel (Fresno,
        CA &mdash; Zone 9).
      </p>

      <nav className="category-nav">
        {categories.map((cat) => (
          <a
            key={cat.category}
            href={`#${slugifyCategory(cat.category)}`}
            className="category-nav-link"
          >
            {cat.category}
            <span className="category-nav-count">{cat.plants.length}</span>
          </a>
        ))}
      </nav>

      {categories.map((cat) => (
        <section
          key={cat.category}
          id={slugifyCategory(cat.category)}
          className="category-section"
        >
          <h2 className="category-heading">
            {cat.category}
            <span className="category-count">{cat.plants.length} plants</span>
          </h2>
          <div className="plants-grid">
            {cat.plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
