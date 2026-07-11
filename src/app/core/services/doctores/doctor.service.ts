import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { Doctor } from '../../models/doctor.model';
import { PaginatedResponse } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private readonly api = inject(Api);

  list(page = 1): Observable<PaginatedResponse<Doctor>> {
    return this.api.get<PaginatedResponse<Doctor>>(`/api/doctores?page=${page}`);
  }

  create(payload: Partial<Doctor>): Observable<Doctor> {
    return this.api.post<Doctor>('/api/doctores', payload);
  }

  update(id: number, payload: Partial<Doctor>): Observable<Doctor> {
    return this.api.put<Doctor>(`/api/doctores/${id}`, payload);
  }

  delete(id: number): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(`/api/doctores/${id}`);
  }
}
