import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../../../core/services/api';
import { PaginatedResponse } from '../../../core/models/pagination.model';
import { Producto } from '../../../core/models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  private readonly api = inject(Api);

  list(page = 1): Observable<PaginatedResponse<Producto>> {
    return this.api.get<PaginatedResponse<Producto>>(
      `/api/productos?page=${page}`,
    );
  }

  getById(id: number): Observable<Producto> {
    return this.api.get<Producto>(`/api/productos/${id}`);
  }

  create(payload: Partial<Producto>): Observable<Producto> {
    return this.api.post<Producto>('/api/productos', payload);
  }

  update(id: number, payload: Partial<Producto>): Observable<Producto> {
    return this.api.put<Producto>(`/api/productos/${id}`, payload);
  }

  delete(id: number): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(`/api/productos/${id}`);
  }

}
