import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { ProductoConversion } from '../../models/producto-conversion.model';
import { PaginatedResponse } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoConversionService {
  private readonly api = inject(Api);
  private readonly base = '/api/producto-conversiones';

  list(page = 1): Observable<PaginatedResponse<ProductoConversion>> {
    return this.api.get<PaginatedResponse<ProductoConversion>>(`${this.base}?page=${page}`);
  }

  getById(id: number): Observable<ProductoConversion> {
    return this.api.get<ProductoConversion>(`${this.base}/${id}`);
  }

  create(payload: Partial<ProductoConversion>): Observable<ProductoConversion> {
    return this.api.post<ProductoConversion>(this.base, payload);
  }

  update(id: number, payload: Partial<ProductoConversion>): Observable<ProductoConversion> {
    return this.api.put<ProductoConversion>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(`${this.base}/${id}`);
  }
}
