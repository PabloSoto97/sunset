import { Card } from "./Card";

interface Categoria {
  id: number;
  nombre: string;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  precioAnterior?: number;
  imagenes: string[];
  categoria: Categoria;
}

interface ProductosContainerProps {
  productos: Producto[];
}

export const CardContainers = ({ productos }: ProductosContainerProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-2 sm:px-6 mt-6">
      {productos.map((p) => (
        <Card
          key={p.id}
          id={p.id}
          nombre={p.nombre}
          precio={p.precio}
          precioAnterior={p.precioAnterior}
          imagenes={p.imagenes}
          categoria={p.categoria.nombre}
        />
      ))}
    </div>
  );
};
