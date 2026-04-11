import { useState } from "react";
import { useCart } from "../../context/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedFormat, setSelectedFormat] = useState("");

  const handleAddToCart = () => {
    if (!selectedFormat) {
      alert("Selecciona un formato");
      return;
    }

    addToCart({
      ...product,
      size: selectedFormat,
    });
  };

  return (
    <div>
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>
      <p>${product.price}</p>

      {/* Selector de formato inline */}
      <div>
        {product.formats.map((format) => (
          <button key={format} onClick={() => setSelectedFormat(format)}>
            {format}
          </button>
        ))}
      </div>

      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
}
