import { downloadResume } from "@/api/applications";
import { useMutation } from "@tanstack/react-query";

export const useDownloadResume = () => {
  return useMutation({
    mutationFn: ({ id, filename }: { id: number; filename: string }) =>
      downloadResume(id, filename),
  });
};