import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './link.html',
  styleUrls: ['./link.css'],
})
export class LvLinkComponent {
  readonly href = input('');
  readonly routerLink = input('');
  readonly external = input(false);
  readonly color = input<LvColorVariant>('primary');
  readonly underline = input<boolean>(true);
  readonly bold = input<boolean>(false);
}
