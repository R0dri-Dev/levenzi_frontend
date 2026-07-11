import { Component, input, output } from '@angular/core';

import { Doctor } from '../../../../core/models/doctor.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvSectionHeaderComponent } from '../../../../shared/ui/molecules/section-header/section-header';

@Component({
    selector: 'app-detail-doctor',
    standalone: true,
    imports: [LvButtonComponent, LvDetailListComponent, LvSectionHeaderComponent],
    templateUrl: './detail.html',
    styleUrl: './detail.css',
})
export class DetailDoctor {
    readonly doctor = input<Doctor | null>(null);
    readonly close = output<void>();

    get items() {
        const doctor = this.doctor();
        if (!doctor) return [];

        return [
            { label: 'ID', value: doctor.id },
            { label: 'Nombre', value: doctor.nombre },
            { label: 'Sede', value: doctor.sede_id },
            { label: 'CMP', value: doctor.cmp || 'Sin CMP' },
            { label: 'Especialidad', value: doctor.especialidad || 'Sin especialidad' },
            { label: 'Teléfono', value: doctor.telefono || 'Sin teléfono' },
            { label: 'Correo', value: doctor.email || 'Sin correo' },
            { label: 'Estado', value: doctor.activo ? 'Activo' : 'Inactivo' },
        ];
    }
}
