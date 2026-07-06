// src/app/shared/types/stats-panel.types.ts
export interface StatItem {
  title: string;
  value: string | number;
  icon?: string;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  description?: string;
}
