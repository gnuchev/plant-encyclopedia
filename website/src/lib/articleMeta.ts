import type { ArticleMeta, CategoryGroup } from "./types";

const ARTICLE_METADATA: Record<
  string,
  { title: string; category: string; description: string; order: number }
> = {
  "design-principles": {
    title: "Design Principles & Rules",
    category: "Design",
    description:
      "14 core principles: waterfall effect, dark/light sandwiching, triangular formations, and more.",
    order: 1,
  },
  "plant-pairing-cheatsheet": {
    title: "Plant Pairing Cheat Sheet",
    category: "Design",
    description:
      "16 star plants with companion pairings, 6 complete bed recipes, and spacing rules.",
    order: 2,
  },
  "tropical-fence-planter-recipe": {
    title: "Along-the-Fence Planter Recipe",
    category: "Design",
    description:
      "5-layer planting system for creating a lush tropical privacy screen along any fence.",
    order: 3,
  },
  "no-grass-design": {
    title: "No-Grass Backyard Design",
    category: "Design",
    description:
      "Replace your lawn with gardens: philosophy, walkway materials, and a 13-step conversion plan.",
    order: 4,
  },
  "sun-shade-matrix": {
    title: "Sun/Shade Tolerance Matrix",
    category: "Plant Reference",
    description:
      "Full sun, filtered light, and shade tolerance ratings for every plant in the encyclopedia.",
    order: 1,
  },
  "rare-palm-guide": {
    title: "Rare Palm Guide",
    category: "Plant Reference",
    description:
      "9 rare and specialty palms: Carpoxylon, Kentiopsis, Cold Coconut, and more with sourcing tips.",
    order: 2,
  },
  "butterfly-garden": {
    title: "Butterfly & Pollinator Garden",
    category: "Plant Reference",
    description:
      "Top-10 butterfly plants, pollinators attracted, native designations, and bonus trees/vines.",
    order: 3,
  },
  "maintenance-calendar": {
    title: "Maintenance Calendar",
    category: "Care & Maintenance",
    description:
      "Month-by-month calendar, per-plant care notes, and emergency protocols for freeze, pests, and storms.",
    order: 1,
  },
  "common-mistakes": {
    title: "Common Mistakes & What NOT To Do",
    category: "Care & Maintenance",
    description:
      "14 categories of common landscaping mistakes with the correct approach for each.",
    order: 2,
  },
  "budget-sizing-strategy": {
    title: "Budget & Sizing Strategy",
    category: "Care & Maintenance",
    description:
      "When to splurge on 25-gallon vs. save with 3-gallon, propagation tips, and sourcing advice.",
    order: 3,
  },
  "bromeliad-mounting": {
    title: "Bromeliad Tree-Mounting Tutorial",
    category: "Tutorials",
    description:
      "Step-by-step guide to mounting bromeliads and orchids on trees: nails, wound sealing, species selection.",
    order: 1,
  },
  "hardscape-integration": {
    title: "Hardscape Integration Guide",
    category: "Hardscape & Structure",
    description:
      "Boulder types and placement, gravel, edging systems, pathways, lighting, and water features.",
    order: 1,
  },
  "microclimate-creation": {
    title: "Microclimate Creation Guide",
    category: "Hardscape & Structure",
    description:
      "Create shade zones with palms, use thermal mass, plan plant successions as your garden matures.",
    order: 2,
  },
};

const CATEGORY_ORDER = [
  "Design",
  "Plant Reference",
  "Care & Maintenance",
  "Tutorials",
  "Hardscape & Structure",
];

export function getAllArticles(): ArticleMeta[] {
  return Object.entries(ARTICLE_METADATA)
    .map(([slug, meta]) => ({ slug, ...meta }))
    .sort((a, b) => {
      const catDiff =
        CATEGORY_ORDER.indexOf(a.category) -
        CATEGORY_ORDER.indexOf(b.category);
      if (catDiff !== 0) return catDiff;
      return a.order - b.order;
    });
}

export function getArticleMeta(
  slug: string
): (typeof ARTICLE_METADATA)[string] | undefined {
  return ARTICLE_METADATA[slug];
}

export function getArticlesGroupedByCategory(): CategoryGroup[] {
  const articles = getAllArticles();
  const groups = new Map<string, ArticleMeta[]>();

  for (const article of articles) {
    const list = groups.get(article.category) || [];
    list.push(article);
    groups.set(article.category, list);
  }

  return CATEGORY_ORDER.filter((cat) => groups.has(cat)).map((cat) => ({
    category: cat,
    articles: groups.get(cat)!,
  }));
}

export function getAllSlugs(): string[] {
  return Object.keys(ARTICLE_METADATA);
}
