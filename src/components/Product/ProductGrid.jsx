import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Print Dragón",
    price: 150,
    image: "/assets/images/prints/ranita.jpg",
    formats: ["A4", "A3", "50x70"],
  },
  {
    id: 2,
    name: "Print Serpiente",
    price: 28000,
    image: "/assets/images/prints/michi.jpg",
    formats: ["A4", "A3"],
  },
  {
    id: 3,
    name: "Print Tigre",
    price: 32000,
    image: "/assets/images/prints/flor.jpg",
    formats: ["A4", "A3", "70x100"],
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
