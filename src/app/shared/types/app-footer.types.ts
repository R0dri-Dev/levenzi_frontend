// src/app/shared/types/app-footer.types.ts
export type AppFooterVariant = 'default' | 'dark' | 'compact';

export interface FooterLink {
  label: string;
  route?: string;
  url?: string;
  icon?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
