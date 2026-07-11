export interface Cliente {
  id: number;
  sede_id: number;
  distrito_id: number;
  nombre: string;
  documento_tipo: string | null;
  documento_numero: string | null;
  direccion: string;
  telefono: string | null;
  email: string | null;
  activo: boolean;
  created_at: string | null;
  updated_at: string | null;
}
