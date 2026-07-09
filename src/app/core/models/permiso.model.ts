export interface Permiso {
  id: number;
  modulo_id?: number;
  name: string;
  guard_name: string;
  created_at: string | null;
  updated_at: string | null;
}
