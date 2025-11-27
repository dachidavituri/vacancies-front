import { Routes, Route, Navigate } from "react-router";
import { MAIN_ROUTES } from "./default-layout";
import Layout from "@/components/layout/layout";
import { Suspense } from "react";
import { ROOT_PATH } from "./index.enum";
import NotFound from "@/pages/not-found";
import { MAIN_PATH } from "./default-layout/index.enum";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROOT_PATH.ROOT} element={<Layout />}>
        <Route index element={<Navigate to={MAIN_PATH.VACANCY} />} />
        {MAIN_ROUTES}
      </Route>
      <Route
        path={ROOT_PATH.NOTFOUND}
        element={
          <Suspense>
            <NotFound />
          </Suspense>
        }
      ></Route>
    </Routes>
  );
};
export default AppRoutes;
