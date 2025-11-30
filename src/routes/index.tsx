import { Routes, Route, Navigate } from "react-router";
import { MAIN_ROUTES } from "./default-layout";
import Layout from "@/components/layout/layout";
import { lazy, Suspense } from "react";
import { ROOT_PATH } from "./index.enum";
import { MAIN_PATH } from "./default-layout/index.enum";
import Loading from "@/components/loading";
const AdminPage = lazy(() => import("@/pages/admin/views/admin-page"));
const NotFound = lazy(() => import("@/pages/not-found"));

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
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      ></Route>
      <Route
        path={ROOT_PATH.ADMIN}
        element={
          <Suspense fallback={<Loading />}>
            <AdminPage />
          </Suspense>
        }
      ></Route>
    </Routes>
  );
};
export default AppRoutes;
