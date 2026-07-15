import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { Modulo } from '../../models/modulo.model';
import { PaginatedResponse } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class ModuloService {
  private readonly api = inject(Api);

  list(page = 1): Observable<PaginatedResponse<Modulo>> {
    return this.api.get<PaginatedResponse<Modulo>>(`/api/modulos?page=${page}`);
  }

  show(id: number): Observable<Modulo> {
    return this.api.get<Modulo>(`/api/modulos/${id}`);
  }

  create(payload: Partial<Modulo>): Observable<Modulo> {
    return this.api.post<Modulo>('/api/modulos', payload);
  }

  update(id: number, payload: Partial<Modulo>): Observable<Modulo> {
    return this.api.put<Modulo>(`/api/modulos/${id}`, payload);
  }

  delete(id: number): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(`/api/modulos/${id}`);
  }
}

