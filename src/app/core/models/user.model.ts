export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  activo: boolean | number;
  telefono?: string | null;
  password?: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];

  first_page_url: string;
  from: number | null;
  last_page_url: string;
  last_page: number;

  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];

  next_page_url: string | null;
  prev_page_url: string | null;

  path: string;
  per_page: number;
  to: number | null;
  total: number;
}
