// src/app/shared/types/app-footer.types.ts
export type AppFooterVariant = 'default' | 'compact';

export interface FooterLink {
  label: string;
  route?: string;
  url?: string;
  icon?: string;
  action?: () => void;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
