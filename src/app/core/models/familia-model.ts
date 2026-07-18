export interface Familia {
  id: number;
  familia_padre_id: number | null;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
  created_by: number | null;
  updated_by: number | null;
  created_at: string | null;
  updated_at: string | null;
}
