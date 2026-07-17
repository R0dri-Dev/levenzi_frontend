import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { ConsultaDni, ConsultaRuc } from '../../models/consulta-documento.model';

@Injectable({
  providedIn: 'root',
})
export class DecolectaService {
  private readonly api = inject(Api);

  consultarDni(numero: string): Observable<ConsultaDni> {
    return this.api.get<ConsultaDni>(`/api/documentos/dni?numero=${numero}`);
  }

  consultarRuc(numero: string): Observable<ConsultaRuc> {
    return this.api.get<ConsultaRuc>(`/api/documentos/ruc?numero=${numero}`);
  }
}
