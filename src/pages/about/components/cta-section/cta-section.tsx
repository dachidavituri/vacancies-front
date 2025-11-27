import { MAIN_PATH } from "@/routes/default-layout/index.enum";
import { Link } from "react-router";

const CtaSection: React.FC = () => {
  return (
    <div className="mt-16 text-center">
      <h3 className="mb-4 text-3xl font-bold text-[#3A6FF8]">
        Start Your Journey
      </h3>
      <p className="mx-auto mb-6 max-w-xl text-[#0C1220]">
        Discover your dream job. Thousands of opportunities await.
      </p>
      <Link to={`/${MAIN_PATH.VACANCY}`}>
        <button className="cursor-pointer rounded-xl bg-[#3A6FF8] px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-[#2f59c5]">
          Browse Vacancies
        </button>
      </Link>
    </div>
  );
};

export default CtaSection;
