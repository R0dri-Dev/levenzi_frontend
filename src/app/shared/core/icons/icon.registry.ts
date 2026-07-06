import { Injectable } from '@angular/core';
import { LV_ICONS, type IconKeys, type IconComponent } from './icons';
import { type IconSize, type IconStroke, getIconSizePx } from './icon.types';

@Injectable({
  providedIn: 'root'
})
export class IconRegistry {
  private icons = LV_ICONS;

  /**
   * Obtiene un icono por su nombre
   */
  getIcon(name: IconKeys): IconComponent {
    return this.icons[name];
  }

  /**
   * Verifica si un icono existe
   */
  hasIcon(name: string): name is IconKeys {
    return name in this.icons;
  }

  /**
   * Obtiene todos los nombres de iconos disponibles
   */
  getIconNames(): IconKeys[] {
    return Object.keys(this.icons) as IconKeys[];
  }

  /**
   * Obtiene el tamaño en px para un tamaño específico
   */
  getSizePx(size: IconSize): number {
    return getIconSizePx(size);
  }

  /**
   * Obtiene un icono con configuración
   */
  getIconWithConfig(name: IconKeys, size: IconSize = 'md', stroke: IconStroke = 2): {
    icon: IconComponent;
    size: number;
    strokeWidth: IconStroke;
  } {
    return {
      icon: this.getIcon(name),
      size: this.getSizePx(size),
      strokeWidth: stroke
    };
  }

  /**
   * Obtiene iconos para un array de nombres
   */
  getIcons(names: IconKeys[]): Record<IconKeys, IconComponent> {
    return names.reduce((acc, name) => {
      acc[name] = this.getIcon(name);
      return acc;
    }, {} as Record<IconKeys, IconComponent>);
  }
}
