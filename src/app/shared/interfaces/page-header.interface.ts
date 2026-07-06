export interface PageHeaderAction {
  label: string;
  key?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface PageHeader {
  title: string;
  subtitle?: string;
  actions?: PageHeaderAction[];
}

