// src/views/BlackFriday.tsx
import { productos } from "../data/productos";
import { CardContainers } from "../components/CardContainers";

export const BlackFriday = () => {
  const ofertas = productos.filter((p) => p.tags?.includes("black-friday"));

  return (
    <div className="pt-24 pb-14 px-4 text-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold uppercase tracking-wide">
          Ofertas Black Friday
        </h1>

        <p className="mt-2 text-gray-300">
          Aprovechá las mejores ofertas — {ofertas.length} productos disponibles
        </p>
      </div>

      <CardContainers productos={ofertas} />
    </div>
  );
};
