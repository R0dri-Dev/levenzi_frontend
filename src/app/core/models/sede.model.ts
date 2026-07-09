export interface Sede {
  id: number;
  compania_id: number;
  nombre: string;
  codigo: string;
  direccion: string;
  telefono?: string | null;
  email?: string | null;
  activo: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}
