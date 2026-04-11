import { useMemo, useState } from "react";
import BillingForm from "../components/checkout/BillingForm";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentButton from "../components/checkout/PaymenButton";
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
    <main
      style={{ maxWidth: 1200, margin: "0 auto", padding: "7.5rem 1rem 3rem" }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Checkout</h1>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1rem",
          alignItems: "start",
        }}
      >
        <BillingForm onFormChange={setFormData} />

        <div style={{ display: "grid", gap: "1rem" }}>
          <OrderSummary />
          <PaymentButton disabled={!canContinue} />;
        </div>
      </section>
    </main>
  );
}
