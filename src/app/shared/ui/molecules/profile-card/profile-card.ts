import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvBadgeComponent } from '../../atoms/badge/badge';
import { LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-profile-card',
  standalone: true,
  imports: [CommonModule, LvBadgeComponent],
  templateUrl: './profile-card.html',
  styleUrls: ['./profile-card.css'],
})
export class LvProfileCardComponent {
  readonly nombre = input.required<string>();
  readonly estadoLabel = input<string>('');
  readonly estadoVariant = input<LvColorVariant>('success');
  readonly telefono = input<string>('');
  readonly flagIso = input<string>('');

  readonly iniciales = computed<string>(() =>
    this.nombre()
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((palabra) => palabra.charAt(0).toUpperCase())
      .join('')
  );
}
