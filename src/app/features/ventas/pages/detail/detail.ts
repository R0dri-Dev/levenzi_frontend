import { Component, input, output } from '@angular/core';

import { Venta } from '../../../../core/models/venta.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvSectionHeaderComponent } from '../../../../shared/ui/molecules/section-header/section-header';

@Component({
  selector: 'app-detail-venta',
  standalone: true,
  imports: [LvButtonComponent, LvDetailListComponent, LvSectionHeaderComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailVenta {
  readonly venta = input<Venta | null>(null);
  readonly close = output<void>();

  get items() {
    const venta = this.venta();
    if (!venta) return [];

    return [
      { label: 'ID', value: venta.id },
      { label: 'Sede', value: venta.sede_id },
      { label: 'Cliente', value: venta.cliente_id },
      { label: 'Doctor', value: venta.doctor_id },
      { label: 'Usuario', value: venta.user_id },
      { label: 'Dirección', value: venta.direccion || 'Sin dirección' },
      { label: 'Referencia', value: venta.referencia || 'Sin referencia' },
      { label: 'Observaciones', value: venta.observaciones || 'Sin observaciones' },
    ];
  }
}
