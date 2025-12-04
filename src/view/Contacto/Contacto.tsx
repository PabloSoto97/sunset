import { useState } from "react";
import {
  Send,
  MapPin,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

export const Contacto = () => {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // NOTE: Usando el endpoint de Formspree original
      const response = await fetch("https://formspree.io/f/mdklbzyr", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        // Opcional: Ocultar el mensaje de éxito después de 5 segundos
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const isSending = status === "sending";

  return (
    <section className="py-20 md:py-32 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* TÍTULO Y DESCRIPCIÓN */}
        <div className="text-center mb-16">
          <h2 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl mb-4 tracking-tight">
            ¿Hablamos?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Contacta con nuestro equipo para consultas de pedidos, mayoristas o
            soporte. Te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* COLUMNA IZQUIERDA: INFORMACIÓN Y MAPA */}
          <div className="lg:col-span-1 space-y-8">
            {/* Tarjeta de Información */}
            <div className="p-6 bg-zinc-800 rounded-xl shadow-xl border border-pink-500/10 transition hover:border-pink-500/50">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-pink-600">
                <Mail size={24} /> Contacto Directo
              </h3>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start gap-3">
                  <Phone
                    size={20}
                    className="text-pink-500 mt-1 flex-shrink-0"
                  />
                  <span className="font-semibold">Teléfono:</span> xxxx-xxxxxx
                </p>
                <p className="flex items-start gap-3">
                  <Clock
                    size={20}
                    className="text-pink-500 mt-1 flex-shrink-0"
                  />
                  <span className="font-semibold">Horarios:</span> <br />
                  Lunes a Viernes: 9:00 - 20:00 <br />
                  Sábados: 9:00 - 13:00
                </p>
                <p className="flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="text-pink-500 mt-1 flex-shrink-0"
                  />
                  <span className="font-semibold">Ubicaciones:</span> <br />
                  Av. Ferre 1887, W3400 Corrientes, Argentina <br />
                  Brunel Pruyas, Caa Cati, Corrientes, Argentina
                </p>
              </div>
            </div>

            {/* Botón de WhatsApp estilizado */}
            <a
              href="https://api.whatsapp.com/message/SAYLQKIJFNR4K1?autoload=1&app_absent=0&utm_source=ig"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full flex justify-center items-center gap-2 mt-4 
                bg-green-600 hover:bg-green-700 
                text-white font-bold py-3 px-6 
                rounded-full shadow-lg transition transform hover:scale-[1.02]
              "
            >
              💬 Escribir por WhatsApp
              <ArrowRight size={20} />
            </a>

            {/* Mapa de Ubicación */}
            <div className="w-full h-80 rounded-xl overflow-hidden shadow-2xl border border-pink-500/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.763282706094!2d-58.830352723740155!3d-27.476628017002938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456b61f5f8ddb5%3A0x8b7978b351b1b99b!2sAv.%20Pedro%20Ferr%C3%A9%201887%2C%20W3402%20Corrientes!5e0!3m2!1ses-419!2sar!4v1764861147482!5m2!1ses-419!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO DE CONTACTO (ocupa 2/3 en desktop) */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 flex flex-col p-8 md:p-10 rounded-2xl bg-zinc-800 shadow-2xl border border-pink-500/20"
          >
            <h3 className="text-3xl font-bold mb-8 text-pink-600">
              Envíanos un Mensaje
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CAMPO: Nombre */}
              <label className="flex flex-col font-medium text-gray-300">
                Nombre Completo
                <input
                  type="text"
                  name="nombre"
                  required
                  placeholder="Tu nombre y apellido"
                  className="mt-2 p-3 rounded-lg border border-zinc-700 bg-zinc-900 
                             text-white focus:border-pink-500 
                             focus:ring-2 focus:ring-pink-500/50 outline-none 
                             transition shadow-inner"
                />
              </label>

              {/* CAMPO: Email */}
              <label className="flex flex-col font-medium text-gray-300">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="ejemplo@correo.com"
                  className="mt-2 p-3 rounded-lg border border-zinc-700 bg-zinc-900 
                             text-white focus:border-pink-500 
                             focus:ring-2 focus:ring-pink-500/50 outline-none 
                             transition shadow-inner"
                />
              </label>

              {/* CAMPO: Teléfono (ocupa toda la fila en mobile) */}
              <label className="flex flex-col font-medium text-gray-300 md:col-span-2">
                Teléfono
                <input
                  type="text"
                  name="telefono"
                  placeholder="(Opcional)"
                  className="mt-2 p-3 rounded-lg border border-zinc-700 bg-zinc-900 
                             text-white focus:border-pink-500 
                             focus:ring-2 focus:ring-pink-500/50 outline-none 
                             transition shadow-inner"
                />
              </label>

              {/* CAMPO: Mensaje */}
              <label className="flex flex-col font-medium text-gray-300 md:col-span-2">
                Mensaje
                <textarea
                  name="mensaje"
                  required
                  placeholder="Escribe tu mensaje o consulta aquí..."
                  className="mt-2 p-3 rounded-lg border border-zinc-700 bg-zinc-900 
                             text-white focus:border-pink-500 
                             focus:ring-2 focus:ring-pink-500/50 outline-none 
                             transition shadow-inner min-h-[150px] resize-y"
                />
              </label>
            </div>

            {/* Botón de Enviar */}
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                disabled={isSending}
                className="w-full md:w-80 py-4 
                           bg-pink-600 text-white rounded-full 
                           font-bold text-lg uppercase tracking-wider
                           transition transform hover:scale-[1.02] 
                           shadow-lg shadow-pink-500/40
                           disabled:bg-gray-700 disabled:shadow-none disabled:scale-100
                           flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </div>

            {/* Mensajes de Estado */}
            {status === "success" && (
              <div className="mt-6 p-4 rounded-lg bg-green-900/40 text-green-300 flex items-center gap-3 animate-fade-in">
                <CheckCircle size={20} />
                <p className="font-semibold">
                  ¡Mensaje enviado! Te contactaremos pronto.
                </p>
              </div>
            )}
            {status === "error" && (
              <div className="mt-6 p-4 rounded-lg bg-red-900/40 text-red-300 flex items-center gap-3 animate-fade-in">
                <XCircle size={20} />
                <p className="font-semibold">
                  Error al enviar. Por favor, revisa tu conexión e inténtalo de
                  nuevo.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Estilos para el fade-in */}
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};
