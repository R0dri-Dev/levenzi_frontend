import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvSize } from '../../../types';
import { LV_SIZE_MAP } from '../../../types/size.types';

@Component({
  selector: 'lv-search-input',
  standalone: true,
  imports: [CommonModule, LvIconComponent],
  templateUrl: './search-input.html',
  styleUrls: ['./search-input.css'],
})
export class LvSearchInputComponent {
  readonly placeholder = input<string>('Buscar...');
  readonly size = input<LvSize>('md');
  readonly value = input<string>('');
  readonly valueChange = output<string>();

  get sizeClasses() {
    return LV_SIZE_MAP[this.size()];
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
