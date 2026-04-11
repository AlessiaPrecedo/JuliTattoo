import { Link } from "react-router-dom";
import "../../styles/Footer.css";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/galeria", label: "Galeria" },
  { to: "/prints", label: "Prints" },
  { to: "/preguntas", label: "Preguntas" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <span className="footer__logo-name">Juli</span>
          <span className="footer__logo-sub">Tattoo Studio</span>
          <p className="footer__tagline">
            Tatuajes personalizados, arte y sesiones privadas en Buenos Aires.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Navegacion del footer">
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="footer__contact" aria-label="Contacto">
          <ul>
            <li>
              <a href="https://wa.me/5490000000000" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="mailto:hola@juli.tattoo">hola@juli.tattoo</a>
            </li>
          </ul>
        </section>
      </div>

      <div className="footer__line" />
      <p className="footer__copy">© {year} JULI TATTOO STUDIO. ALL RIGHTS RESERVED.</p>
    </footer>
  );
}
