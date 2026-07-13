import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { Marca } from '../../models/marca.model';
import { PaginatedResponse } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private readonly api = inject(Api);

  list(page = 1): Observable<PaginatedResponse<Marca>> {
    return this.api.get<PaginatedResponse<Marca>>(`/api/marcas?page=${page}`);
  }

  show(id: number): Observable<Marca> {
    return this.api.get<Marca>(`/api/marcas/${id}`);
  }

  create(payload: Partial<Marca>): Observable<Marca> {
    return this.api.post<Marca>('/api/marcas', payload);
  }

  update(id: number, payload: Partial<Marca>): Observable<Marca> {
    return this.api.put<Marca>(`/api/marcas/${id}`, payload);
  }

  delete(id: number): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(`/api/marcas/${id}`);
  }
}
