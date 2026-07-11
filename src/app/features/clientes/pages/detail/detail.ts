import { Component, input, output } from '@angular/core';

import { Cliente } from '../../../../core/models/cliente.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvSectionHeaderComponent } from '../../../../shared/ui/molecules/section-header/section-header';

@Component({
    selector: 'app-detail-cliente',
    standalone: true,
    imports: [LvButtonComponent, LvDetailListComponent, LvSectionHeaderComponent],
    templateUrl: './detail.html',
    styleUrl: './detail.css',
})
export class DetailCliente {
    readonly cliente = input<Cliente | null>(null);
    readonly close = output<void>();

    get items() {
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
    }
}
