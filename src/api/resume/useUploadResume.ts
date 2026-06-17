import { useResumeStore } from "@/stores/resume.store";
import type { ParseResumeResponse } from "@/types/resume.types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resumeClient } from "./client";

export const useUploadResume = () => {
  const { setResumeData, setStep } = useResumeStore();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("resume", file);
      const response = await resumeClient.post<ParseResumeResponse>(
        "/parse",
        formData,
        undefined,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      // response is { resume: ResumeData }
      return response;
    },
    onSuccess: (resume) => {
      console.log(resume, "SSSS");
      setResumeData(resume.data.resume);
      setStep("tailor");
      toast.success("Resume parsed!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || error.message || "Upload failed";
      toast.error(message);
    },
  });
};
