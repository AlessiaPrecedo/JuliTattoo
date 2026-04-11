import { useState } from "react";
import { useCart } from "../../context/useCart";

export default function ProductDetail({ product }) {
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
    <section>
      <img src={product.image} alt={product.name} />

      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>

      <div>
        {product.formats.map((format) => (
          <button key={format} onClick={() => setSelectedFormat(format)}>
            {format}
          </button>
        ))}
      </div>

      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </section>
  );
}
