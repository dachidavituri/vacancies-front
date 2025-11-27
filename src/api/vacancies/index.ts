import { httpVacanciesClient } from "..";
import type { Vacancy } from "./index.types";

export const getVacancies = async (): Promise<Vacancy[]> => {
  try {
    const response = await httpVacanciesClient.get<Vacancy[]>("/");
    return response.data;
  } catch (error) {
    console.log("Error while fetching Vacancies", error);
    throw error;
  }
};
