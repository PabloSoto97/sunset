import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";
import { CartSidebar } from "./CartSidebar";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShow(false);
      else setShow(true);

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        bg-black h-[85px]
        flex items-center justify-between
        px-6 md:px-12
        transition-transform duration-500
        ${show ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      {/* LOGO */}
      <div className="flex items-center">
        <img
          src="/sunset.png"
          alt="Sunset Logo"
          className="w-[140px] object-contain select-none"
        />
      </div>

      {/* LINKS DESKTOP */}
      <nav className="hidden md:flex items-center gap-10 ml-10 text-white tracking-wider uppercase font-semibold text-sm">
        <NavItem to="/inicio" label="Inicio" />
        <NavItem to="/productos" label="Productos" />
        <NavItem to="/sobre-nosotros" label="Sobre Nosotros" />
        <NavItem to="/contacto" label="Contacto" />
      </nav>

      {/* ICONOS */}
      <div className="hidden md:flex items-center gap-6 text-white ml-auto">
        <Search className="w-5 h-5 cursor-pointer hover:text-pink-500 transition-colors" />
        <User className="w-5 h-5 cursor-pointer hover:text-pink-500 transition-colors" />
        <ShoppingCart
          onClick={() => setIsCartOpen(true)}
          className="w-6 h-6 cursor-pointer hover:text-pink-500 transition-colors"
        />
      </div>

      {/* MENU MOBILE BUTTON */}
      <button
        className="md:hidden flex flex-col gap-1.5"
        onClick={() => setIsOpen(true)}
      >
        <span className="w-7 h-[3px] bg-white"></span>
        <span className="w-7 h-[3px] bg-white"></span>
        <span className="w-7 h-[3px] bg-white"></span>
      </button>

      {/* MOBILE MENU */}
      <div
        className={`
          fixed top-0 right-0 h-screen w-[70%] max-w-[260px]
          bg-black text-white flex flex-col 
          p-8 pt-24 gap-6 tracking-wide uppercase
          transform transition-transform duration-300 z-[1050]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <NavMobileItem
          to="/inicio"
          label="Inicio"
          onClick={() => setIsOpen(false)}
        />
        <NavMobileItem
          to="/productos"
          label="Productos"
          onClick={() => setIsOpen(false)}
        />
        <NavMobileItem
          to="/sobre-nosotros"
          label="Sobre Nosotros"
          onClick={() => setIsOpen(false)}
        />
        <NavMobileItem
          to="/contacto"
          label="Contacto"
          onClick={() => setIsOpen(false)}
        />

        {/* CARRITO */}
        <button
          onClick={() => {
            setIsOpen(false);
            setIsCartOpen(true);
          }}
          className="mt-8 flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" /> Carrito
        </button>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/60 z-[1040]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* SIDEBAR CARRITO */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

/* ---------------- COMPONENTES DE NAV ---------------- */

const NavItem = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="
      relative 
      after:content-[''] after:absolute after:left-0 after:-bottom-1 
      after:w-0 after:h-[2px] after:bg-pink-500 
      after:transition-all after:duration-300 
      hover:after:w-full
    "
  >
    {label}
  </Link>
);

const NavMobileItem = ({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) => (
  <Link to={to} onClick={onClick} className="text-lg">
    {label}
  </Link>
);
