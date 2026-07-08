import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvLinkComponent } from '../../atoms/link/link';
import { LvDividerComponent } from '../../atoms/divider/divider';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { FooterLink, FooterSection } from '../../../interfaces/app-footer.interface';

@Component({
  selector: 'lv-app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, LvIconComponent, LvLinkComponent, LvDividerComponent, LvParagraphComponent, LvHeadingComponent],
  templateUrl: './app-footer.html',
  styleUrls: ['./app-footer.css'],
})
export class LvAppFooterComponent {
  readonly sections = input<FooterSection[]>([]);
  readonly copyright = input<string>('© 2024 Levenzi. Todos los derechos reservados.');
  readonly socialLinks = input<FooterLink[]>([]);
}
