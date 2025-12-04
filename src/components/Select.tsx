import { Link } from "react-router-dom"; // Asegúrate de tener este import si usas React Router

export const Select = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {/* CARD 1 - REMERAS */}
      {/* Usamos Link para que toda la tarjeta sea clickable y navegue */}
      <Link
        to="/productos/remeras"
        className="relative h-[420px] w-full rounded-md overflow-hidden group"
      >
        <img
          src="/Ropas/s1.webp"
          alt="Categoría Remeras"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wide">
            REMERAS
          </h2>
          {/* El botón ahora es solo visual, ya que el link envuelve toda la tarjeta */}
          <div className="mt-4 px-5 py-1 border border-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition">
            VER TODOS LOS DISEÑOS
          </div>
        </div>
      </Link>

      {/* CARD 2 - HOODIES */}
      <Link
        to="/productos/hoodies"
        className="relative h-[420px] w-full rounded-md overflow-hidden group"
      >
        <img
          src="/Ropas/s2.webp"
          alt="Categoría Hoodies"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wide">
            HOODIES
          </h2>
          <div className="mt-4 px-5 py-1 border border-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition">
            VER TODOS LOS DISEÑOS
          </div>
        </div>
      </Link>

      {/* CARD 3 - PANTS & SHORTS */}
      <Link
        to="/productos/pants-shorts"
        className="relative h-[420px] w-full rounded-md overflow-hidden group"
      >
        <img
          src="/Ropas/s3.webp"
          alt="Categoría Pants & Shorts"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wide text-center">
            PANTS & SHORTS
          </h2>
          <div className="mt-4 px-5 py-1 border border-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition">
            VER TODOS LOS DISEÑOS
          </div>
        </div>
      </Link>
    </div>
  );
};
