import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/clientes/cliente.service';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';

@Component({
  selector: 'app-detail-cliente',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDetailListComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailCliente {
  private readonly service = inject(ClienteService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly cliente = signal<Cliente | null>(null);
  readonly loading = signal(true);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Clientes', route: '/clientes' },
    { label: 'Detalle' },
  ]);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/clientes']);
      return;
    }

    this.service.show(id).subscribe({
      next: (response) => {
        this.cliente.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/clientes']);
      },
    });
  }

  readonly items = computed<{
    label: string;
    value: any;
  }[]>(() => {
    const cliente = this.cliente();
    if (!cliente) return [];

    return [
      { label: 'ID', value: cliente.id },
      { label: 'Nombre', value: cliente.nombre },
      { label: 'Sede', value: cliente.sede_id },
      { label: 'Distrito', value: cliente.distrito_id },
      { label: 'Documento', value: cliente.documento_numero || 'Sin documento' },
      { label: 'Dirección', value: cliente.direccion },
      { label: 'Teléfono', value: cliente.telefono || 'Sin teléfono' },
      { label: 'Correo', value: cliente.email || 'Sin correo' },
      { label: 'Estado', value: cliente.activo ? 'Activo' : 'Inactivo' },
    ];
  });


  onBack(): void {
    this.router.navigate(['/clientes']);
  }
}


