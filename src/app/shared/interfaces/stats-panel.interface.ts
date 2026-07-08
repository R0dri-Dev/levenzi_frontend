import { IconKeys } from '../core/icons';
import { LvColorVariant } from '../types';
import { StatCardTrend } from '../ui/molecules';

export interface StatItem {
  title: string;
  value: string | number;
  icon?: IconKeys;
  variant?: LvColorVariant;
  trend?: StatCardTrend;
  trendValue?: string;
  description?: string;
}
