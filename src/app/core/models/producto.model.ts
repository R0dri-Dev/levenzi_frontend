export interface Producto {

  id: number;

  marca_id: number;

  instalacion_id: number;

  codigo: string;

  nombre: string;

  descripcion: string | null;

  precio: string;

  activo: boolean;

  created_at: string | null;

  updated_at: string | null;

}
