import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { TipoDocumento } from '../../models/tipo-documento.model';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  private readonly api = inject(Api);

  list(): Observable<TipoDocumento[]> {
    return this.api.get<TipoDocumento[]>('/api/tipos-documento');
  }
}
