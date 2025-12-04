import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";
import { CartSidebar } from "./CartSidebar";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        bg-black h-[var(--nav-height)]
        flex items-center justify-between
        px-4 md:px-12
        shadow-lg border-b border-gray-600/60 
      "
    >
      {/* LOGO */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src="/sunset.png"
            alt="Sunset Logo"
            className="w-[140px] object-contain select-none"
          />
        </Link>
      </div>

      {/* LINKS DESKTOP */}
      <nav className="hidden md:flex items-center gap-10 ml-10 text-white tracking-wider uppercase font-semibold text-sm">
        <NavItem to="/inicio" label="Inicio" />
        <NavItem to="/productos" label="Productos" />

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

      {/* MENU MOBILE */}
      <button
        className="md:hidden flex flex-col gap-1.5 z-[1100]"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú"
      >
        <span className="w-7 h-[3px] bg-white"></span>
        <span className="w-7 h-[3px] bg-white"></span>
        <span className="w-7 h-[3px] bg-white"></span>
      </button>

      {/* DRAWER MOBILE */}
      <div
        className={`
          fixed top-0 right-0 h-screen w-[70%] max-w-[260px]
          bg-black text-white flex flex-col 
          p-8 pt-[calc(var(--nav-height)+16px)] gap-6 tracking-wide uppercase
          transform transition-transform duration-300 z-[1200]
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
          to="/contacto"
          label="Contacto"
          onClick={() => setIsOpen(false)}
        />

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
          className="fixed inset-0 bg-black/60 z-[1150]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR CARRITO */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

/* ---------------- COMPONENTES ---------------- */

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
