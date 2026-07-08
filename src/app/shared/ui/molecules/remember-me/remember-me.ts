import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvCheckboxComponent } from '../../atoms/checkbox/checkbox';
import { LvLabelComponent } from '../../atoms/label/label';
import { LvSize, LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-remember-me',
  standalone: true,
  imports: [CommonModule, LvCheckboxComponent, LvLabelComponent],
  templateUrl: './remember-me.html',
  styleUrls: ['./remember-me.css'],
})
export class LvRememberMeComponent {
  readonly label = input<string>('Recordarme');
  readonly color = input<LvColorVariant>('primary');
  readonly size = input<LvSize>('md');
  readonly disabled = input(false);
  readonly checked = input(false);

  readonly onToggle = output<boolean>();

  internalChecked = signal(false);

  constructor() {
    effect(() => {
      const externalChecked = this.checked();
      if (externalChecked !== this.internalChecked()) {
        this.internalChecked.set(externalChecked);
      }
    });
  }

  toggle(checked: boolean): void {
    if (this.disabled()) return;
    this.internalChecked.set(checked);
    this.onToggle.emit(checked);
  }
}
