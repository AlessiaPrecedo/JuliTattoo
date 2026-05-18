import { Link } from "react-router-dom";
import { useCart } from "../../context/useCart";

export default function OrderSummary() {
  const {
    cartItems,
    subtotal,
    total,
    clearCart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const formatPrice = (value) =>
    value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });

  return (
    <div className="order-summary">
      <div className="order-summary__header">
        <div>
          <p className="order-summary__step">Paso 2</p>
          <h2>Resumen del pedido</h2>
        </div>

        {cartItems.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="order-summary__clear"
          >
            Vaciar carrito
          </button>
        )}
      </div>

      <div className="order-summary__items">
        {cartItems.length === 0 ? (
          <p className="order-summary__empty">
            Tu carrito esta vacio. Agrega productos para continuar con la compra.
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="order-summary__item"
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="order-summary__item-info">
                <p className="order-summary__item-name">{item.name}</p>
                <p className="order-summary__item-meta">
                  Formato: {item.size}
                </p>
                <div className="order-summary__qty" aria-label="Cantidad">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    aria-label={`Restar una unidad de ${item.name}`}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity + 1)
                    }
                    aria-label={`Sumar una unidad de ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="order-summary__item-actions">
                <p>
                  {formatPrice(item.price * item.quantity)}
                </p>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="order-summary__remove"
                  aria-label={`Eliminar ${item.name} del carrito`}
                  title="Eliminar producto"
                >
                  <span className="notranslate" aria-hidden="true" translate="no">
                    &times;
                  </span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Link to="/prints" className="order-summary__continue">
        Seguir viendo prints
      </Link>

      <div className="order-summary__totals">
        <div className="order-summary__row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="order-summary__row">
          <span>Envio</span>
          <span>Envio a coordinar con el vendedor</span>
        </div>

        <div className="order-summary__row order-summary__row--total">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
