import { useState } from "react";

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
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="pt-36 pb-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título + CTA */}
        <div className="text-center mb-12">
          <h2 className="text-white font-[HeadlinesRegular] text-5xl md:text-6xl mb-4">
            Contacto
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            ¿Tenés dudas o querés hacer un pedido especial? Completá el
            formulario y te respondemos en menos de 24hs 📩
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Columna izquierda: info */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Información</h3>
              <p>📞 xxxx-xxxxxx</p>

              <p>📍 Av. Ferre 1887, W3400 Corrientes, Argentina</p>
              <p>📍 Brunel Pruyas, Caa Cati, Corrientes, Argentina</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Horarios</h3>
              <p>🕒 Lunes a Viernes: 9:00 - 20:00</p>
              <p>📅 Sábados: 9:00 - 13:00</p>
            </div>

            <a
              href="https://api.whatsapp.com/message/SAYLQKIJFNR4K1?autoload=1&app_absent=0&utm_source=ig"
              target="_blank"
              className="inline-block mt-4 bg-green-600 hover:bg-green-700 
                         text-white font-bold py-3 px-6 rounded-lg shadow-md transition"
            >
              💬 Escribir por WhatsApp
            </a>
            <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.763282706094!2d-58.830352723740155!3d-27.476628017002938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456b61f5f8ddb5%3A0x8b7978b351b1b99b!2sAv.%20Pedro%20Ferr%C3%A9%201887%2C%20W3402%20Corrientes!5e0!3m2!1ses-419!2sar!4v1764861147482!5m2!1ses-419!2sar%22%20width=%22600%22%20height=%22450%22%20style=%22border:0;%22%20allowfullscreen=%22%22%20loading=%22lazy%22%20referrerpolicy=%22no-referrer-when-downgrade"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col border border-gray-700 p-6 rounded-2xl bg-[#0b0b0b]/90 shadow-lg"
          >
            <div className="space-y-6">
              <label className="flex flex-col font-bold text-white text-base">
                Nombre
                <input
                  type="text"
                  name="nombre"
                  required
                  className="mt-2 p-3 rounded-lg border border-gray-700 bg-[#111] 
                             text-white text-base focus:border-red-700 
                             focus:ring-2 focus:ring-red-700 outline-none 
                             transition shadow-md"
                />
              </label>

              <label className="flex flex-col font-bold text-white text-base">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 p-3 rounded-lg border border-gray-700 bg-[#111] 
                             text-white text-base focus:border-red-700 
                             focus:ring-2 focus:ring-red-700 outline-none 
                             transition shadow-md"
                />
              </label>

              <label className="flex flex-col font-bold text-white text-base">
                Teléfono
                <input
                  type="text"
                  name="telefono"
                  className="mt-2 p-3 rounded-lg border border-gray-700 bg-[#111] 
                             text-white text-base focus:border-red-700 
                             focus:ring-2 focus:ring-red-700 outline-none 
                             transition shadow-md"
                />
              </label>

              <label className="flex flex-col font-bold text-white text-base">
                Mensaje
                <textarea
                  name="mensaje"
                  required
                  className="mt-2 p-3 rounded-lg border border-gray-700 bg-[#111] 
                             text-white text-base focus:border-red-700 
                             focus:ring-2 focus:ring-red-700 outline-none 
                             transition shadow-md min-h-[120px] resize-y"
                />
              </label>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-60 py-4 bg-gradient-to-r from-red-700 to-red-900 
                           text-white rounded-lg font-bold text-lg transition 
                           hover:scale-105 hover:shadow-lg disabled:opacity-50"
              >
                {status === "sending" ? "Enviando..." : "Enviar"}
              </button>
            </div>

            {status === "success" && (
              <p className="mt-4 p-2 rounded-md bg-green-900/30 text-green-400 text-sm">
                ✅ ¡Mensaje enviado con éxito!
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 p-2 rounded-md bg-red-900/30 text-red-400 text-sm">
                ❌ Ocurrió un error, intenta otra vez.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
