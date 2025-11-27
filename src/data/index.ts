import { MAIN_PATH } from "@/routes/default-layout/index.enum";

export const links = [
  { id: 1, name: "Vacancies", path: MAIN_PATH.VACANCY },
  { id: 2, name: "About", path: MAIN_PATH.ABOUT },
];

export const applyFormDefaultvalues = {
  name: "",
  email: "",
  phone: "",
  resume: [],
};
