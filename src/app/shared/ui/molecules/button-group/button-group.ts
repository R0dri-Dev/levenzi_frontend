import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvColorVariant } from '../../../types/colors.types';

export type LvButtonActionType = 'button' | 'submit' | 'reset';

export interface LvButtonAction {
  key?: string;
  label: string;
  variant?: LvColorVariant;
  type?: LvButtonActionType;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: any;
  rightIcon?: any;
}

@Component({
  selector: 'lv-button-group',
  standalone: true,
  imports: [CommonModule, LvButtonComponent],
  templateUrl: './button-group.html',
  styleUrls: ['./button-group.css'],
})
export class LvButtonGroupComponent {
  readonly actions = input.required<LvButtonAction[]>();
  readonly orientation = input<'row' | 'col'>('row');

  readonly onAction = output<LvButtonAction>();

  handleClick(action: LvButtonAction): void {
    this.onAction.emit(action);
  }
}

