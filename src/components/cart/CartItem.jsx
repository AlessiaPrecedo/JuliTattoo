import { useCart } from "../../context/useCart";
import QuantitySelector from "./QuantitySelector";

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.size, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity === 1) {
      removeFromCart(item.id, item.size);
      return;
    }

    updateQuantity(item.id, item.size, item.quantity - 1);
  };

  return (
    <div className="flex gap-4 border rounded-xl p-3">
      {/* Imagen */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">Talle: {item.size}</p>
        <p className="font-semibold mt-1">
          ${(item.price * item.quantity).toLocaleString("es-AR")}
        </p>

        <div className="mt-2">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item.id, item.size)}
        className="text-sm text-red-500"
      >
        ✕
      </button>
    </div>
  );
}

