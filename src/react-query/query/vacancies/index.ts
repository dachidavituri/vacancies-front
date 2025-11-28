import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { VACANCIES_QUERY_KEYS } from "./enum";
import { getVacanciesWithPagination } from "@/api/vacancies";
import type { PaginatedVacancies } from "@/api/vacancies/index.types";

export const useGetVacancies = (
  page: number,
  limit: number = 5,
  search: string = ""
): UseQueryResult<PaginatedVacancies, Error> => {
  return useQuery<PaginatedVacancies, Error>({
    queryKey: [VACANCIES_QUERY_KEYS.VACANCIES, page, limit, search],
    queryFn: () => getVacanciesWithPagination(page, limit, search),
    staleTime: 1000 * 60,
  });
};
