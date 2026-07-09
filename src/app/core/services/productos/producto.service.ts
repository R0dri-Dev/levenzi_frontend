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

}
