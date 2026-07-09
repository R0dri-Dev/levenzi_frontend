import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Permiso } from '../../../../core/models/permiso.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvSectionHeaderComponent } from '../../../../shared/ui/molecules/section-header/section-header';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, LvButtonComponent, LvSectionHeaderComponent, LvDetailListComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  readonly permiso = input<Permiso | null>(null);
  readonly close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}
