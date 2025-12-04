import { Truck, RefreshCw, CreditCard, DollarSign } from "lucide-react";

export const Envios = () => {
  return (
    <div className="w-full bg-zinc-200 py-8">
      <div
        className="
          max-w-7xl mx-auto
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4
          gap-10 
          px-6
        "
      >
        {/* ITEM 1 */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="min-w-16 min-h-16 border border-black rounded-full flex items-center justify-center">
            <DollarSign size={26} />
          </div>
          <div>
            <h3 className="font-bold">25% OFF TRANSFERENCIA</h3>
            <p className="text-sm text-zinc-700">Todos los medios de Envío</p>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="min-w-16 min-h-16 border border-black rounded-full flex items-center justify-center">
            <CreditCard size={24} />
          </div>
          <div>
            <h3 className="font-bold">Pagá Como Quieras</h3>
            <p className="text-sm text-zinc-700">
              3 y 6 cuotas sin interés con MercadoPago
            </p>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="min-w-16 min-h-16 border border-black rounded-full flex items-center justify-center">
            <Truck size={24} />
          </div>
          <div>
            <h3 className="font-bold">Envíos Gratis a Todo el País</h3>
            <p className="text-sm text-zinc-700">Compras mayores a $150.000</p>
          </div>
        </div>

        {/* ITEM 4 */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="min-w-16 min-h-16 border border-black rounded-full flex items-center justify-center">
            <RefreshCw size={24} />
          </div>
          <div>
            <h3 className="font-bold">Devolución Gratis</h3>
            <p className="text-sm text-zinc-700">
              La primera devolución corre por nuestra cuenta
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
