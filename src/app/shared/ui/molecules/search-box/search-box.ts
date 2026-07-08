import { Component, input, output, signal, effect, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvInputComponent } from '../../atoms/input/input';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvSize, LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-search-box',
  standalone: true,
  imports: [CommonModule, LvInputComponent, LvIconComponent, LvIconButtonComponent],
  templateUrl: './search-box.html',
  styleUrls: ['./search-box.css'],
})
export class LvSearchBoxComponent implements AfterViewInit {
  readonly placeholder = input<string>('Buscar...');
  readonly size = input<LvSize>('md');
  readonly color = input<LvColorVariant>('primary');
  readonly disabled = input(false);
  readonly value = input<string>('');
  readonly autoFocus = input(false);
  readonly debounceTime = input<number>(300);

  readonly onSearch = output<string>();
  readonly onClear = output<void>();
  readonly onFocus = output<void>();
  readonly onBlur = output<void>();

  searchValue = signal<string>('');
  private debounceTimer: any = null;
  readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('input');

  constructor() {
    effect(() => {
      const externalValue = this.value();
      if (externalValue !== this.searchValue()) {
        this.searchValue.set(externalValue);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.autoFocus() && this.inputElement()) {
      this.inputElement()?.nativeElement.focus();
    }
  }

  onInputChange(value: string): void {
    if (this.disabled()) return;
    this.searchValue.set(value);
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.onSearch.emit(value);
    }, this.debounceTime());
  }

  clearSearch(): void {
    if (this.disabled()) return;
    this.searchValue.set('');
    this.onClear.emit();
    this.onSearch.emit('');
    if (this.inputElement()) {
      this.inputElement()?.nativeElement.focus();
    }
  }
}
