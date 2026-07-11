import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { PaginatedResponse } from '../../models/pagination.model';
import { Role } from '../../models/role.model';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    private readonly api = inject(Api);

    list(page = 1): Observable<PaginatedResponse<Role>> {
        return this.api.get<PaginatedResponse<Role>>(`/api/roles?page=${page}`);
    }

    create(payload: Partial<Role>): Observable<Role> {
        return this.api.post<Role>('/api/roles', payload);
    }

    update(id: number, payload: Partial<Role>): Observable<Role> {
        return this.api.put<Role>(`/api/roles/${id}`, payload);
    }

    delete(id: number): Observable<{ success: boolean }> {
        return this.api.delete<{ success: boolean }>(`/api/roles/${id}`);
    }
}
