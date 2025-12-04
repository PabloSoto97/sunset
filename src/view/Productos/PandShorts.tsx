import { useState } from "react";
import FilterSidebar from "../../components/FiltroSidebar";
import ProductosGrid from "../../components/ProductosGrid";
import { productos } from "../../data/productos"; // Asumo esta importación

// Definición de tipos para los filtros
type FilterState = {
  category: string;
  size: string;
  minPrice: number;
  maxPrice: number;
  sort: string;
};

// Componente para la vista de Remeras
export default function PandShortsView() {
  // 1. INICIALIZAR FILTROS CON LA CATEGORÍA 'REMERAS'
  const [filters, setFilters] = useState<FilterState>({
    category: "shorts", // <--- ¡AQUÍ ESTÁ EL CAMBIO CLAVE!
    size: "",
    minPrice: 0,
    maxPrice: 999999,
    sort: "",
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  // Modificamos la función para asegurarnos de que la categoría siempre sea "Remeras"
  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Siempre forzamos la categoría a "buzos" en esta vista
      category: "shorts",
    }));
  };

  // Lógica de Filtrado (la misma que ProductosView, pero ya con category="Remeras")
  const filteredProducts = productos
    // El filtro de categoría ahora es redundante, pero lo mantengo por si acaso
    .filter((p) =>
      filters.category ? p.categoria.nombre === filters.category : true
    )
    .filter((p) => (filters.size ? p.talles?.includes(filters.size) : true))
    .filter((p) => p.precio >= filters.minPrice && p.precio <= filters.maxPrice)
    .sort((a, b) => {
      if (filters.sort === "price-asc") return a.precio - b.precio;
      if (filters.sort === "price-desc") return b.precio - a.precio;
      // Asumo que 'id' mayor es más nuevo
      if (filters.sort === "newest") return b.id - a.id;
      return 0;
    });

  return (
    <div className="flex w-full min-h-screen px-4 lg:px-10 py-10 gap-12 mt-20">
      <h1 className="sr-only">Pants Y Shorts</h1>

      {/* ===== DESKTOP SIDEBAR (Filtros Secundarios) ===== */}
      {/* Es importante que el FilterSidebar sepa que no debe mostrar la opción de cambiar la categoría */}
      <div className="hidden lg:block w-64">
        {/* Podrías pasar una prop 'fixedCategory="Remeras"' al sidebar si quieres ocultar el selector de categoría en el sidebar */}
        <FilterSidebar onFilterChange={updateFilters} />
      </div>

      {/* ===== CONTENIDO ===== */}
      <div className="flex-1 relative">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-pink-600 pb-2">
          PANTS Y SHORTS
        </h2>

        {/* ===== BOTÓN MOBILE ===== */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="
              w-full flex items-center justify-between
              bg-black text-white px-4 py-3
              font-semibold text-sm uppercase tracking-wide
              border border-white/10 rounded
            "
          >
            <span>Filtro</span>
            <span className="text-xs opacity-70">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "producto" : "productos"}
            </span>
          </button>
        </div>

        {/* ===== MOBILE PANEL OVERLAY ===== */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/40 z-50 flex">
            {/* PANEL LATERAL */}
            <FilterSidebar
              onFilterChange={updateFilters}
              isMobile={true}
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              // Opcional: pasar una prop para ocultar el selector de categoría en el sidebar mobile
            />

            {/* Click afuera para cerrar */}
            <div className="flex-1" onClick={() => setMobileOpen(false)} />
          </div>
        )}

        {/* ===== PRODUCTOS ===== */}
        <ProductosGrid productos={filteredProducts} />
      </div>
    </div>
  );
}
