import { Component, computed, input, output, signal, effect, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvInputComponent } from '../../atoms/input/input';

import {
  LV_SEARCH_BOX_BASE,
  LV_SEARCH_BOX_ICON,
  LV_SEARCH_BOX_ICON_SIZES,
} from '../../../theme/search-box.theme';
import type { SearchBoxSize, SearchBoxVariant } from '../../../types/search-box.types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-search-box',
  standalone: true,
  imports: [CommonModule, LvInputComponent, LvIconComponent, LvIconComponent],
  templateUrl: './search-box.html',
  styleUrl: './search-box.css',
})
export class LvSearchBoxComponent implements AfterViewInit {
  readonly placeholder = input<string>('Buscar...');
  readonly size = input<SearchBoxSize>('md');
  readonly variant = input<SearchBoxVariant>('default');
  readonly disabled = input(false);
  readonly value = input<string>('');
  readonly autoFocus = input(false);
  readonly debounceTime = input<number>(300);

  readonly onSearch = output<string>();
  readonly onClear = output<void>();
  readonly onFocus = output<void>();
  readonly onBlur = output<void>();

  private searchValue = signal<string>('');
  private debounceTimer: any = null;
  readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('input');

  readonly classes = computed(() => {
    const base = LV_SEARCH_BOX_BASE;
    const iconSize = LV_SEARCH_BOX_ICON_SIZES[this.size()];

    return {
      container: base,
      icon: [LV_SEARCH_BOX_ICON, iconSize].filter(Boolean).join(' '),
    };
  });

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
