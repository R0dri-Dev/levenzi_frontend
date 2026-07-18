import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { UnidadMedida } from '../../models/unidad-medida.model';
import { PaginatedResponse } from '../../models/pagination.model';

export interface UnidadMedidaFilters {
  tipo_unidad_medida_id?: number;
  per_page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class UnidadMedidaService {
  private readonly api = inject(Api);
  private readonly base = '/api/unidades-medida';

  list(page = 1, filters: UnidadMedidaFilters = {}): Observable<PaginatedResponse<UnidadMedida>> {
    const params = new URLSearchParams({ page: String(page) });

    if (filters.tipo_unidad_medida_id) {
      params.set('tipo_unidad_medida_id', String(filters.tipo_unidad_medida_id));
    }
    if (filters.per_page) {
      params.set('per_page', String(filters.per_page));
    }

    return this.api.get<PaginatedResponse<UnidadMedida>>(`${this.base}?${params.toString()}`);
  }

  getById(id: number): Observable<UnidadMedida> {
    return this.api.get<UnidadMedida>(`${this.base}/${id}`);
  }

  create(payload: Partial<UnidadMedida>): Observable<UnidadMedida> {
    return this.api.post<UnidadMedida>(this.base, payload);
  }

  update(id: number, payload: Partial<UnidadMedida>): Observable<UnidadMedida> {
    return this.api.put<UnidadMedida>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(`${this.base}/${id}`);
  }
}