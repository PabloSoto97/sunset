export const Encabezado = () => {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      >
        <source src="/video2.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {/* TÍTULO PRINCIPAL */}
        <h1
          className="
          text-white font-[HeadlinesRegular] font-semibold
          
          tracking-wide
          uppercase
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl
        "
        >
          Libera tu estilo
        </h1>

        {/* BOTÓN IMOURI STYLE */}
        <button
          className="
            mt-8 
            px-6 py-3 
            bg-pink-600 
            text-white 
            uppercase 
            font-semibold 
            tracking-wider 
            text-sm 
            hover:bg-pink-700 
            transition-all 
            duration-300
          "
        >
          Ver las novedades
        </button>
      </div>
    </div>
  );
};
