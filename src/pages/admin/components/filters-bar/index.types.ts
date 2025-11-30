export interface FiltersBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  vacancyOptions: string[];
  vacancyFilter: string | null;
  onVacancyChange: (value: string | null) => void;
  dateFilter: [Date, Date] | null;
  onDateChange: (dates: [Date, Date] | null) => void;
  sortOrder: "ascend" | "descend" | null;
  onSortChange: (value: "ascend" | "descend" | null) => void;
  onExportCSV: () => void;
}