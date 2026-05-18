import { useEffect, useState } from "react";

export default function BillingForm({ onFormChange }) {
  const [form, setForm] = useState(() => {
    const saved = sessionStorage.getItem("checkoutData");

    return saved
      ? JSON.parse(saved)
      : {
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          direccion: "",
          ciudad: "",
          provincia: "",
          cp: "",
        };
  });

  useEffect(() => {
    sessionStorage.setItem("checkoutData", JSON.stringify(form));
    onFormChange?.(form);
  }, [form, onFormChange]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fields = [
    { name: "nombre", label: "Nombre", autoComplete: "given-name" },
    { name: "apellido", label: "Apellido", autoComplete: "family-name" },
    {
      name: "email",
      label: "Correo electronico",
      type: "email",
      autoComplete: "email",
    },
    { name: "telefono", label: "Telefono", autoComplete: "tel" },
    {
      name: "direccion",
      label: "Direccion",
      autoComplete: "street-address",
    },
    {
      name: "ciudad",
      label: "Ciudad",
      autoComplete: "address-level2",
    },
    {
      name: "provincia",
      label: "Provincia",
      autoComplete: "address-level1",
    },
    { name: "cp", label: "Codigo postal", autoComplete: "postal-code" },
  ];

  const renderField = ({ name, label, type = "text", autoComplete }) => (
    <label className="billing-form__field" key={name}>
      <span>{label}</span>
      <input
        name={name}
        type={type}
        value={form[name]}
        autoComplete={autoComplete}
        onChange={handleChange}
        required
      />
    </label>
  );

  return (
    <form className="billing-form">
      <div className="billing-form__header">
        <p className="billing-form__step">Paso 1</p>
        <h2>Datos del comprador</h2>
        <p>
          Estos datos se usan para registrar el pedido y coordinar la entrega.
        </p>
      </div>

      <div className="billing-form__grid billing-form__grid--two">
        {fields.slice(0, 2).map(renderField)}
      </div>

      <div className="billing-form__grid">{fields.slice(2, 5).map(renderField)}</div>

      <div className="billing-form__grid billing-form__grid--three">
        {fields.slice(5).map(renderField)}
      </div>
    </form>
  );
}
