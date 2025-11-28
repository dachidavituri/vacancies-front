import { httpVacanciesClient } from "..";
import type { ApplyFormInputs } from "./index.types";

export const submitApplication = async (data: ApplyFormInputs & { vacancyId: number }) => {
  if (!data.resume || data.resume.length === 0) {
    throw new Error("Please provide a resume file");
  }

  const file = data.resume[0].originFileObj; 

  if (!file) {
  throw new Error("No resume file provided");
}

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("vacancyId", data.vacancyId.toString());
  formData.append("resume", file);

  try {
    const response = await httpVacanciesClient.post("/apply", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error submitting application", error);
    throw error;
  }
};
