export interface Doctor {
  id: number;
  sede_id: number;
  nombre: string;
  cmp: string | null;
  especialidad: string | null;
  telefono: string | null;
  email: string | null;
  activo: boolean;
  created_at: string | null;
  updated_at: string | null;
}
