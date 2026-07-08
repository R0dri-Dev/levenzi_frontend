import { IconKeys } from '../core/icons';
import { UserRole } from '../enum/roles.enum';
import { LvColorVariant } from '../types';

export interface UserProfileData {
  name: string;
  email: string;
  avatar?: string;
  role?: UserRole;
  department?: string;
  location?: string;
  phone?: string;
  bio?: string;
  joinDate?: string;
}

export interface UserProfileStat {
  label: string;
  value: string | number;
  icon?: IconKeys;
  variant?: LvColorVariant;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  description?: string;
}
