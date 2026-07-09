import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../../../core/services/api';
import { PaginatedResponse, User } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly api = inject(Api);

  list(page = 1): Observable<PaginatedResponse<User>> {
    return this.api.get<PaginatedResponse<User>>(`/api/usuarios?page=${page}`);
  }

  create(payload: Partial<User>): Observable<User> {
    return this.api.post<User>('/api/usuarios', payload);
  }

  update(id: number, payload: Partial<User>): Observable<User> {
    return this.api.put<User>(`/api/usuarios/${id}`, payload);
  }

  delete(id: number): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(`/api/usuarios/${id}`);
  }

}
