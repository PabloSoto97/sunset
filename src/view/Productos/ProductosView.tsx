import { useState } from "react";
import FilterSidebar from "../../components/FiltroSidebar";
import ProductosGrid from "../../components/ProductosGrid";
import { productos } from "../../data/productos";

export default function ProductosView() {
  const [filters, setFilters] = useState({
    category: "",
    size: "",
    minPrice: 0,
    maxPrice: 999999,
    sort: "",
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const filteredProducts = productos
    .filter((p) =>
      filters.category ? p.categoria.nombre === filters.category : true
    )
    .filter((p) => (filters.size ? p.talles?.includes(filters.size) : true))
    .filter((p) => p.precio >= filters.minPrice && p.precio <= filters.maxPrice)
    .sort((a, b) => {
      if (filters.sort === "price-asc") return a.precio - b.precio;
      if (filters.sort === "price-desc") return b.precio - a.precio;
      if (filters.sort === "newest") return b.id - a.id;
      return 0;
    });

  return (
    <div className="flex w-full min-h-screen px-4 lg:px-10 py-10 gap-12 mt-20">
      {/* ===== DESKTOP SIDEBAR (estética intacta) ===== */}
      <div className="hidden lg:block w-64">
        <FilterSidebar onFilterChange={updateFilters} />
      </div>

      {/* ===== CONTENIDO ===== */}
      <div className="flex-1 relative">
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
              {filteredProducts.length} productos
            </span>
          </button>
        </div>

        {/* ===== MOBILE PANEL OVERLAY ===== */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/40 z-50 flex">
            {/* PANEL LATERAL (usa estilo mobile del componente real) */}
            <FilterSidebar
              onFilterChange={updateFilters}
              isMobile={true}
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
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
