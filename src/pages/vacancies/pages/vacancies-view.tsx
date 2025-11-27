import React, { useState } from "react";
import { useGetVacancies } from "@/react-query/query/vacancies";
import { Modal, Button, message } from "antd";
import ApplyForm from "../components/apply-form";
import type { Vacancy } from "@/api/vacancies/index.types";
import type { ApplyFormInputs } from "../components/apply-form/index.types";

const VacanciesView: React.FC = () => {
  const { data: vacaciesData } = useGetVacancies();
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
    message.success("თქვენი რეზიუმე წარმატებით გაიგზავნა!");
    handleCancel();
  };

  return (
    <div className="p-2">
      {vacaciesData?.map((vacancy) => (
        <div key={vacancy.id} className="m-2 rounded bg-yellow-400 p-4">
          <h1 className="text-lg font-bold">{vacancy.title}</h1>
          <h2>{vacancy.description}</h2>
          <p>{vacancy.date}</p>
          <Button
            type="primary"
            onClick={() => handleApplyClick(vacancy)}
            style={{ backgroundColor: "#3A6FF8", borderColor: "#3A6FF8" }}
          >
            გადმოგვიგზავნე რეზიუმე
          </Button>
        </div>
      ))}
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
