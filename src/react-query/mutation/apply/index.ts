import { useMutation } from "@tanstack/react-query";
import { submitApplication } from "@/api/apply";

export const useSubmitApplication = () => {
  return useMutation({
    mutationFn: submitApplication,
    onSuccess: (data) => {
      console.log("Application submitted successfully", data);
    },
    onError: (error: any) => {
      console.error(
        "Error submitting application:",
        error.response?.data || error.message,
      );
    },
  });
};
