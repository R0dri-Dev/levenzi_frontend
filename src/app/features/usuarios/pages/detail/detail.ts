import { Component, input, output } from '@angular/core';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvSectionHeaderComponent } from '../../../../shared/ui/molecules/section-header/section-header';
import { User } from '../../../../core/models/user.model';

@Component({
    selector: 'app-detail-user',
    standalone: true,
    imports: [LvButtonComponent, LvDetailListComponent, LvSectionHeaderComponent],
    templateUrl: './detail.html',
    styleUrl: './detail.css',
})
export class DetailUser {
    readonly usuario = input<User | null>(null);
    readonly close = output<void>();

    get items() {
        const usuario = this.usuario();
        if (!usuario) return [];

        return [
            { label: 'ID', value: usuario.id },
            { label: 'Nombre', value: usuario.name },
            { label: 'Correo', value: usuario.email },
            { label: 'Teléfono', value: usuario.telefono || 'Sin teléfono' },
            { label: 'Estado', value: usuario.activo ? 'Activo' : 'Inactivo' },
            { label: 'Creado', value: usuario.created_at ? new Date(usuario.created_at).toLocaleDateString('es-ES') : 'Sin fecha' },
        ];
    }
}
