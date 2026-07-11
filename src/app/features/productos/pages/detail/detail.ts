import { Component, input, output } from '@angular/core';

import { Producto } from '../../../../core/models/producto.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvSectionHeaderComponent } from '../../../../shared/ui/molecules/section-header/section-header';

@Component({
    selector: 'app-detail-producto',
    standalone: true,
    imports: [LvButtonComponent, LvDetailListComponent, LvSectionHeaderComponent],
    templateUrl: './detail.html',
    styleUrl: './detail.css',
})
export class DetailProducto {
    readonly producto = input<Producto | null>(null);
    readonly close = output<void>();

    get items() {
        const producto = this.producto();
        if (!producto) return [];

        return [
            { label: 'ID', value: producto.id },
            { label: 'Nombre', value: producto.nombre },
            { label: 'Marca', value: producto.marca_id },
            { label: 'Código', value: producto.codigo || 'Sin código' },
            { label: 'Precio', value: producto.precio },
            { label: 'Descripción', value: producto.descripcion || 'Sin descripción' },
            { label: 'Estado', value: producto.activo ? 'Activo' : 'Inactivo' },
        ];
    }
}
