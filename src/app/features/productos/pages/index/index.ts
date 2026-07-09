import { Component, inject, signal } from '@angular/core';

import { Producto } from '../../../../core/models/producto.model';
import { ProductoService } from '../../../../core/services/productos/producto.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {

  private readonly service = inject(ProductoService);

  readonly productos = signal<Producto[]>([]);

  readonly total = signal(0);

  readonly loading = signal(true);

  constructor() {
    this.load();
  }

  load(): void {

    this.loading.set(true);

    this.service.list().subscribe({

      next: response => {

        this.productos.set(response.data);

        this.total.set(response.total);

        this.loading.set(false);

      },

      error: () => {

        this.loading.set(false);

      }

    });

  }

}
