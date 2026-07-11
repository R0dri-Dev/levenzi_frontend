import { Component, input, output } from '@angular/core';

import { Marca } from '../../../../core/models/marca.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvSectionHeaderComponent } from '../../../../shared/ui/molecules/section-header/section-header';

@Component({
    selector: 'app-detail-marca',
    standalone: true,
    imports: [LvButtonComponent, LvDetailListComponent, LvSectionHeaderComponent],
    templateUrl: './detail.html',
    styleUrl: './detail.css',
})
export class DetailMarca {
    readonly marca = input<Marca | null>(null);
    readonly close = output<void>();

    get items() {
        const marca = this.marca();
        if (!marca) return [];

        return [
            { label: 'ID', value: marca.id },
            { label: 'Nombre', value: marca.nombre },
            { label: 'Código', value: marca.codigo || 'Sin código' },
            { label: 'Descripción', value: marca.descripcion || 'Sin descripción' },
            { label: 'Estado', value: marca.activo ? 'Activo' : 'Inactivo' },
        ];
    }
}
