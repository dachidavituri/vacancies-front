import { httpVacanciesClient } from "..";
import type { PaginatedVacancies } from "./index.types";

export const getVacanciesWithPagination = async (
  page: number,
  limit: number,
  search: string | undefined,
): Promise<PaginatedVacancies> => {
  try {
    const response = await httpVacanciesClient.get<PaginatedVacancies>(
      "/vacancies",
      {
        params: { page, limit, search: search || undefined },
      },
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching Vacancies", error);
    throw error;
  }
};
