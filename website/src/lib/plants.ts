import plantsData from "../../content/data/plants_encyclopedia.json";
import type { Plant, PlantsData } from "./types";

const CATEGORY_ORDER = [
  "Palms",
  "Bromeliads",
  "Crotons",
  "Copper Leaves (Acalypha)",
  "Shrubs & Hedges",
  "Accent Plants",
  "Tropical Foliage",
  "Ferns",
  "Ground Covers & Low Plants",
  "Flowering Trees",
  "Tropical Specialty",
];

export function getAllPlants(): Plant[] {
  return (plantsData as PlantsData).plants;
}

export function getPlantsByCategory(): { category: string; plants: Plant[] }[] {
  const plants = getAllPlants();
  const grouped = new Map<string, Plant[]>();

  for (const plant of plants) {
    const list = grouped.get(plant.category) || [];
    list.push(plant);
    grouped.set(plant.category, list);
  }

  return CATEGORY_ORDER.filter((cat) => grouped.has(cat)).map((cat) => ({
    category: cat,
    plants: grouped.get(cat)!,
  }));
}

export function getMetadata() {
  return (plantsData as PlantsData).metadata;
}
