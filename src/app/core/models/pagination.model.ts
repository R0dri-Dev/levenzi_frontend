export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];

  first_page_url: string;
  from: number | null;

  last_page_url: string;
  last_page: number;

  links: PaginationLink[];

  next_page_url: string | null;
  prev_page_url: string | null;

  path: string;

  per_page: number;

  to: number | null;

  total: number;
}
