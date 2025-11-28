import React, { useEffect, useState } from "react";
import { useGetVacancies } from "@/react-query/query/vacancies";
import { Modal, message, Pagination, Input } from "antd";
import ApplyForm from "../components/apply-form";
import type { FilterValue, Vacancy } from "@/api/vacancies/index.types";
import type { ApplyFormInputs } from "../components/apply-form/index.types";
import { useSearchParams } from "react-router";
import { useDebounce } from "@uidotdev/usehooks";
import qs from "qs";
import { Controller, useForm } from "react-hook-form";
import { useSubmitApplication } from "@/react-query/mutation/apply";

const VacanciesView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultFilterValues = qs.parse(searchParams.toString());
  const mutation = useSubmitApplication()
  const { control, watch } = useForm<FilterValue>({
    defaultValues: defaultFilterValues || "",
  });
  const searched = watch("search");
  const debouncedSearch = useDebounce(searched, 1500)
  console.log(debouncedSearch)
  useEffect(() => {
    if (searched) {
      setSearchParams(
        qs.stringify(
          { search: searched },
          {
            skipNulls: true,
            filter: (_: any, value: any) => value || undefined,
          },
        ),
      );
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [searched, setSearchParams]);
  const { data: vacaciesData } = useGetVacancies(currentPage, 5, debouncedSearch);
  console.log(vacaciesData)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [formKey, setFormKey] = useState<number>(0);
  const handleApplyClick = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormKey((prev) => prev + 1);
  };

  const handleFormFinish = (values: ApplyFormInputs) => {
    console.log(
      "Form submitted for vacancy:",
      selectedVacancy && selectedVacancy.title,
      values,
    );
    if(!selectedVacancy){
      message.error('No vacancy selected');
      return;
    }
    mutation.mutate({...values, vacancyId: selectedVacancy?.id})
    message.success("თქვენი რეზიუმე წარმატებით გაიგზავნა!");
    handleCancel();
  };

  return (
    <div className="p-2 flex flex-col items-center">
      <form className="w-full max-w-md">
    <Controller
      control={control}
      name="search"
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
      {vacaciesData?.data.map((vacancy) => (

        <div
          key={vacancy.id}
          className="m-4 mt-8 w-[90%] overflow-hidden rounded-xl bg-linear-to-r from-[#F5C96B] to-[#FFE78F] shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <div className="p-6">
            <h1 className="mb-2 text-2xl font-extrabold text-[#3A6FF8]">
              {vacancy.title}
            </h1>
            <h2 className="mb-4 text-gray-800">{vacancy.description}</h2>
            <p className="mb-6 text-gray-600">{vacancy.date}</p>
            <button
              onClick={() => handleApplyClick(vacancy)}
              className="cursor-pointer rounded-full bg-[#3A6FF8] px-6 py-2 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-[#2c56c4]"
            >
              გადმოგვიგზავნე რეზიუმე
            </button>
          </div>
        </div>
      ))}
      <Pagination
        current={currentPage}
        pageSize={vacaciesData?.limit || 5}
        total={vacaciesData?.total || 0}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 16, textAlign: "center" }}
      />
      <Modal
        title={`Apply for ${selectedVacancy?.title || ""}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <ApplyForm key={formKey} onFinish={handleFormFinish} />
      </Modal>
    </div>
  );
};

export default VacanciesView;
