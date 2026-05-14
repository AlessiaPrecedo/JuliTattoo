import { useMemo, useState } from "react";
import BillingForm from "../components/checkout/BillingForm";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentButton from "../components/checkout/PaymenButton";
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

  const canContinue = useMemo(() => {
    if (!formData) return false;
    return requiredFields.every((field) =>
      String(formData[field] || "").trim(),
    );
  }, [formData]);

  return (
    <main className="checkout-page">
      <h1 className="checkout-page__title">Checkout</h1>

      <section className="checkout-page__layout">
        <BillingForm onFormChange={setFormData} />

        <div className="checkout-page__sidebar">
          <OrderSummary />
          <PaymentButton disabled={!canContinue} />
        </div>
      </section>
    </main>
  );
}
