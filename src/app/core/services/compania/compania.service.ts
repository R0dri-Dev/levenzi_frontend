import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { Compania } from '../../models/compania.model';
import { PaginatedResponse } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class CompaniaService {
  private readonly api = inject(Api);

  list(page = 1): Observable<PaginatedResponse<Compania>> {
    return this.api.get<PaginatedResponse<Compania>>(`/api/companias?page=${page}`);
  }

  create(payload: Partial<Compania>): Observable<Compania> {
    return this.api.post<Compania>('/api/companias', payload);
  }

  get(id: number): Observable<Compania> {
    return this.api.get<Compania>(`/api/companias/${id}`);
  }

  update(id: number, payload: Partial<Compania>): Observable<Compania> {
    return this.api.put<Compania>(`/api/companias/${id}`, payload);
  }

  delete(id: number): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(`/api/companias/${id}`);
  }
}
