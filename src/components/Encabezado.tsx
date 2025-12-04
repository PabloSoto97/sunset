import React from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const Encabezado = () => {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden bg-black/90">
      {/* VIDEO BACKGROUND: 
        - Brillo ajustado para mejor contraste (brightness-50)
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        // Fallback si el video no carga
        onError={(e) => console.error("Error al cargar video:", e)}
      >
        <source src="/video2.mp4" type="video/mp4" />
        {/* Mensaje de fallback si el navegador no soporta video */}
        Tu navegador no soporta la etiqueta de video.
      </video>

      {/* OVERLAY CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        {/* TÍTULO PRINCIPAL - Tipografía mejorada y legible */}
        <h1
          className="
            text-white font-extrabold 
            tracking-tighter 
            uppercase
            text-4xl sm:text-5xl md:text-7xl lg:text-8xl
            
            /* Sombra de texto para mejorar la legibilidad sobre el video */
            text-shadow-lg 
            
            /* Animación sutil de desvanecimiento (Fade-in) */
            animate-fade-in
          "
          style={{
            textShadow:
              "0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(255,105,180, 0.5)",
          }}
        >
          Libera tu estilo
        </h1>

        {/* Subtítulo añadido para mayor impacto */}
        <p className="text-pink-300 mt-2 sm:mt-4 text-lg md:text-xl font-medium tracking-wider animate-fade-in-delay">
          Descubre la colección más audaz.
        </p>

        {/* BOTÓN IMOURI STYLE - Más moderno y con efecto de brillo (glow)
          - Añadimos `rounded-full` para un estilo más moderno.
          - Añadimos `shadow-pink-500/50` para un efecto de resplandor.
        */}
        <Link to="/productos">
          <button
            className="
            mt-10 md:mt-12
            px-8 py-3 
            bg-pink-600 
            text-white 
            uppercase 
            font-bold
            tracking-widest 
            text-sm 
            rounded-full /* Más moderno */
            transition-all 
            duration-300
            
            /* Efecto de resplandor y sombra */
            shadow-xl shadow-pink-500/50 
            
            /* Efecto de hover mejorado */
            hover:bg-pink-700
            hover:shadow-pink-400/80 
            hover:scale-105
            active:scale-95
          "
          >
            Ver las novedades
          </button>
        </Link>
      </div>

      {/* Indicador de Scroll (estética opcional) */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-4 z-10">
        <ChevronDown
          className="text-white/80 animate-bounce cursor-pointer"
          size={32}
          onClick={() =>
            window.scrollTo({
              top: window.innerHeight * 0.9,
              behavior: "smooth",
            })
          }
        />
      </div>

      {/* Estilos CSS personalizados para animaciones y sombra de texto */}
      <style>{`
        .text-shadow-lg {
            /* Fallback para navegadores antiguos que no soportan la propiedad 'text-shadow' */
            text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
        }

        /* Definición de la animación de Fade-in */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-delay {
            animation: fadeIn 1s ease-out forwards;
            animation-delay: 0.3s;
            opacity: 0; /* Asegura que empieza oculto */
        }
      `}</style>
    </div>
  );
};
