import { Component, input, output } from '@angular/core';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvSectionHeaderComponent } from '../../../../shared/ui/molecules/section-header/section-header';
import { Sede } from '../../../../core/models/sede.model';

@Component({
    selector: 'app-detail-sede',
    standalone: true,
    imports: [LvButtonComponent, LvDetailListComponent, LvSectionHeaderComponent],
    templateUrl: './detail.html',
    styleUrl: './detail.css',
})
export class DetailSede {
    readonly sede = input<Sede | null>(null);
    readonly close = output<void>();

    get items() {
        const sede = this.sede();
        if (!sede) return [];

        return [
            { label: 'ID', value: sede.id },
            { label: 'Compañía ID', value: sede.compania_id },
            { label: 'Nombre', value: sede.nombre },
            { label: 'Código', value: sede.codigo },
            { label: 'Dirección', value: sede.direccion },
            { label: 'Teléfono', value: sede.telefono || 'Sin teléfono' },
            { label: 'Correo', value: sede.email || 'Sin correo' },
            { label: 'Estado', value: sede.activo ? 'Activo' : 'Inactivo' },
        ];
    }
}
