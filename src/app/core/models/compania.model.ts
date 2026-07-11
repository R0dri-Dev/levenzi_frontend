export interface Compania {
  id: number;
  nombre: string;
  ruc: string;
  direccion: string;
  activo: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}
