import type { ArticleMeta, CategoryGroup } from "./types";

const CA_ARTICLE_METADATA: Record<
  string,
  { title: string; category: string; description: string; order: number }
> = {
  "soil-health-microbiology": {
    title: "Soil Health & Microbiology",
    category: "Soil Science",
    description:
      "The soil food web, humic/fulvic acids, mycorrhizae, product application rates, and microscope testing methods.",
    order: 1,
  },
  "problematic-soils": {
    title: "Problematic Soil Solutions",
    category: "Soil Science",
    description:
      "Hard pan, caliche, clay, sandy, and compacted soils — biological and mechanical fixes.",
    order: 2,
  },
  "tree-pruning": {
    title: "Tree Pruning Masterclass",
    category: "Tree Care",
    description:
      "Thinning cuts vs heading back, wound sealant debunked, staking techniques, renovation pruning.",
    order: 1,
  },
  "tree-guide": {
    title: "Tree Selection & Planting Guide",
    category: "Tree Care",
    description:
      "Right tree for the space, planting technique, bathtub effect avoidance, species recommendations.",
    order: 2,
  },
  "edible-garden": {
    title: "California Edible Garden Guide",
    category: "Edible Gardening",
    description:
      "Winter/summer vegetables, citrus, herbs, raised bed soil prep, planting calendar, variety picks.",
    order: 1,
  },
  "fertilization-schedule": {
    title: "Seasonal Fertilization Schedule",
    category: "Edible Gardening",
    description:
      "Timing by soil temperature, application rates by plant type, monthly calendar, product guide.",
    order: 2,
  },
  "lawn-care": {
    title: "Lawn Care Guide (Zone 9)",
    category: "Lawn & Turf",
    description:
      "Seed vs sod, aeration, dethatching, Bermuda management, fertilization, fungal disease prevention.",
    order: 1,
  },
  "drought-tolerant": {
    title: "Mediterranean & Drought-Tolerant Planting",
    category: "Mediterranean & Drought",
    description:
      "Water-efficient design, fruitless olives, lavender, salvia, native plants, irrigation planning.",
    order: 1,
  },
  "planting-palettes": {
    title: "Plant Pairing & Planting Palettes",
    category: "Mediterranean & Drought",
    description:
      "Mediterranean, shade, Asian, drought-tolerant, and rose garden palettes with specific combinations.",
    order: 2,
  },
  "pest-disease-management": {
    title: "Organic Pest & Disease Management",
    category: "Pest & Disease",
    description:
      "Soil-first philosophy, beneficial nematodes, natural products, species-specific pest solutions.",
    order: 1,
  },
  "garden-gimmicks": {
    title: "Garden Gimmicks & Myths to Avoid",
    category: "Pest & Disease",
    description:
      "Vitamin B1, wound sealant, plastic edging, moisture meters, dog rocks — debunked with alternatives.",
    order: 2,
  },
  "outdoor-rooms": {
    title: "Outdoor Rooms & Space Design",
    category: "Design & Spaces",
    description:
      '"Gardens Are for People" philosophy, anti-foundation planting, intimate outdoor spaces.',
    order: 1,
  },
  "vines-vertical": {
    title: "Vines & Vertical Gardening",
    category: "Design & Spaces",
    description:
      "Star jasmine, trumpet vine, creeping fig, trellis systems, living walls.",
    order: 2,
  },
  "dog-friendly": {
    title: "Dog-Friendly Landscaping",
    category: "Design & Spaces",
    description:
      "Artificial turf pros/cons, rock strategies, buried drip irrigation, durable plant selections.",
    order: 3,
  },
  "hardscape-edging": {
    title: "Hardscape, Edging & Materials",
    category: "Hardscape",
    description:
      "Permalock, steel, concrete, brick edging compared; rock types, grading, rock bands for movement.",
    order: 1,
  },
  irrigation: {
    title: "Irrigation System Design",
    category: "Hardscape",
    description:
      "Head-to-head coverage, zone separation by exposure, drip systems, injectors, cost guide.",
    order: 2,
  },
  drainage: {
    title: "Drainage Solutions",
    category: "Hardscape",
    description:
      "Downspout management, solid vs perforated pipe, gravity systems, foundation protection.",
    order: 3,
  },
  "rose-care": {
    title: "Rose Care Guide",
    category: "Roses & Specialty",
    description:
      "Climbing varieties, trellis building, heavy feeding with organics, disease management.",
    order: 1,
  },
  "japanese-maples": {
    title: "Japanese Maple Varieties & Care",
    category: "Roses & Specialty",
    description:
      "Upright vs dissected forms, Fresno heat tolerance, pruning for structure, shade combinations.",
    order: 2,
  },
  "budget-diy": {
    title: "Budget & DIY Landscaping",
    category: "Practical Guides",
    description:
      "Salvaged materials, plant divisions, repurposed containers, composting, when to DIY vs hire.",
    order: 1,
  },
};

const CA_CATEGORY_ORDER = [
  "Soil Science",
  "Tree Care",
  "Edible Gardening",
  "Lawn & Turf",
  "Mediterranean & Drought",
  "Pest & Disease",
  "Design & Spaces",
  "Hardscape",
  "Roses & Specialty",
  "Practical Guides",
];

export function getAllCaArticles(): ArticleMeta[] {
  return Object.entries(CA_ARTICLE_METADATA)
    .map(([slug, meta]) => ({ slug, ...meta }))
    .sort((a, b) => {
      const catDiff =
        CA_CATEGORY_ORDER.indexOf(a.category) -
        CA_CATEGORY_ORDER.indexOf(b.category);
      if (catDiff !== 0) return catDiff;
      return a.order - b.order;
    });
}

export function getCaArticleMeta(
  slug: string
): (typeof CA_ARTICLE_METADATA)[string] | undefined {
  return CA_ARTICLE_METADATA[slug];
}

export function getCaArticlesGroupedByCategory(): CategoryGroup[] {
  const articles = getAllCaArticles();
  const groups = new Map<string, ArticleMeta[]>();

  for (const article of articles) {
    const list = groups.get(article.category) || [];
    list.push(article);
    groups.set(article.category, list);
  }

  return CA_CATEGORY_ORDER.filter((cat) => groups.has(cat)).map((cat) => ({
    category: cat,
    articles: groups.get(cat)!,
  }));
}

export function getAllCaSlugs(): string[] {
  return Object.keys(CA_ARTICLE_METADATA);
}
