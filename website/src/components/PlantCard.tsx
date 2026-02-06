import type { Plant } from "@/lib/types";

export default function PlantCard({ plant }: { plant: Plant }) {
  return (
    <div className="plant-card">
      <div className="plant-card-header">
        <h3 className="plant-card-name">{plant.common_name}</h3>
        <span className="plant-card-category">{plant.category}</span>
      </div>
      <p className="plant-card-botanical">
        <em>{plant.botanical_name}</em>
      </p>
      <p className="plant-card-desc">{plant.description}</p>
    </div>
  );
}
