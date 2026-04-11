import { useCart } from "../../context/useCart";

export default function PaymentButton({ disabled }) {
  const { cartItems, shipping } = useCart();

  const handlePayment = async () => {
    try {
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          shipping,
        }),
      });

      const data = await res.json();

      if (data.initPoint) {
        window.location.href = data.initPoint;
      }
    } catch (error) {
      console.error("Error Mercado Pago:", error);
      alert("No se pudo iniciar el pago");
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handlePayment}
      style={{
        border: "1px solid #c9a84c",
        background: disabled ? "#3a3a3a" : "#c9a84c",
        color: disabled ? "#f5f0eb" : "#0a0a0a",
        borderRadius: "0.75rem",
        padding: "0.9rem 1.1rem",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      Continuar al pago
    </button>
  );
}
