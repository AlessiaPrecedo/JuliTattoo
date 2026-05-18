import { useState } from "react";
import ImageLightbox from "../components/ui/ImageLightbox";
import "../styles/galeria.css";

const images = [
  "/tattoo/tattoo1.jpg",
  "/tattoo/tattoo2.jpg",
  "/tattoo/tattoo3.jpg",
  "/tattoo/tattoo4.jpg",
  "/tattoo/tattoo5.jpg",
  "/tattoo/tattoo6.jpg",
];

export default function Galeria() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const lightboxImages = images.map((src, index) => ({
    src,
    alt: `Tattoo ${index + 1}`,
  }));

  return (
    <>
      <div className="galeria">
        <section className="galeria__hero">
          <div className="galeria__ornament galeria__ornament--top">
            <span>*</span>
            <span className="galeria__ornament-line" />
            <span>*</span>
          </div>

          <span className="galeria__section-label">Portfolio</span>
          <h1 className="galeria__title">Galeria</h1>
          <p className="galeria__subtitle">
            Una seleccion de mis trabajos recientes
          </p>

          <div className="galeria__ornament galeria__ornament--bottom">
            <span>*</span>
            <span className="galeria__ornament-line" />
            <span>*</span>
          </div>
        </section>

        <section className="galeria__grid">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              className="galeria__item"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Abrir foto ${index + 1}`}
            >
              <img src={src} alt={`Tattoo ${index + 1}`} />
              <span className="galeria__overlay">
                <span>Ver</span>
              </span>
            </button>
          ))}
        </section>
      </div>

      <ImageLightbox
        images={lightboxImages}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </>
  );
}
