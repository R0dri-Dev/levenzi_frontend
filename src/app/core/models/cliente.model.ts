import { Pais } from './pais.model';
import { DistritoConPadres } from '../services/ubicacion/ubicacion.service';

export interface Cliente {
  id: number;
  sede_id: number;
  distrito_id: number;
  distrito?: DistritoConPadres;
  tipo_documento_id: number | null;
  documento_numero: string | null;
  nombre: string;
  direccion: string;
  pais_id: number | null;
  pais?: Pais;
  telefono: string | null;
  email: string | null;
  activo: boolean;
  created_at?: string;
  updated_at?: string;
}
