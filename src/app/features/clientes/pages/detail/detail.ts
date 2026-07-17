import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/clientes/cliente.service';
import { LvDetailListComponent, DetailItem } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvBadgeComponent } from '../../../../shared/ui/atoms/badge/badge';
import { LvSpinnerComponent } from '../../../../shared/ui/atoms/spinner/spinner';
import { LvProfileCardComponent } from "../../../../shared/ui/molecules/profile-card/profile-card";
import { LvDetailPageComponent } from "../../../../shared/ui/organisms/detail-page/detail-page";

@Component({
  selector: 'app-detail-cliente',
  standalone: true,
  imports: [
    LvPageHeaderComponent,
    LvButtonComponent,
    LvSpinnerComponent,
    LvDetailPageComponent
  ],
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

  readonly iniciales = computed<string>(() => {
    const nombre = this.cliente()?.nombre ?? '';
    return nombre
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((palabra) => palabra.charAt(0).toUpperCase())
      .join('');
  });

  readonly telefonoCompleto = computed<string>(() => {
    const cliente = this.cliente();
    if (!cliente?.telefono) return 'Sin teléfono';
    const codigo = cliente.pais?.codigo_telefono ? `${cliente.pais.codigo_telefono} ` : '';
    return `${codigo}${cliente.telefono}`;
  });

  readonly banderaIso = computed<string>(() =>
    this.cliente()?.pais?.codigo_iso2?.toLowerCase() ?? ''
  );
  readonly items = computed<DetailItem[]>(() => {
    const cliente = this.cliente();
    if (!cliente) return [];

    const departamento = cliente.distrito?.provincia?.departamento?.nombre ?? 'Sin dato';
    const provincia = cliente.distrito?.provincia?.nombre ?? 'Sin dato';
    const distrito = cliente.distrito?.nombre ?? 'Sin dato';

    return [
      { label: 'ID', value: `#${cliente.id}` },
      { label: 'Documento', value: cliente.documento_numero || 'Sin documento' },
      { label: 'Sede', value: cliente.sede_id },
      { label: 'Departamento', value: departamento },
      { label: 'Provincia', value: provincia },
      { label: 'Distrito', value: distrito },
      { label: 'Dirección', value: cliente.direccion },
      { label: 'Correo', value: cliente.email || 'Sin correo' },
    ];
  });

  onBack(): void {
    this.router.navigate(['/clientes']);
  }
}
