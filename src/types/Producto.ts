export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  precioAnterior?: number;

  descripcion: string;

  talles: string[];
  colores: string[];

  imagenes: string[];

  categoria: {
    id: number;
    nombre: string;
  };

  tags?: string[];
};
