import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSize, LvColorVariant, LvAppearance } from '../../../types';

@Component({
  selector: 'lv-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.css'],
})
export class LvTextareaComponent {
  readonly value = input<string>('');
  readonly placeholder = input<string>('');
  readonly disabled = input(false);
  readonly variant = input<LvColorVariant>('primary');
  readonly appearance = input<LvAppearance>('outline');
  readonly size = input<LvSize>('md');
  readonly rows = input<number>(3);
  readonly label = input<string>('');
  readonly required = input(false);
  readonly error = input<string>('');
  readonly hint = input<string>('');

  readonly onValueChange = output<string>();

  handleInput(event: Event): void {
    if (this.disabled()) return;
    const value = (event.target as HTMLTextAreaElement).value;
    this.onValueChange.emit(value);
  }
}
