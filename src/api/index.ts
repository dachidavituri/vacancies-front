import axios, { type CreateAxiosDefaults } from "axios";

const axiosConfigVacancies: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_VACANCIES_URL,
};

export const httpVacanciesClient = axios.create(axiosConfigVacancies);
