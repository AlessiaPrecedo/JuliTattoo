import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Rani Tatuera",
    price: 150,
    image: "/prints/ranita.jpg",
    formats: ["A4", "A3", "50x70"],
  },
  {
    id: 2,
    name: "Michi suerte",
    price: 28000,
    image: "/prints/michi.jpg",
    formats: ["A4", "A3"],
  },
];

export default function ProductGrid() {
  return (
    <section>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
