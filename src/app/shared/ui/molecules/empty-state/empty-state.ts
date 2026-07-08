import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import type { IconKeys } from '../../../core/icons';

export type EmptyStateSize = 'sm' | 'md' | 'lg';
export type EmptyStateVariant = 'default' | 'compact' | 'centered';

@Component({
  selector: 'lv-empty-state',
  standalone: true,
  imports: [CommonModule, LvIconComponent, LvButtonComponent, LvHeadingComponent, LvParagraphComponent],
  templateUrl: './empty-state.html',
  styleUrls: ['./empty-state.css'],
})
export class LvEmptyStateComponent {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly icon = input<IconKeys>('inbox');
  readonly size = input<EmptyStateSize>('md');
  readonly variant = input<EmptyStateVariant>('default');
  readonly actionLabel = input<string>();
  readonly actionIcon = input<IconKeys>();

  readonly onAction = output<void>();

  handleAction(): void {
    this.onAction.emit();
  }
}
