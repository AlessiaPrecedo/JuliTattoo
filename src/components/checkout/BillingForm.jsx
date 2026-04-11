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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputClass =
    "w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Datos de facturación</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          className={inputClass}
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
        />
      </div>

      <input
        className={inputClass}
        name="email"
        type="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
      />

      <input
        className={inputClass}
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleChange}
      />

      <input
        className={inputClass}
        name="direccion"
        placeholder="Dirección"
        value={form.direccion}
        onChange={handleChange}
      />

      <div className="grid grid-cols-3 gap-4">
        <input
          className={inputClass}
          name="ciudad"
          placeholder="Ciudad"
          value={form.ciudad}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="provincia"
          placeholder="Provincia"
          value={form.provincia}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="cp"
          placeholder="CP"
          value={form.cp}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
