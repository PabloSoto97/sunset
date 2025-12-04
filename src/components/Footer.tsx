import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <footer className="bg-black ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-3 lg:py-4">
        <div className="md:flex md:justify-between">
          <div className="mb-4 md:mb-0 flex items-center">
            <a href="/">
              <img
                src="/sunset.png"
                className="w-full max-w-[150px] object-contain"
                alt="zentlogo"
              />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-12 sm:gap-6 sm:grid-cols-3">
            <div className="flex flex-col text-sm">
              <Link
                to="/inicio"
                className="mb-3 font-semibold text-gray-900 uppercase dark:text-white"
              >
                Inicio
              </Link>
              <Link
                to="/productos"
                className="mb-3 font-semibold text-gray-900 uppercase dark:text-white"
              >
                Productos
              </Link>
              <Link
                to="/sobre-nosotros"
                className="mb-3 font-semibold text-gray-900 uppercase dark:text-white"
              >
                Conócenos Más
              </Link>
              <Link
                to="/contacto"
                className="mb-3 font-semibold text-gray-900 uppercase dark:text-white"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
        <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-xs text-gray-500 sm:text-center dark:text-gray-400">
            © 2025{" "}
            <a href="/" className="hover:underline">
              Sunset indumentaria™
            </a>
            . Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
};
