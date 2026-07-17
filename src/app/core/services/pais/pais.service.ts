import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { Pais } from '../../models/pais.model';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private readonly api = inject(Api);

  list(): Observable<Pais[]> {
    return this.api.get<Pais[]>('/api/paises');
  }
}
