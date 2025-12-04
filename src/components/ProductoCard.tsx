// /components/Productos/ProductoCard.tsx
import { Link } from "react-router-dom";
import { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  precioAnterior?: number;
  imagenes: string[];
}

export default function ProductoCard({ producto }: { producto: Producto }) {
  const [hoverIndex, setHoverIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const segment = rect.width / producto.imagenes.length;

    const idx = Math.min(producto.imagenes.length - 1, Math.floor(x / segment));
    setHoverIndex(idx);
  };

  return (
    <div className="flex flex-col bg-black rounded-md overflow-hidden shadow-lg">
      <Link to={`/productos/${producto.id}`}>
        <div
          className="relative w-full aspect-[3/4] overflow-hidden cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(0)}
        >
          <img
            src={producto.imagenes[hoverIndex]}
            alt={producto.nombre}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
          />

          {/* Bolitas inferiores */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:flex gap-1">
            {producto.imagenes.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  hoverIndex === i ? "bg-pink-500 scale-110" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </Link>

      <div className="p-3 text-center">
        <Link to={`/productos/${producto.id}`}>
          <h5 className="text-sm font-semibold text-pink-500 tracking-wide uppercase hover:underline">
            {producto.nombre}
          </h5>
        </Link>

        <div className="mt-1 flex items-center justify-center gap-2">
          {producto.precioAnterior && (
            <span className="text-gray-400 line-through text-sm">
              ${producto.precioAnterior}
            </span>
          )}

          <span className="text-white font-bold text-lg">
            ${producto.precio}
          </span>
        </div>
      </div>
    </div>
  );
}
