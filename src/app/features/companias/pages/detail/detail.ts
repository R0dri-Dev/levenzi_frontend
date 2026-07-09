import { Component, input, output } from '@angular/core';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvSectionHeaderComponent } from '../../../../shared/ui/molecules/section-header/section-header';
import { Compania } from '../../../../core/models/compania.model';

@Component({
    selector: 'app-detail-compania',
    standalone: true,
    imports: [LvButtonComponent, LvDetailListComponent, LvSectionHeaderComponent],
    templateUrl: './detail.html',
    styleUrl: './detail.css',
})
export class DetailCompania {
    readonly compania = input<Compania | null>(null);
    readonly close = output<void>();

    get items() {
        const compania = this.compania();
        if (!compania) return [];

        return [
            { label: 'ID', value: compania.id },
            { label: 'Nombre', value: compania.nombre },
            { label: 'RUC', value: compania.ruc },
            { label: 'Dirección', value: compania.direccion },
            { label: 'Teléfono', value: compania.telefono || 'Sin teléfono' },
            { label: 'Estado', value: compania.activo ? 'Activo' : 'Inactivo' },
        ];
    }
}
