import { useResumeStore } from "@/stores/resume.store";
import type {
  GenerateCoverLetterRequest,
  GenerateCoverLetterResponse,
  GenerateCoverPdfRequest,
} from "@/types/resume.types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { coverLetterClient } from "./client";

export const useGenerateCoverLetter = () => {
  const { tailoredResume, jobDescription, setCoverLetterData } =
    useResumeStore();

  return useMutation({
    mutationFn: async () => {
      if (!tailoredResume) throw new Error("No tailored resume");
      // Step 1: generate cover letter data
      const generatePayload: GenerateCoverLetterRequest = {
        resume: tailoredResume,
        jobDescription,
        // preferences: { tone: 'professional', length: 'medium' }
      };
      const response =
        await coverLetterClient.post<GenerateCoverLetterResponse>(
          "/generate",
          generatePayload as any,
        );
      const coverData = response.coverLetter;
      setCoverLetterData(coverData);
      // Step 2: generate PDF
      const pdfPayload: GenerateCoverPdfRequest = {
        coverLetter: coverData,
        // template: 'modern'
      };
      return coverLetterClient.post<Blob>(
        "/generate-pdf",
        pdfPayload as any,
        undefined,
        {
          responseType: "blob",
        },
      );
    },
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cover-letter.pdf";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Cover letter downloaded!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Cover letter generation failed";
      toast.error(message);
    },
  });
};
