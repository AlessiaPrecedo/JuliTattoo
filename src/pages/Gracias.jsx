import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/useCart";
import "../styles/Gracias.css";

export default function Gracias() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const hasProcessedRef = useRef(false);
  const paymentId =
    searchParams.get("payment_id") ||
    searchParams.get("collection_id") ||
    "sin-id";

  useEffect(() => {
    if (hasProcessedRef.current) return;
    hasProcessedRef.current = true;

    const rawOrder = sessionStorage.getItem("lastOrder");

    if (!rawOrder) {
      clearCart();
      return;
    }

    try {
      const orderData = JSON.parse(rawOrder);
      const items = Array.isArray(orderData.cartItems) ? orderData.cartItems : [];
      const checkoutData = orderData.checkoutData || {};

      if (items.length === 0 || !checkoutData.email) {
        clearCart();
        sessionStorage.removeItem("lastOrder");
        sessionStorage.removeItem("checkoutData");
        return;
      }

      clearCart();
      sessionStorage.removeItem("lastOrder");
      sessionStorage.removeItem("checkoutData");
    } catch (error) {
      console.error(`No se pudo procesar la orden ${paymentId}:`, error);
      clearCart();
      sessionStorage.removeItem("lastOrder");
      sessionStorage.removeItem("checkoutData");
    }
  }, [clearCart, paymentId]);

  return (
    <main className="thank-you-page">
      <section className="thank-you-page__card">
        <p className="thank-you-page__eyebrow">Pago aprobado</p>

        <h1 className="thank-you-page__title">Gracias por tu compra</h1>

        <p className="thank-you-page__copy">
          Tu pago fue recibido correctamente. En breve vas a poder seguir
          explorando la tienda o volver a la galeria. El envio se coordina
          directamente con el vendedor.
        </p>

        <div className="thank-you-page__actions">
          <Link
            to="/prints"
            className="thank-you-page__link thank-you-page__link--primary"
          >
            Seguir comprando
          </Link>

          <Link
            to="/galeria"
            className="thank-you-page__link thank-you-page__link--secondary"
          >
            Ver galeria
          </Link>
        </div>
      </section>
    </main>
  );
}
