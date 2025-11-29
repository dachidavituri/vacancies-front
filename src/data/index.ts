import { MAIN_PATH } from "@/routes/default-layout/index.enum";
import { ROOT_PATH } from "@/routes/index.enum";

export const links = [
  { id: 1, name: "Vacancies", path: MAIN_PATH.VACANCY },
  { id: 2, name: "About", path: MAIN_PATH.ABOUT },
  { id: 3, name: "Admin", path: ROOT_PATH.ADMIN },
];

export const applyFormDefaultvalues = {
  name: "",
  email: "",
  phone: "",
  resume: [],
};
