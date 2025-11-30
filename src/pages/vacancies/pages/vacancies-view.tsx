import React, { useEffect, useState } from "react";
import { useGetVacancies } from "@/react-query/query/vacancies";
import { Modal, message, Pagination } from "antd";
import ApplyForm from "../components/apply-form";
import type { FilterValue, Vacancy } from "@/api/vacancies/index.types";
import type { ApplyFormInputs } from "../components/apply-form/index.types";
import { useSearchParams } from "react-router";
import { useDebounce } from "@uidotdev/usehooks";
import qs from "qs";
import { useForm } from "react-hook-form";
import { useSubmitApplication } from "@/react-query/mutation/apply";
import VacancyCard from "../components/vacancy-card";
import VacancySearch from "../components/vacancy-search";

const VacanciesView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultFilterValues = qs.parse(searchParams.toString());

  const mutation = useSubmitApplication();
  const { control, watch } = useForm<FilterValue>({
    defaultValues: defaultFilterValues || "",
  });
  
  const searched = watch("search");
  const debouncedSearch = useDebounce(searched, 1500);


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


  const { data: vacanciesData } = useGetVacancies(
    currentPage,
    5,
    debouncedSearch,
  );


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
    if (!selectedVacancy) {
      message.error("No vacancy selected");
      return;
    }
    mutation.mutate({ ...values, vacancyId: selectedVacancy?.id });
    message.success("თქვენი რეზიუმე წარმატებით გაიგზავნა!");
    handleCancel();
  };

  return (
    <div className="flex flex-col items-center p-2">
      <VacancySearch control={control} />
      {vacanciesData?.data.map((v) => (
        <VacancyCard
          key={v.id}
          vacancy={v}
          onApply={() => handleApplyClick(v)}
        />
      ))}
      <Pagination
        current={currentPage}
        pageSize={vacanciesData?.limit || 5}
        total={vacanciesData?.total || 0}
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
