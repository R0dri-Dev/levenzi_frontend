import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../../../core/services/api';
import { PaginatedResponse } from '../../../core/models/pagination.model';
import { Permiso } from '../../../core/models/permiso.model';
import { Modulo } from '../../models/modulo.model';

@Injectable({
  providedIn: 'root',
})
export class PermisoService {
  private readonly api = inject(Api);

  list(page = 1): Observable<PaginatedResponse<Permiso>> {
    return this.api.get<PaginatedResponse<Permiso>>(`/api/permisos?page=${page}`);
  }

  create(payload: Partial<Permiso>): Observable<Permiso> {
    return this.api.post<Permiso>('/api/permisos', payload);
  }

  update(id: number, payload: Partial<Permiso>): Observable<Permiso> {
    return this.api.put<Permiso>(`/api/permisos/${id}`, payload);
  }

  delete(id: number): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(`/api/permisos/${id}`);
  }

  listModulos(): Observable<Modulo[]> {
    return this.api.get<Modulo[]>('/api/modulos');
  }
}
