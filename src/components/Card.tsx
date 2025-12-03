import { Link } from "react-router-dom";
import { useState } from "react";

interface CardProps {
  id: number;
  nombre: string;
  precio: number;
  precioAnterior?: number; // 👈 agregado
  imagenes: string[];
  categoria?: string;
}

export const Card = ({
  id,
  nombre,
  precio,
  precioAnterior,
  imagenes,
}: CardProps) => {
  const [hoverIndex, setHoverIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const segment = width / imagenes.length;

    const index = Math.min(imagenes.length - 1, Math.floor(x / segment));
    setHoverIndex(index);
  };

  const handleMouseLeave = () => setHoverIndex(0);

  return (
    <div className="flex flex-col bg-black rounded-md overflow-hidden shadow-lg">
      <Link to={`/productos/${id}`}>
        <div
          className="relative w-full aspect-[3/4] overflow-hidden cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={imagenes[hoverIndex]}
            alt={nombre}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Dots — ocultos en mobile */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:flex gap-1">
            {imagenes.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  hoverIndex === i ? "bg-pink-500 scale-110" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </Link>

      <div className="p-3 text-center">
        <Link to={`/productos/${id}`}>
          <h5 className="text-sm font-semibold text-pink-500 tracking-wide uppercase hover:underline">
            {nombre}
          </h5>
        </Link>

        {/* --- PRECIOS --- */}
        <div className="mt-1 flex items-center justify-center gap-2">
          {/* Precio tachado si existe */}
          {precioAnterior && (
            <span className="text-gray-400 line-through text-sm">
              ${precioAnterior.toLocaleString("es-AR")}
            </span>
          )}

          {/* Precio actual */}
          <span className="text-white font-bold text-lg">
            ${precio.toLocaleString("es-AR")}
          </span>
        </div>
      </div>
    </div>
  );
};
