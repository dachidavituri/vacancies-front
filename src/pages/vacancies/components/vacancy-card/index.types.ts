import type { Vacancy } from "@/api/vacancies/index.types";

export interface VacancyCardProps {
  vacancy: Vacancy;
  onApply: () => void;
}
