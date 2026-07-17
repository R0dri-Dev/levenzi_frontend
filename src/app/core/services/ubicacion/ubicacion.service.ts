import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { Departamento } from '../../models/departamento.model';
import { Provincia } from '../../models/provincia.model';
import { Distrito } from '../../models/distrito.model';

export interface DistritoConPadres extends Distrito {
  provincia: Provincia & { departamento: Departamento };
}
@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  private readonly api = inject(Api);

  listarDepartamentos(): Observable<Departamento[]> {
    return this.api.get<Departamento[]>('/api/ubicacion/departamentos');
  }

  listarProvincias(departamentoId: number): Observable<Provincia[]> {
    return this.api.get<Provincia[]>(`/api/ubicacion/provincias?departamento_id=${departamentoId}`);
  }

  listarDistritos(provinciaId: number): Observable<Distrito[]> {
    return this.api.get<Distrito[]>(`/api/ubicacion/distritos?provincia_id=${provinciaId}`);
  }

  obtenerDistrito(id: number): Observable<DistritoConPadres> {
    return this.api.get<DistritoConPadres>(`/api/ubicacion/distritos/${id}`);
  }
}
