import { Provincia } from './provincia.model';

export interface Distrito {
  id: number;
  nombre: string;
  provincia_id: number;
  provincia?: Provincia & { departamento?: import('./departamento.model').Departamento };
}
