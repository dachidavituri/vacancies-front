import { Input } from "antd";
import { Controller } from "react-hook-form";
import type { VacancySearchProps } from "./index.types";

const VacancySearch: React.FC<VacancySearchProps> = ({ control }) => (
  <form className="mb-4 w-full max-w-md">
    <Controller
      name="search"
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          placeholder="Search vacancies..."
          size="large"
          className="font-semibold"
        />
      )}
    />
  </form>
);

export default VacancySearch;
