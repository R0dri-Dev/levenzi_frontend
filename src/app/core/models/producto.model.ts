export interface Producto {
  id: number;
  familia_id: number | null;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  precio: string;
  activo: boolean;
  created_at: string | null;
  updated_at: string | null;
}
