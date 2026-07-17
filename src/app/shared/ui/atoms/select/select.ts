import {
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LvSize, LvColorVariant, LvAppearance } from '../../../types';
import { Option } from '../../../interfaces/option.interface';

@Component({
  selector: 'lv-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrls: ['./select.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LvSelectComponent),
      multi: true,
    },
  ],
})
export class LvSelectComponent implements ControlValueAccessor {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly options = input<Option[]>([]);
  readonly value = input<string | number>('');
  readonly disabled = input(false);
  readonly variant = input<LvColorVariant>('primary');
  readonly appearance = input<LvAppearance>('outline');
  readonly size = input<LvSize>('md');
  readonly placeholder = input<string>('Selecciona una opción');
  readonly label = input<string>('');
  readonly required = input(false);
  readonly error = input<string>('');

  readonly onValueChange = output<string | number>();

  readonly triggerRef = viewChild<ElementRef<HTMLButtonElement>>('trigger');

  internalValue = signal<string | number>('');
  isOpen = signal(false);
  openUpward = signal(false);

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  readonly selectedOption = computed(() =>
    this.options().find((opt) => String(opt.value) === String(this.internalValue()))
  );

  private markAsNullIfPlaceholder(raw: string): string | number | null {
    if (raw === '') return '';
    const num = Number(raw);
    return Number.isNaN(num) ? raw : num;
  }

  constructor() {
    effect(() => {
      const externalValue = this.value();
      untracked(() => {
        if (externalValue !== this.internalValue()) {
          this.internalValue.set(externalValue);
        }
      });
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen() && !this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  toggle(): void {
    if (this.disabled()) return;

    if (!this.isOpen()) {
      this.calculateDirection();
    }
    this.isOpen.update((v) => !v);
  }

  close(): void {
    this.isOpen.set(false);
    this.onTouched();
  }

  private calculateDirection(): void {
    const trigger = this.triggerRef()?.nativeElement;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const estimatedPanelHeight = Math.min(this.options().length * 40, 240);

    this.openUpward.set(spaceBelow < estimatedPanelHeight && spaceAbove > spaceBelow);
  }

  selectOption(opt: Option): void {
    if (opt.disabled) return;

    const normalized = this.markAsNullIfPlaceholder(String(opt.value)) ?? '';
    this.internalValue.set(normalized);
    this.onValueChange.emit(normalized);
    this.onChange(normalized);
    this.close();
  }

  compareValue(optValue: string | number): boolean {
    return String(optValue) === String(this.internalValue());
  }

  handleBlur(): void {
    if (!this.isOpen()) {
      this.onTouched();
    }
  }

  writeValue(value: string | number | null | undefined): void {
    this.internalValue.set((value ?? '').toString());
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // handled by disabled input
  }
}
