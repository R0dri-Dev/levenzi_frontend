import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvPageActionsComponent } from '../page-actions/page-actions';
import { LvSearchBoxComponent } from '../search-box/search-box';


import type { TableToolbarVariant, TableToolbarLayout, TableToolbarSpacing } from '../../../types/table-toolbar.types';
import { LV_TABLE_TOOLBAR_BASE, LV_TABLE_TOOLBAR_LAYOUTS, LV_TABLE_TOOLBAR_SPACING, LV_TABLE_TOOLBAR_VARIANTS } from '../../../theme/table-toolbar.theme';

@Component({
  selector: 'lv-table-toolbar',
  standalone: true,
  imports: [CommonModule, LvPageActionsComponent, LvSearchBoxComponent],
  templateUrl: './table-toolbar.html',
  styleUrl: './table-toolbar.css',
})
export class LvTableToolbarComponent {
  readonly variant = input<TableToolbarVariant>('table');
  readonly layout = input<TableToolbarLayout>('horizontal');
  readonly spacing = input<TableToolbarSpacing>('md');
  readonly fullWidth = input(false);

  readonly classes = computed(() => {
    const base = LV_TABLE_TOOLBAR_BASE;
    const layout = LV_TABLE_TOOLBAR_LAYOUTS[this.layout()];
    const variant = LV_TABLE_TOOLBAR_VARIANTS[this.variant()];
    const spacing = LV_TABLE_TOOLBAR_SPACING[this.spacing()];
    const fullWidth = this.fullWidth() ? 'w-full' : '';

    return [base, layout, variant, spacing, fullWidth].filter(Boolean).join(' ');
  });
}
