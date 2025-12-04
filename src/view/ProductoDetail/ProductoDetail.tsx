import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { productos } from "../../data/productos";
import type { Producto } from "../../types/Producto";
import { useCart } from "../../context/cartContext"; // 1. Importar el hook del carrito

export const ProductoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart(); // 2. Obtener la función para agregar

  const [producto, setProducto] = useState<Producto | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [cantidad, setCantidad] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false); // Estado para feedback visual del botón

  useEffect(() => {
    setLoading(true);
    const buscado = productos.find((p) => p.id === Number(id));
    if (!buscado) {
      setProducto(null);
    } else {
      setProducto(buscado);
      const first = buscado.imagenes?.[0] ?? "";
      setSelectedImage(first);
      setSelectedSize(buscado.talles?.[0] ?? "");
      setSelectedColor(buscado.colores?.[0] ?? "");
    }
    setLoading(false);
  }, [id]);

  // 3. Función para manejar el click en "Agregar al carrito"
  const handleAddToCart = () => {
    if (!producto) return;

    setIsAdding(true);

    // Crear el objeto item para el carrito
    const itemToAdd = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: selectedImage || producto.imagenes[0],
      cantidad: cantidad,
      // Si tu contexto soporta talle y color, se envían aquí:
      talle: selectedSize,
      color: selectedColor,
    };

    // Llamar a la función del contexto
    addToCart(itemToAdd);

    // Feedback visual simple (volver el botón a normal después de 1s)
    setTimeout(() => {
      setIsAdding(false);
      // Opcional: Si tienes una función toggleCart() en tu contexto, podrías llamarla aquí para abrir el sidebar automáticamente.
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        Cargando producto...
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Producto no encontrado</h2>
          <Link
            to="/productos"
            className="text-pink-400 hover:underline mt-4 block"
          >
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  const onThumbClick = (img: string) => {
    setSelectedImage(img);
  };

  // Cálculos de precios
  const precioEfectivo = producto.precio * 0.7; // 30% OFF
  const valorCuota = producto.precio / 6;

  return (
    <section className="bg-black text-white pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT: IMAGEN PRINCIPAL + MINIATURAS */}
        <div className="flex-1">
          {/* Imagen grande */}
          <div className="rounded-lg overflow-hidden border border-white/10 mb-4">
            <img
              src={selectedImage || producto.imagenes[0]}
              alt={producto.nombre}
              className="w-full object-cover max-h-[720px]"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {producto.imagenes.slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => onThumbClick(img)}
                className={`h-36 md:h-44 overflow-hidden rounded border transition-all ${
                  selectedImage === img
                    ? "border-pink-500 shadow-[0_0_15px_rgba(255,45,165,0.35)]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <img
                  src={img}
                  alt={`mini-${i}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: INFO */}
        <div className="flex flex-col gap-6">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {producto.nombre}
          </h1>

          {/* Price row */}
          <div>
            <div className="flex items-center gap-4 mb-2">
              {producto.precioAnterior && (
                <span className="line-through text-gray-400 text-lg md:text-xl">
                  ${producto.precioAnterior.toLocaleString("es-AR")}
                </span>
              )}
              <span className="text-white text-3xl md:text-4xl font-extrabold">
                ${producto.precio.toLocaleString("es-AR")}
              </span>
              {producto.tags?.includes("sale") && (
                <span className="bg-amber-50 text-black text-xs px-3 py-1 rounded-full font-bold">
                  SALE
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm">
              Precio sin impuestos incluido
            </p>
          </div>

          {/* --- SECCIÓN: PROMOS BANCARIAS Y ENVIOS --- */}
          <div className="flex flex-col gap-4 border border-white/10 bg-white/5 p-4 rounded-lg">
            {/* Precio Efectivo */}
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-400 mt-1 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div>
                <p className="text-xl font-bold text-green-400">
                  ${precioEfectivo.toLocaleString("es-AR")}{" "}
                  <span className="text-white text-base font-normal">
                    con Efectivo
                  </span>
                </p>
                <p className="text-sm text-gray-300">
                  30% OFF Abonando con EFECTIVO (motoenvío o retiro en Morón y
                  Castelar)
                </p>
              </div>
            </div>

            {/* Cuotas */}
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-pink-400 mt-1 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <div>
                <p className="text-white font-medium">
                  6 cuotas sin interés de $
                  {valorCuota.toLocaleString("es-AR", {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {/* Transferencia */}
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400 mt-1 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <div>
                <p className="text-blue-400 font-bold">
                  25% OFF Abonando con Transferencia
                </p>
                <p className="text-xs text-gray-400">
                  No abones con débito, ¡mejor transferí!
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 my-1"></div>

            {/* Envio y Devolucion */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                <span>Envío gratis superando los $150.000</span>
              </div>
              <div className="flex items-center gap-3 text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>
                  <span className="font-bold text-white">
                    ¡Devolvelo gratis!
                  </span>{" "}
                  Si no te gustó o no te convence.
                </span>
              </div>
            </div>
          </div>

          {/* Shipping / Stock */}
          <div className="text-sm text-gray-300">
            <div>
              <span className="text-orange-400">●</span>{" "}
              {producto.stock ? `${producto.stock} en stock` : "Agotado"}
            </div>
          </div>

          {/* SIZE */}
          <div>
            <p className="text-sm font-medium mb-2 uppercase tracking-wider">
              Talle
            </p>
            <div className="flex gap-3 flex-wrap">
              {producto.talles.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(t)}
                  className={`w-12 h-12 flex items-center justify-center rounded border transition ${
                    selectedSize === t
                      ? "bg-white text-black border-pink-400"
                      : "border-white/20 hover:border-pink-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* COLOR */}
          <div>
            <p className="text-sm font-medium mb-2 uppercase tracking-wider">
              Color
            </p>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="bg-black border border-white/20 px-3 py-2 rounded w-48 text-white focus:outline-none focus:border-pink-400"
            >
              {producto.colores.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Qty + Add */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center text-xl"
              >
                -
              </button>
              <div className="text-xl font-semibold w-8 text-center">
                {cantidad}
              </div>
              <button
                onClick={() => setCantidad((c) => c + 1)}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center text-xl"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-4 rounded-lg text-white font-semibold text-lg transition shadow-lg 
              ${
                isAdding
                  ? "bg-green-600 shadow-green-900/20 cursor-default"
                  : "bg-pink-800 hover:bg-pink-700 shadow-pink-900/20"
              }`}
            >
              {isAdding ? "¡AGREGADO!" : "AGREGAR AL CARRITO"}
            </button>
          </div>

          <div className="border-t border-white/10 mt-4"></div>

          {/* Descripción */}
          <div className="mt-2">
            <h2 className="text-2xl font-bold mb-3">Descripción</h2>
            <div className="text-gray-300 leading-relaxed space-y-3 text-sm">
              {producto.descripcion.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <Link
            to="/productos"
            className="text-pink-400 hover:underline mt-2 inline-block"
          >
            Volver
          </Link>
        </div>
      </div>
    </section>
  );
};
