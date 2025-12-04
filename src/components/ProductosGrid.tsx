import ProductoCard from "./ProductoCard";

export default function ProductosGrid({ productos }: { productos: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {productos.map((p) => (
        <ProductoCard key={p.id} producto={p} />
      ))}
    </div>
  );
}
