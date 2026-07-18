import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { PaginatedResponse } from '../../models/pagination.model';
import { Familia } from '../../models/familia-model';

@Injectable({
  providedIn: 'root',
})
export class FamiliaService {
  private readonly api = inject(Api);
  private readonly base = '/api/familias';

  list(page = 1): Observable<PaginatedResponse<Familia>> {
    return this.api.get<PaginatedResponse<Familia>>(`${this.base}?page=${page}`);
  }

  getById(id: number): Observable<Familia> {
    return this.api.get<Familia>(`${this.base}/${id}`);
  }

  create(payload: Partial<Familia>): Observable<Familia> {
    return this.api.post<Familia>(this.base, payload);
  }

  update(id: number, payload: Partial<Familia>): Observable<Familia> {
    return this.api.put<Familia>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(`${this.base}/${id}`);
  }
}
