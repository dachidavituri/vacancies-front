import { NavLink } from "react-router";

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-sky-400 to-[#0C1220] text-white">
      <div className="text-center">
        <h1 className="mb-4 text-7xl font-extrabold">404</h1>
        <p className="mb-6 text-xl">
          Oops! The page you're looking for doesn't exist.
        </p>
        <NavLink
          to="/"
          className="rounded-xl bg-[#DDE2E9] px-6 py-3 font-semibold text-[#3A6FF8] shadow-lg transition hover:bg-blue-100"
        >
          Go Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
