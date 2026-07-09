import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { Sede } from '../../models/sede.model';
import { PaginatedResponse } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class SedeService {
  private readonly api = inject(Api);

  list(page = 1): Observable<PaginatedResponse<Sede>> {
    return this.api.get<PaginatedResponse<Sede>>(`/api/sedes?page=${page}`);
  }

  create(payload: Partial<Sede>): Observable<Sede> {
    return this.api.post<Sede>('/api/sedes', payload);
  }

  update(id: number, payload: Partial<Sede>): Observable<Sede> {
    return this.api.put<Sede>(`/api/sedes/${id}`, payload);
  }

  delete(id: number): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(`/api/sedes/${id}`);
  }
}
