import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/useCart";
import CartDrawer from "../cart/CartDrawer";
import "../../styles/Navbar.css";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/galeria", label: "Galería" },
  { to: "/prints", label: "Prints" },
  { to: "/preguntas", label: "Preguntas" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-name">Juli</span>
            <span className="navbar__logo-sub">Tattoo Studio</span>
          </Link>

          <button
            className="navbar__burger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          <ul
            className={`navbar__links ${isMenuOpen ? "navbar__links--open" : ""}`}
          >
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {/* ⭐ Checkout dinámico */}
            {totalItems > 0 && (
              <li>
                <NavLink
                  to="/checkout"
                  className={({ isActive }) =>
                    isActive ? "navbar__checkout active" : "navbar__checkout"
                  }
                  onClick={closeMenu}
                >
                  Checkout
                </NavLink>
              </li>
            )}

            <li>
              <button
                type="button"
                className="navbar__cart"
                onClick={() => {
                  closeMenu();
                  setIsCartOpen(true);
                }}
              >
                Carrito {totalItems > 0 && `(${totalItems})`}
              </button>
            </li>
          </ul>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
