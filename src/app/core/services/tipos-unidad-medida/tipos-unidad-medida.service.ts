import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { TipoUnidadMedida } from '../../models/tipo-unidad-medida.model';
import { PaginatedResponse } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class TipoUnidadMedidaService {
  private readonly api = inject(Api);
  private readonly base = '/api/tipos-unidad-medida';

  list(page = 1): Observable<PaginatedResponse<TipoUnidadMedida>> {
    return this.api.get<PaginatedResponse<TipoUnidadMedida>>(`${this.base}?page=${page}`);
  }

  getById(id: number): Observable<TipoUnidadMedida> {
    return this.api.get<TipoUnidadMedida>(`${this.base}/${id}`);
  }

  create(payload: Partial<TipoUnidadMedida>): Observable<TipoUnidadMedida> {
    return this.api.post<TipoUnidadMedida>(this.base, payload);
  }

  update(id: number, payload: Partial<TipoUnidadMedida>): Observable<TipoUnidadMedida> {
    return this.api.put<TipoUnidadMedida>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(`${this.base}/${id}`);
  }
}
