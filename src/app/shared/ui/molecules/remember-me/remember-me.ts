import { Component, computed, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LvLabelComponent } from '../../atoms/label/label';

import {
  LV_REMEMBER_ME_BASE,
  LV_REMEMBER_ME_CHECKBOX,
  LV_REMEMBER_ME_SIZES,
  LV_REMEMBER_ME_LABEL,
  LV_REMEMBER_ME_LABEL_SIZES,
  LV_REMEMBER_ME_VARIANTS,
} from '../../../theme/remember-me.theme';
import type { RememberMeVariant, RememberMeSize } from '../../../types/remember-me.types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-remember-me',
  standalone: true,
  imports: [CommonModule, FormsModule, LvIconComponent, LvLabelComponent],
  templateUrl: './remember-me.html',
  styleUrl: './remember-me.css',
})
export class LvRememberMeComponent {
  readonly label = input<string>('Recordarme');
  readonly variant = input<RememberMeVariant>('primary');
  readonly size = input<RememberMeSize>('md');
  readonly disabled = input(false);
  readonly checked = input(false);

  readonly onToggle = output<boolean>();

  internalChecked = signal(false);


  readonly classes = computed(() => {
    const base = LV_REMEMBER_ME_BASE;
    const checkbox = LV_REMEMBER_ME_CHECKBOX;
    const size = LV_REMEMBER_ME_SIZES[this.size()];
    const label = LV_REMEMBER_ME_LABEL;
    const labelSize = LV_REMEMBER_ME_LABEL_SIZES[this.size()];
    const variant = LV_REMEMBER_ME_VARIANTS[this.variant()];
    const disabled = this.disabled() ? 'opacity-50 cursor-not-allowed' : '';

    return {
      container: [base, disabled].filter(Boolean).join(' '),
      checkbox: [checkbox, size].filter(Boolean).join(' '),
      label: [label, labelSize, variant].filter(Boolean).join(' '),
    };
  });

  constructor() {
    effect(() => {
      const externalChecked = this.checked();
      if (externalChecked !== this.internalChecked()) {
        this.internalChecked.set(externalChecked);
      }
    });
  }

  toggle(event: Event): void {
    if (this.disabled()) return;

    const target = event.target as HTMLInputElement;
    this.internalChecked.set(target.checked);
    this.onToggle.emit(target.checked);
  }
}
