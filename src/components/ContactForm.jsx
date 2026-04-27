import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        "service_i9ya9g2",
        "template_t7o6ny9",
        e.target,
        "WJaZ-EVnzXkw09eqk ",
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error al enviar email:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h3>✅ Mensaje enviado</h3>
        <p>Gracias por contactarme. Te responderé pronto.</p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="name"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      //comentario
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="message"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
            resize: "vertical",
          }}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          width: "100%",
          padding: "1rem",
          background: "#c9a84c",
          color: "#0a0a0a",
          border: "none",
          borderRadius: "0.5rem",
          cursor: status === "sending" ? "not-allowed" : "pointer",
          fontWeight: 600,
        }}
      >
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>
      {status === "error" && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          ❌ Error al enviar el mensaje. Intenta de nuevo.
        </p>
      )}
    </form>
  );
}
