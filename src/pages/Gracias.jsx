import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import { useEffect } from "react";

export default function Gracias() {
  useEffect(() => {
    // Parámetros de prueba para la plantilla de EmailJS
    const templateParams = {
      email: "alissiaprecedo@hotmail.com", // Cambia por el email del comprador si lo tienes
      nombre: "Cliente de prueba",
      order_id: "12345",
      pedidos: "1",
      precio: "1000",
      unidades: "2",
      "cost.shipping": "500",
    };
    emailjs
      .send(
        "service_i9ya9g2",
        "template_t7o6ny9",
        templateParams,
        "WJaZ-EVnzXkw09eqk",
      )
      .then(
        (result) => {
          console.log("Email enviado correctamente", result.text);
        },
        (error) => {
          console.error("Error al enviar email:", error);
        },
      );
  }, []);

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        padding: "7.5rem 1rem 3rem",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 640,
          border: "1px solid #e7dccf",
          borderRadius: "1.5rem",
          padding: "2rem",
          textAlign: "center",
          background: "#fffaf5",
        }}
      >
        <p
          style={{
            margin: 0,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            color: "#8c6a43",
          }}
        >
          Pago aprobado
        </p>

        <h1 style={{ fontSize: "2.25rem", margin: "0.75rem 0 1rem" }}>
          Gracias por tu compra
        </h1>

        <p style={{ margin: "0 auto 1.5rem", maxWidth: 460, lineHeight: 1.7 }}>
          Tu pago fue recibido correctamente. En breve vas a poder seguir
          explorando la tienda o volver a la galeria.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/prints"
            style={{
              padding: "0.9rem 1.2rem",
              borderRadius: "0.75rem",
              background: "#c9a84c",
              color: "#0a0a0a",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Seguir comprando
          </Link>

          <Link
            to="/galeria"
            style={{
              padding: "0.9rem 1.2rem",
              borderRadius: "0.75rem",
              border: "1px solid #c9a84c",
              color: "#5f4727",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Ver galeria
          </Link>
        </div>
      </section>
    </main>
  );
}
