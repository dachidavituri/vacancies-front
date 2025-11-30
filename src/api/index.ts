import axios, { type CreateAxiosDefaults } from "axios";

const axiosConfigVacancies: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_VACANCIES_URL,
};

export const httpVacanciesClient = axios.create(axiosConfigVacancies);

httpVacanciesClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
