import { Link } from "react-router-dom";
import { productos } from "../data/productos";
import { CardContainers } from "../components/CardContainers";

export const NuevosProductos = () => {
  const items = productos.slice(0, 8);

  return (
    <div className="pt-20 pb-10">
      {/* Títulos */}
      <div className="text-center text-white font-bold">
        <h1 className="text-4xl mb-2.5">Nuevos Productos</h1>
        <h3 className="text-lg font-normal text-gray-300 mb-4">
          {items.length} nuevos productos
        </h3>

        {/* 🔥 LINK estilo Imouri */}
        <Link
          to="/catalogo"
          className="
            relative inline-block
            text-pink-500 
            font-semibold
            text-sm
            transition-all
            duration-300
            hover:text-pink-400
          "
        >
          Ver catálogo completo
          {/* Línea animada debajo */}
          <span
            className="
              absolute left-0 -bottom-1 
              w-full h-[2px] 
              bg-pink-500 
              scale-x-0 
              transition-transform 
              duration-300 
              origin-left 
              hover:scale-x-100
            "
          ></span>
        </Link>
      </div>

      {/* Cards */}
      <CardContainers productos={items} />
    </div>
  );
};
