import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { Cliente } from '../../models/cliente.model';
import { PaginatedResponse } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly api = inject(Api);

  list(page = 1): Observable<PaginatedResponse<Cliente>> {
    return this.api.get<PaginatedResponse<Cliente>>(`/api/clientes?page=${page}`);
  }

  create(payload: Partial<Cliente>): Observable<Cliente> {
    return this.api.post<Cliente>('/api/clientes', payload);
  }

  update(id: number, payload: Partial<Cliente>): Observable<Cliente> {
    return this.api.put<Cliente>(`/api/clientes/${id}`, payload);
  }

  delete(id: number): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(`/api/clientes/${id}`);
  }
}
