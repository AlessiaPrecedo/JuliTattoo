import { useState } from "react";
import { useCart } from "../../context/useCart";

export default function ShippingCalculator() {
  const { subtotal, setShipping } = useCart();
  const [cp, setCp] = useState("");
  const [zone, setZone] = useState("");

  const calcularEnvio = (codigoPostal) => {
    const cpNumber = Number(codigoPostal);

    // 🎁 envío gratis
    if (subtotal >= 80000) {
      setZone("Envío gratis");
      return 0;
    }

    // 📍 CABA (1000–1499 aprox)
    if (cpNumber >= 1000 && cpNumber <= 1499) {
      setZone("CABA");
      return 3000;
    }

    // 📍 GBA oeste / norte / sur ejemplo
    if (cpNumber >= 1600 && cpNumber <= 1899) {
      setZone("GBA");
      return 4500;
    }

    // 🇦🇷 resto país
    setZone("Interior");
    return 6500;
  };

  const handleCalculate = () => {
    if (!cp) return;

    const shippingCost = calcularEnvio(cp);
    setShipping(shippingCost);
  };

  return (
    <div className="border rounded-xl p-4 space-y-3">
      <h3 className="font-medium">Calcular envío</h3>

      <div className="flex gap-2">
        <input
          type="text"
          value={cp}
          onChange={(e) => setCp(e.target.value)}
          placeholder="Código postal"
          className="flex-1 border rounded-lg px-3 py-2"
        />

        <button
          onClick={handleCalculate}
          className="px-4 py-2 border rounded-lg"
        >
          Calcular
        </button>
      </div>

      {zone && (
        <p className="text-sm text-gray-600">
          Zona: <span className="font-medium">{zone}</span>
        </p>
      )}
    </div>
  );
}

