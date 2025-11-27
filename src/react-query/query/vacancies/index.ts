import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { VACANCIES_QUERY_KEYS } from "./enum";
import { getVacancies } from "@/api/vacancies";
import type { Vacancy } from "@/api/vacancies/index.types";

export const useGetVacancies = (): UseQueryResult<Vacancy[], Error> => {
  return useQuery<Vacancy[], Error>({
    queryKey: [VACANCIES_QUERY_KEYS.VACANCIES],
    queryFn: getVacancies,
  });
};
