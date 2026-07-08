import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSpinnerComponent } from '../spinner/spinner';

@Component({
  selector: 'lv-loading',
  standalone: true,
  imports: [CommonModule, LvSpinnerComponent],
  templateUrl: './loading.html',
  styleUrls: ['./loading.css'],
})
export class LvLoadingComponent {
  readonly text = input('Cargando...');
  readonly size = input<'sm' | 'md' | 'lg'>('lg');
  readonly fullScreen = input(false);
  readonly overlay = input(false);
}
