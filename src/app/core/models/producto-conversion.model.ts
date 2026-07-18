export interface ProductoConversion {
  id: number;
  producto_id: number;
  unidad_medida_origen_id: number;
  unidad_medida_destino_id: number;
  factor_conversion: string;
  activo: boolean;
  created_at: string | null;
  updated_at: string | null;
}
