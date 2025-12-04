import { Instagram } from "lucide-react";

export const FollowUsInstagram = () => {
  // Poné acá tu link
  const INSTAGRAM_URL = "https://www.instagram.com/sunset.indumentarias_";

  const handleClick = () => {
    window.open(INSTAGRAM_URL, "_blank");
  };

  return (
    <div className="w-full bg-zinc-200  py-20 flex flex-col items-center text-center px-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Instagram size={36} />
        <h2 className="text-3xl font-bold">Sunset</h2>
      </div>

      {/* Texto */}
      <p className="text-zinc-500 mt-2">Estamos en Instagram</p>

      {/* Botón */}
      <button
        onClick={handleClick}
        className="
          mt-6 px-8 py-2
          border border-black 
          rounded-full 
          font-semibold 
          text-sm
          hover:bg-black hover:text-white
          transition
        "
      >
        SEGUINOS
      </button>
    </div>
  );
};
