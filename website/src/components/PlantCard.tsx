import type { Plant } from "@/lib/types";
import PlantGallery from "./PlantGallery";

export default function PlantCard({ plant }: { plant: Plant }) {
  const images = plant.images?.filter(Boolean) ?? [];

  return (
    <div className="plant-card">
      {images.length > 0 && (
        <PlantGallery images={images} name={plant.common_name} />
      )}
      <div className="plant-card-body">
        <div className="plant-card-header">
          <h3 className="plant-card-name">{plant.common_name}</h3>
          <span className="plant-card-category">{plant.category}</span>
        </div>
        <p className="plant-card-botanical">
          <em>{plant.botanical_name}</em>
        </p>
        <p className="plant-card-desc">{plant.description}</p>
      </div>
    </div>
  );
}
