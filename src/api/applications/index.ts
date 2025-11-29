import { httpVacanciesClient } from "..";
import type {
  GetApplicationsParams,
  GetApplicationsResponse,
} from "./index.types";

export const getApplications = async (
  params?: GetApplicationsParams,
): Promise<GetApplicationsResponse> => {
  try {
    const response = await httpVacanciesClient.get<GetApplicationsResponse>(
      "/applications",
      {
        params: {
          vacancyId: params?.vacancyId,
          date: params?.date,
          sortBy: params?.sortBy || "date",
          order: params?.order || "ASC",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(`Error while fetching applications`, error);
    throw error;
  }
};


export const downloadResume = async (applicationId: number, fileName: string) => {
  try {
    const response = await httpVacanciesClient.get<Blob>(
      `/applications/download/${applicationId}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("Error downloading resume:", err);
    throw err;
  }
};