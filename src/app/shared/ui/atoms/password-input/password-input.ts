import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSize, LvColorVariant, LvAppearance } from '../../../types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-password-input',
  standalone: true,
  imports: [CommonModule, LvIconComponent],
  templateUrl: './password-input.html',
  styleUrls: ['./password-input.css'],
})
export class LvPasswordInputComponent {
  // Inputs
  readonly variant = input<LvColorVariant>('primary');
  readonly appearance = input<LvAppearance>('outline');
  readonly size = input<LvSize>('md');
  readonly name = input<string>('');
  readonly placeholder = input<string>('Ingresa tu contraseña');
  readonly disabled = input(false);
  readonly value = input<string>('');
  readonly label = input<string>('Contraseña');
  readonly required = input(false);

  // Outputs
  readonly onValueChange = output<string>();

  // State
  readonly isShown = signal(false);

  // Methods
  toggleVisibility(): void {
    this.isShown.update(v => !v);
  }

  handleInput(event: Event): void {
    if (this.disabled()) return;
    const value = (event.target as HTMLInputElement).value;
    this.onValueChange.emit(value);
  }
}
