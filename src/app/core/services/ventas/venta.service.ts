import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { Venta } from '../../models/venta.model';
import { PaginatedResponse } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private readonly api = inject(Api);

  list(page = 1): Observable<PaginatedResponse<Venta>> {
    return this.api.get<PaginatedResponse<Venta>>(`/api/ventas?page=${page}`);
  }
}
