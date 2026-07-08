import { ChangeDetectionStrategy, Component, input, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvCardComponent } from '../../atoms/card/card';
import { LvPageFilterComponent } from '../page-filter/page-filter';
import { LvDividerComponent } from '../../atoms/divider/divider';
import { LvSize, LvAppearance } from '../../../types';

@Component({
  selector: 'lv-filters-panel',
  standalone: true,
  imports: [CommonModule, LvCardComponent, LvPageFilterComponent, LvDividerComponent],
  templateUrl: './filters-panel.html',
  styleUrls: ['./filters-panel.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvFiltersPanelComponent {
  readonly appearance = input<LvAppearance>('light');
  readonly size = input<LvSize>('md');
  readonly fullWidth = input(true);

  @ContentChild('header') headerContent: any;
  @ContentChild('footer') footerContent: any;

  hasHeader(): boolean {
    return !!this.headerContent;
  }

  hasFooter(): boolean {
    return !!this.footerContent;
  }
}
