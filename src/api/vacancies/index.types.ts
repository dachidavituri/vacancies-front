export interface Vacancy {
  id: number;
  title: string;
  description: string;
  date: string;
}

export interface PaginatedVacancies {
  data: Vacancy[];
  total: number;
  page: number;
  limit: number;
}

export interface FilterValue {
  search: string;
}
