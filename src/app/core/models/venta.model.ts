export interface Venta {
  id: number;
  sede_id: number;
  cliente_id: number;
  doctor_id: number;
  user_id: number;
  direccion: string | null;
  referencia: string | null;
  observaciones: string | null;
  created_at: string | null;
  updated_at: string | null;
}
