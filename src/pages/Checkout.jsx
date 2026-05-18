import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BillingForm from "../components/checkout/BillingForm";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentButton from "../components/checkout/PaymenButton";
import { useCart } from "../context/useCart";
import "../styles/Checkout.css";

const requiredFields = [
  "nombre",
  "apellido",
  "email",
  "telefono",
  "direccion",
  "ciudad",
  "provincia",
  "cp",
];

export default function Checkout() {
  const [formData, setFormData] = useState(null);
  const { cartItems } = useCart();

  const canContinue = useMemo(() => {
    if (!formData) return false;
    return requiredFields.every((field) =>
      String(formData[field] || "").trim(),
    );
  }, [formData]);

  const completedFields = useMemo(() => {
    if (!formData) return 0;
    return requiredFields.filter((field) => String(formData[field] || "").trim())
      .length;
  }, [formData]);

  return (
    <main className="checkout-page">
      <section className="checkout-page__header">
        <p className="checkout-page__eyebrow">Finalizar compra</p>
        <h1 className="checkout-page__title">Checkout</h1>
        <p className="checkout-page__intro">
          Completa tus datos para generar el pago. El envio se coordina con el
          vendedor despues de confirmar la compra.
        </p>

        <div className="checkout-progress" aria-label="Progreso del checkout">
          <span
            className={
              cartItems.length > 0
                ? "checkout-progress__step checkout-progress__step--active"
                : "checkout-progress__step"
            }
          >
            Carrito
          </span>
          <span
            className={
              completedFields === requiredFields.length
                ? "checkout-progress__step checkout-progress__step--active"
                : "checkout-progress__step"
            }
          >
            Datos
          </span>
          <span className="checkout-progress__step">Pago</span>
        </div>
      </section>

      {cartItems.length === 0 ? (
        <section className="checkout-empty">
          <h2>Tu carrito esta vacio</h2>
          <p>Agrega algun print antes de continuar con el checkout.</p>
          <Link to="/prints" className="checkout-empty__link">
            Ver prints disponibles
          </Link>
        </section>
      ) : (
        <section className="checkout-page__layout">
          <BillingForm onFormChange={setFormData} />

          <aside className="checkout-page__sidebar" aria-label="Resumen">
            <OrderSummary />
            <div className="checkout-payment-card">
              <p className="checkout-payment-card__hint">
                {canContinue
                  ? "Todo listo. Vas a ser redirigido a Mercado Pago."
                  : `Completa los datos obligatorios para continuar (${completedFields}/${requiredFields.length}).`}
              </p>
              <PaymentButton disabled={!canContinue} />
            </div>
          </aside>
        </section>
      )}
    </main>
  );
}
