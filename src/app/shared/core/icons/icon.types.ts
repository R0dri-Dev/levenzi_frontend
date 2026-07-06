import type { IconComponent, IconKeys } from './icons';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IconStroke = 1 | 1.5 | 2 | 2.5 | 3;

export interface IconConfig {
  name: IconKeys;
  size?: IconSize;
  stroke?: IconStroke;
  className?: string;
  color?: string;
  ariaLabel?: string;
}

export const ICON_SIZE_PX: Record<IconSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
} as const;

export const ICON_SIZE_CLASSES: Record<IconSize, string> = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
} as const;

export const ICON_STROKE_BY_SIZE: Record<IconSize, IconStroke> = {
  xs: 2,
  sm: 2,
  md: 2,
  lg: 1.5,
  xl: 1.5
} as const;

export type IconRenderer = (icon: IconComponent) => any;

export function getIconSizePx(size: IconSize): number {
  return ICON_SIZE_PX[size];
}

export function getIconSizeClasses(size: IconSize): string {
  return ICON_SIZE_CLASSES[size];
}
