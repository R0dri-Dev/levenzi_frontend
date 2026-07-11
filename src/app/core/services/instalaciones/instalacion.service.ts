import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { PaginatedResponse } from '../../models/pagination.model';
import { Instalacion } from '../../models/instalacion.model';

@Injectable({
    providedIn: 'root',
})
export class InstalacionService {
    private readonly api = inject(Api);

    list(page = 1): Observable<PaginatedResponse<Instalacion>> {
        return this.api.get<PaginatedResponse<Instalacion>>(`/api/instalaciones?page=${page}`);
    }

    create(payload: Partial<Instalacion>): Observable<Instalacion> {
        return this.api.post<Instalacion>('/api/instalaciones', payload);
    }

    update(id: number, payload: Partial<Instalacion>): Observable<Instalacion> {
        return this.api.put<Instalacion>(`/api/instalaciones/${id}`, payload);
    }

    delete(id: number): Observable<{ success: boolean }> {
        return this.api.delete<{ success: boolean }>(`/api/instalaciones/${id}`);
    }
}
