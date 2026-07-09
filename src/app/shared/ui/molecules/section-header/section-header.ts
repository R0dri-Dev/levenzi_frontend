import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvColorVariant, LvTextAlign } from '../../../types';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';

@Component({
    selector: 'lv-section-header',
    standalone: true,
    imports: [CommonModule, LvHeadingComponent, LvParagraphComponent],
    templateUrl: './section-header.html',
    styleUrls: ['./section-header.css'],
})
export class LvSectionHeaderComponent {
    readonly title = input<string>('');
    readonly subtitle = input<string>('');
    readonly align = input<LvTextAlign>('left');
    readonly color = input<LvColorVariant>('primary');
}
