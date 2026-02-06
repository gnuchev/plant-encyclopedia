"use client";

import { useState } from "react";

export default function PlantGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="plant-card-gallery">
        {images.map((url, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={url}
            alt={`${name}${images.length > 1 ? ` (${i + 1})` : ""}`}
            loading="lazy"
            onClick={() => setLightbox(url)}
          />
        ))}
      </div>
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt={name} />
        </div>
      )}
    </>
  );
}
