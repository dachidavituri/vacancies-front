import { Route } from "react-router";
import { MAIN_PATH } from "./index.enum";
import Loading from "@/components/loading";
import { lazy, Suspense } from "react";
const AboutView = lazy(() => import("@/pages/about/views"));
const VacanciesView = lazy(() => import("@/pages/vacancies/pages"));

export const MAIN_ROUTES = [
  <Route
    key={MAIN_PATH.ABOUT}
    path={MAIN_PATH.ABOUT}
    element={
      <Suspense fallback={<Loading />}>
        <AboutView />
      </Suspense>
    }
  ></Route>,
  <Route
    key={MAIN_PATH.VACANCY}
    path={MAIN_PATH.VACANCY}
    element={
      <Suspense fallback={<Loading />}>
        <VacanciesView />
      </Suspense>
    }
  ></Route>,
];
