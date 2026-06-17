import { useResumeStore } from "@/stores/resume.store";
import type { GenerateResumePdfRequest } from "@/types/resume.types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resumeClient } from "./client";

export const useGenerateResumePdf = () => {
  const { tailoredResume } = useResumeStore();

  return useMutation({
    mutationFn: async () => {
      if (!tailoredResume) throw new Error("No tailored resume");
      const payload: GenerateResumePdfRequest = {
        resume: tailoredResume,
        // template: 'modern',
        // outputType: 'resume'
      };
      return resumeClient.post<Blob>("/generate", payload as any, undefined, {
        responseType: "blob",
      });
    },
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tailored-resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "PDF generation failed";
      toast.error(message);
    },
  });
};
