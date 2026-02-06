import caPlantsData from "../../content/data/plants_encyclopedia_ca.json";
import type { Plant, PlantsData } from "./types";

const CA_CATEGORY_ORDER = [
  "Trees - Deciduous",
  "Trees - Evergreen",
  "Trees - Tropical/Subtropical",
  "Trees - Conifer",
  "Shrubs - Evergreen",
  "Shrubs - Deciduous",
  "Perennials",
  "Annuals",
  "Roses",
  "Ground Covers",
  "Vines",
  "Succulents",
  "Grasses - Ornamental",
  "Grasses - Lawn",
  "Bamboo",
  "Palms",
  "Tropical",
  "Edibles - Citrus",
  "Edibles - Fruit Trees",
  "Edibles - Vegetables",
  "Edibles - Herbs",
];

export function getAllCaPlants(): Plant[] {
  return (caPlantsData as PlantsData).plants;
}

export function getCaPlantsByCategory(): {
  category: string;
  plants: Plant[];
}[] {
  const plants = getAllCaPlants();
  const grouped = new Map<string, Plant[]>();

  for (const plant of plants) {
    const list = grouped.get(plant.category) || [];
    list.push(plant);
    grouped.set(plant.category, list);
  }

  return CA_CATEGORY_ORDER.filter((cat) => grouped.has(cat)).map((cat) => ({
    category: cat,
    plants: grouped.get(cat)!,
  }));
}

export function getCaMetadata() {
  return (caPlantsData as PlantsData).metadata;
}
