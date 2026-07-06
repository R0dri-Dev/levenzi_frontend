// src/app/shared/types/page-header.types.ts
import type { HorizontalAlignment } from './alignment.types';

export type PageHeaderVariant = 'default' | 'compact' | 'with-image';
export type PageHeaderAlignment = HorizontalAlignment;

export interface PageHeaderAction {
  label: string;
  key?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface PageHeaderModel {
  title: string;
  subtitle?: string;
  actions?: PageHeaderAction[];
}
