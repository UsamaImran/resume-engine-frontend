import { useResumeStore } from "@/stores/resume.store";
import type {
  TailorResumeRequest,
  TailorResumeResponse,
} from "@/types/resume.types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resumeClient } from "./client";

export const useTailorResume = () => {
  const { resumeData, setTailoredResume, setStep } = useResumeStore();

  return useMutation({
    mutationFn: async (jobDescription: string) => {
      if (!resumeData) throw new Error("No resume data to tailor");
      const payload: TailorResumeRequest = {
        resume: resumeData,
        jobDescription,
        // preferences: { tone: 'professional' } // optional
      };
      return await resumeClient.post<TailorResumeResponse>(
        "/tailor",
        payload as any,
      );
    },
    onSuccess: (tailored) => {
      console.log(tailored, "Tailored Resume Response");
      setTailoredResume(tailored.data);
      setStep("preview");
      toast.success("Resume tailored!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || error.message || "Tailoring failed";
      toast.error(message);
    },
  });
};
