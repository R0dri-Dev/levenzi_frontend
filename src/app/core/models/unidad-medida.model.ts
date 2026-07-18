export interface UnidadMedida {
  id: number;
  tipo_unidad_medida_id: number;
  nombre: string;
  simbolo: string;
  factor_base: string;
  base: boolean;
  conversion: boolean;
  activo: boolean;
  created_at: string | null;
  updated_at: string | null;
}
