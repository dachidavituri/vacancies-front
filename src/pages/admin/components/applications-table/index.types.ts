export interface ApplicationTable {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  vacancyTitle: string;
  resumePath: string;
  vacancyId: number;
}

export interface ApplicationsTableProps {
  data: ApplicationTable[];
}