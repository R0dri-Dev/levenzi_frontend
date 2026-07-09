import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from './api';

@Injectable({
  providedIn: 'root',
})
export class Menu {
  private readonly api = inject(Api);

  /**
   * Retorna los items del sidebar/menu para el usuario autenticado.
   */
  getMenu(): Observable<unknown[]> {
    return this.api.get('/api/me/menu');
  }
}

