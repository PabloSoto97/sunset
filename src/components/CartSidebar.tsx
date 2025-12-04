import { useCart } from "../context/cartContext";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Umbral para envío gratis (Ej: $150.000 ARS)
const FREE_SHIPPING_THRESHOLD = 150000;

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { state, removeFromCart } = useCart(); // Asumo que podrías tener updateQuantity aquí en el futuro

  // Calcular subtotal
  const subtotal = state.cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // Lógica de barra de envío gratis
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const progressPercentage = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  return (
    <>
      {/* Overlay oscuro (click para cerrar) */}
      <div
        className={`fixed inset-1 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-zinc-950 text-white shadow-2xl transform transition-transform duration-300 ease-out z-50 border-l border-white/10
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="flex pt-16 justify-between items-center p-5 border-b border-white/10">
            <h2 className="text-xl font-bold tracking-wider flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> TU CARRITO
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition"
            >
              <X className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* FREE SHIPPING PROGRESS BAR */}
          <div className="px-5 py-4 bg-zinc-900 border-b border-white/5">
            <p className="text-center text-sm mb-2 font-medium">
              {remainingForFreeShipping > 0 ? (
                <>
                  Te faltan{" "}
                  <span className="text-pink-500 font-bold">
                    ${remainingForFreeShipping.toLocaleString("es-AR")}
                  </span>{" "}
                  para{" "}
                  <span className="text-green-400 font-bold">ENVÍO GRATIS</span>
                </>
              ) : (
                <span className="text-green-400 font-bold">
                  ¡GENIAL! TENÉS ENVÍO GRATIS 🎉
                </span>
              )}
            </p>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-600 to-pink-400 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* LISTA DE ITEMS */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {state.cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                <ShoppingBag className="w-16 h-16 opacity-20" />
                <p>Tu carrito está vacío.</p>
                <button
                  onClick={onClose}
                  className="text-pink-400 hover:text-pink-300 font-semibold underline"
                >
                  Ir a comprar
                </button>
              </div>
            ) : (
              state.cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  {/* Imagen */}
                  <div className="w-24 h-28 shrink-0 bg-white/5 rounded-md overflow-hidden border border-white/5">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold text-white line-clamp-2 pr-4">
                          {item.nombre}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500 transition"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Si tuviéramos talle/color en el objeto item, irían aquí */}
                      {/* <p className="text-xs text-gray-400 mt-1">Talle: M / Color: Negro</p> */}

                      <div className="mt-2 text-pink-400 font-semibold">
                        ${item.precio.toLocaleString("es-AR")}
                      </div>
                    </div>

                    {/* Controles de Cantidad Estilo 'Imouri' */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-white/20 rounded bg-black">
                        <button
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition"
                          // onClick={() => decreaseQuantity(item.id)} // Requiere función en context
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.cantidad}
                        </span>
                        <button
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition"
                          // onClick={() => increaseQuantity(item.id)} // Requiere función en context
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER */}
          {state.cart.length > 0 && (
            <div className="p-5 bg-zinc-900 border-t border-white/10 space-y-4">
              {/* Notas pequeñas */}
              <div className="flex justify-between text-xs text-gray-400">
                <span>Impuestos incluidos</span>
                <span>Envío calculado en el checkout</span>
              </div>

              {/* Botón Checkout */}
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded flex justify-between items-center px-6 transition shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                <span>FINALIZAR COMPRA</span>
                <span className="text-lg">
                  ${subtotal.toLocaleString("es-AR")}
                </span>
              </button>

              {/* Link Ver Carrito */}
              <Link
                to="/cart"
                onClick={onClose}
                className="block text-center text-xs text-gray-400 hover:text-white uppercase tracking-wider transition"
              >
                Ver carrito completo
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
