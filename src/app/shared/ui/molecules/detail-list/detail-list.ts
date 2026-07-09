import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lv-detail-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './detail-list.html',
    styleUrls: ['./detail-list.css'],
})
export class LvDetailListComponent {
    readonly items = input<Array<{ label: string; value: string | number | null | undefined }>>([]);
}
