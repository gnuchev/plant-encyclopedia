import type { Metadata } from "next";
import { getPlantsByCategory } from "@/lib/plants";
import PlantCard from "@/components/PlantCard";
import "./encyclopedia.css";

export const metadata: Metadata = {
  title: "Plant Encyclopedia",
  description:
    "Browse all 113 tropical plants organized by category: palms, crotons, bromeliads, copper leaves, and more.",
};

function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function EncyclopediaPage() {
  const categories = getPlantsByCategory();
  const totalPlants = categories.reduce(
    (sum, cat) => sum + cat.plants.length,
    0
  );

  return (
    <div className="encyclopedia-page">
      <h1 className="encyclopedia-title">Plant Encyclopedia</h1>
      <p className="encyclopedia-subtitle">
        {totalPlants} tropical plants organized by category. All data compiled
        from the True Gardener YouTube channel (Vero Beach, FL &mdash; Zone
        10A).
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
