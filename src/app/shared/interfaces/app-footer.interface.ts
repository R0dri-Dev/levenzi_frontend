import { IconKeys } from '../core/icons';

export interface FooterLink {
  label: string;
  route?: string;
  url?: string;
  icon?: IconKeys;
  action?: () => void;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
