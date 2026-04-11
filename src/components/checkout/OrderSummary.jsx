import { useCart } from "../../context/useCart";

export default function OrderSummary() {
  const { cartItems, subtotal, shipping, total } = useCart();

  const formatPrice = (value) =>
    value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });

  return (
    <div className="border rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">Resumen del pedido</h2>

      {/* Productos */}
      <div className="space-y-3">
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex items-center gap-3"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Talle: {item.size} · Cantidad: {item.quantity}
              </p>
            </div>

            <p className="font-medium">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Totales */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Envío</span>
          <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
        </div>

        <div className="flex justify-between font-semibold text-lg border-t pt-3">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
