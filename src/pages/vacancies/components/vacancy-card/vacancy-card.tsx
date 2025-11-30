import type { VacancyCardProps } from "./index.types";

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy, onApply }) => (
  <div className="m-4 mt-8 w-[90%] overflow-hidden rounded-xl bg-linear-to-r from-[#F5C96B] to-[#FFE78F] shadow-lg transition-transform duration-300 hover:scale-105">
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-extrabold text-[#3A6FF8]">
        {vacancy.title}
      </h1>
      <h2 className="mb-4 text-gray-800">{vacancy.description}</h2>
      <p className="mb-6 text-gray-600">{vacancy.date}</p>
      <button
        onClick={onApply}
        className="cursor-pointer rounded-full bg-[#3A6FF8] px-6 py-2 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-[#2c56c4]"
      >
        გადმოგვიგზავნე რეზიუმე
      </button>
    </div>
  </div>
);

export default VacancyCard;
