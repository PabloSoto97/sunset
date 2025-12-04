import React from "react";

// Se puede usar un icono de lucide-react o un simple punto/diamante
const Separator = () => (
  <span className="text-pink-500 mx-6 font-extrabold text-2xl">•</span>
);

interface ScrollingTextProps {
  // Ahora el texto es opcional, con un fallback predeterminado
  text?: string;
}

export const ScrollingText = ({ text }: ScrollingTextProps) => {
  // Texto de fallback si no se proporciona ninguno
  const defaultText = "🔥 ENVÍO GRATIS EN COMPRAS SUPERIORES A $100.000 🔥";
  const displayableText = text || defaultText;

  // Usamos el texto repetido 8 veces para asegurar que la animación sea continua
  const repeatedText = Array(8).fill(displayableText);

  return (
    // CAMBIOS CLAVE EN EL CONTENEDOR:
    // 1. Color de fondo más intenso (bg-zinc-900)
    // 2. Altura ajustada a un tamaño más compacto (h-16)
    <div className="w-full h-23 overflow-hidden whitespace-nowrap bg-zinc-900 select-none flex items-center border-y-2 border-pink-500/50">
      {/* Estilos para la animación de Marquee (se definen en <style>) */}
      <div className="flex animate-marquee">
        {/* Usamos el array repetido para generar el scroll infinito */}
        {repeatedText.map((t, index) => (
          <React.Fragment key={index}>
            <span
              className="
                text-xl sm:text-2xl 
                font-extrabold /* Hacemos el texto más grueso */
                uppercase 
                text-white /* Color de texto blanco para contraste */
                tracking-widest /* Espaciado entre letras */
              "
            >
              {t}
            </span>
            {/* Separador Visual (Mejora la estética) */}
            <Separator />
          </React.Fragment>
        ))}
      </div>

      {/* Se duplica el contenido del Marquee para lograr el efecto de scroll infinito sin saltos */}
      <div className="flex animate-fast-marquee" aria-hidden="true">
        {repeatedText.map((t, index) => (
          <React.Fragment key={index + repeatedText.length}>
            <span
              className="
                text-xl sm:text-2xl 
                font-extrabold 
                uppercase 
                text-white 
                tracking-widest
              "
            >
              {t}
            </span>
            <Separator />
          </React.Fragment>
        ))}
      </div>

      {/* CSS para la animación de Marquee */}
    </div>
  );
};
