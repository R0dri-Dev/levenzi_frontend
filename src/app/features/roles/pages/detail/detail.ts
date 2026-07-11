import { Component, input, output } from '@angular/core';

import { Role } from '../../../../core/models/role.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvSectionHeaderComponent } from '../../../../shared/ui/molecules/section-header/section-header';

@Component({
    selector: 'app-detail-role',
    standalone: true,
    imports: [LvButtonComponent, LvDetailListComponent, LvSectionHeaderComponent],
    templateUrl: './detail.html',
    styleUrl: './detail.css',
})
export class DetailRole {
    readonly role = input<Role | null>(null);
    readonly close = output<void>();

    get items() {
        const role = this.role();
        if (!role) return [];

        return [
            { label: 'ID', value: role.id },
            { label: 'Nombre', value: role.name },
            { label: 'Guard', value: role.guard_name || 'Sin guard' },
        ];
    }
}
