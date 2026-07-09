export interface Compania {
  id: number;
  nombre: string;
  ruc: string;
  direccion: string;
  telefono?: string | null;
  activo: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}
