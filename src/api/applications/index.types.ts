export interface GetApplicationsParams {
  vacancyId?: number;
  date?: string;
  sortBy?: "name" | "date";
  order?: "ASC" | "DESC";
}

export interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  vacancyId: number;
  resumePath: string;
  date: string;
  vacancyTitle: string
}

export interface GetApplicationsResponse {
  count: number;
  applications: Application[];
}
