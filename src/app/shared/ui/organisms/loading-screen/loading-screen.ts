import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lv-loading-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-screen.html',
  styleUrl: './loading-screen.css',
})
export class LvLoadingScreenComponent {
  readonly message = input<string>('Cargando...');
  readonly fullScreen = input(false);
}
