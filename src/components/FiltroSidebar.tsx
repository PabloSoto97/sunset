import { useEffect, useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  onFilterChange: (filters: {
    category?: string;
    size?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) => void;

  // AÑADIDO: Nueva prop para ocultar el selector de categoría
  hideCategorySelect?: boolean;

  // MOBILE
  isMobile?: boolean;
  open?: boolean;
  onClose?: () => void;
};

const categorias = [
  { name: "remeras", count: 6 },
  { name: "buzos", count: 3 },
  { name: "shorts", count: 2 },
];

const talles = [
  { name: "S", count: 12 },
  { name: "M", count: 15 },
  { name: "L", count: 8 },
  { name: "XL", count: 4 },
  { name: "XXL", count: 3 },
];

export default function FilterSidebar({
  onFilterChange,
  isMobile = false,
  open = false,
  onClose,
  hideCategorySelect = false, // Establecer valor por defecto
}: Props) {
  const [category, setCategory] = useState<string>();
  const [size, setSize] = useState<string>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sort, setSort] = useState<string>("");

  // --- MOBILE ACCORDION (IMOURI STYLE) ---
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Si la categoría está oculta, enviamos 'undefined' para que la vista contenedora se encargue del filtro
    // O si la categoría es seleccionada manualmente, la enviamos
    const categoryFilter = hideCategorySelect ? undefined : category;

    onFilterChange({
      category: categoryFilter,
      size,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sort,
    });
  }, [category, size, priceRange, sort, hideCategorySelect]); // Agregamos hideCategorySelect como dependencia

  // --------------------
  //     MOBILE VERSION
  // --------------------
  if (isMobile) {
    return (
      <div
        className={`
        fixed top-0 right-0 h-full w-72 bg-black text-white z-50
        border-l border-white/10
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {/* CLOSE BUTTON */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white">
          <X size={26} />
        </button>

        {/* TITLE */}
        <div className="px-5 pt-14 pb-3 border-b border-white/10">
          <p className="uppercase tracking-wide text-xs opacity-70">Filtro</p>
        </div>

        {/* ACCORDION BUTTON */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="
          w-full flex items-center justify-between
          px-5 py-4 text-sm font-semibold uppercase tracking-wider
          border-b border-white/10
        "
        >
          <span>Opciones</span>
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>

        {/* EXPANDABLE SECTION */}
        <div
          className={`
          overflow-hidden transition-all duration-300
          ${expanded ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <div className="px-5 py-4">
            {/* APLICACIÓN DE LA CONDICIÓN: Si hideCategorySelect es falso, muestra el bloque */}
            {!hideCategorySelect && (
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-wide mb-2">
                  Categorias
                </p>

                {categorias.map((c) => (
                  <button
                    key={c.name}
                    onClick={() =>
                      setCategory(category === c.name ? undefined : c.name)
                    }
                    className="flex justify-between w-full py-2 text-left hover:text-pink-500"
                  >
                    <span
                      className={
                        category === c.name ? "text-pink-500" : "text-white"
                      }
                    >
                      {c.name}
                    </span>
                    <span className="text-xs opacity-60">{c.count}</span>
                  </button>
                ))}
              </div>
            )}
            {/* FIN: CATEGORÍAS */}

            {/* Separador solo si la categoría no está oculta O es el inicio del resto de filtros */}
            {!hideCategorySelect && <hr className="border-white/10 my-4" />}

            {/* TALLE */}
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-wide mb-2">Size</p>

              {talles.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setSize(size === t.name ? undefined : t.name)}
                  className="flex justify-between w-full py-2 text-left hover:text-pink-500"
                >
                  <span
                    className={size === t.name ? "text-pink-500" : "text-white"}
                  >
                    {t.name}
                  </span>
                  <span className="text-xs opacity-60">{t.count}</span>
                </button>
              ))}
            </div>

            <hr className="border-white/10 my-4" />

            {/* PRECIO */}
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-wide mb-2">Precio</p>

              <div className="flex gap-2">
                <input
                  type="number"
                  className="w-1/2 px-2 py-1 bg-zinc-900 border border-white/10"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                />
                <input
                  type="number"
                  className="w-1/2 px-2 py-1 bg-zinc-900 border border-white/10"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                />
              </div>
            </div>

            <hr className="border-white/10 my-4" />

            {/* SORT */}
            <div className="mb-4">
              <p className="text-[11px] uppercase tracking-wide mb-2">
                Clasificar
              </p>

              <select
                className="w-full px-3 py-2 bg-zinc-900 border border-white/10"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Por Defecto</option>
                <option value="price-asc">Precio Bajo → Alto</option>
                <option value="price-desc">Precio Alto → Bajo</option>
                <option value="newest">Lo mas nuevo</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------
  //     DESKTOP VERSION
  // --------------------
  return (
    <aside
      className="
        bg-black border-r border-white/10 text-white
        p-6 w-72 sticky top-[var(--nav-height)]
      "
    >
      {/* Título */}
      <h2 className="text-[13px] uppercase tracking-wide opacity-70 mb-4">
        Filtros
      </h2>

      {/* APLICACIÓN DE LA CONDICIÓN: Si hideCategorySelect es falso, muestra el bloque */}
      {!hideCategorySelect && (
        <>
          {/* Categorías */}
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-wide mb-2">
              Categorias
            </p>

            {categorias.map((c) => (
              <button
                key={c.name}
                onClick={() =>
                  setCategory(category === c.name ? undefined : c.name)
                }
                className="flex justify-between w-full py-2 text-left hover:text-pink-500 transition"
              >
                <span
                  className={`${
                    category === c.name ? "text-pink-500" : "text-white"
                  }`}
                >
                  {c.name}
                </span>
                <span className="text-xs opacity-60">{c.count}</span>
              </button>
            ))}
          </div>

          <hr className="border-white/10 my-4" />
        </>
      )}
      {/* FIN: CATEGORÍAS */}

      {/* Talle */}
      <div className="mb-6">
        <p className="text-[11px] uppercase tracking-wide mb-2">Tamaño</p>

        {talles.map((t) => (
          <button
            key={t.name}
            onClick={() => setSize(size === t.name ? undefined : t.name)}
            className="flex justify-between w-full py-2 text-left hover:text-pink-500 transition"
          >
            <span
              className={`${size === t.name ? "text-pink-500" : "text-white"}`}
            >
              {t.name}
            </span>
            <span className="text-xs opacity-60">{t.count}</span>
          </button>
        ))}
      </div>

      <hr className="border-white/10 my-4" />

      {/* Precio */}
      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-wide mb-2">Precio</p>

        <div className="flex gap-2">
          <input
            type="number"
            className="w-1/2 px-2 py-1 text-white bg-zinc-900 border border-white/10"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
          <input
            type="number"
            className="w-1/2 px-2 py-1 text-white bg-zinc-900 border border-white/10"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>

      <hr className="border-white/10 my-4" />

      {/* Sort */}
      <div>
        <p className="text-[11px] uppercase tracking-wide mb-2">Clasificar</p>

        <select
          className="w-full px-3 py-2 bg-zinc-900 border border-white/10 text-white"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Por Defecto</option>
          <option value="price-asc">Precio Bajo → Alto</option>
          <option value="price-desc">Precio Alto → Bajo</option>
          <option value="newest">Lo mas nuevo</option>
        </select>
      </div>
    </aside>
  );
}
