import { Component, input, output } from '@angular/core';

import { Instalacion } from '../../../../core/models/instalacion.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvSectionHeaderComponent } from '../../../../shared/ui/molecules/section-header/section-header';

@Component({
    selector: 'app-detail-instalacion',
    standalone: true,
    imports: [LvButtonComponent, LvDetailListComponent, LvSectionHeaderComponent],
    templateUrl: './detail.html',
    styleUrl: './detail.css',
})
export class DetailInstalacion {
    readonly instalacion = input<Instalacion | null>(null);
    readonly close = output<void>();

    get items() {
        const instalacion = this.instalacion();
        if (!instalacion) return [];

        return [
            { label: 'ID', value: instalacion.id },
            { label: 'Nombre', value: instalacion.nombre },
            { label: 'Sede', value: instalacion.sede_id },
            { label: 'Tipo', value: instalacion.tipo || 'Sin tipo' },
            { label: 'Estado', value: instalacion.activo ? 'Activo' : 'Inactivo' },
        ];
    }
}
