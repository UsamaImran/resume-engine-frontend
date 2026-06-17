import { create } from "zustand";

import type { CoverData, ResumeData } from "@/types/resume.types";
import type { Step } from "@/types";

interface ResumeStore {
  step: Step;
  resumeData: ResumeData | null;
  tailoredResume: ResumeData | null;
  coverLetterData: CoverData | null;
  jobDescription: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  setStep: (step: Step) => void;
  setResumeData: (data: ResumeData) => void;
  setTailoredResume: (data: ResumeData) => void;
  setCoverLetterData: (data: CoverData) => void;
  setJobDescription: (jd: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  step: "upload",
  resumeData: null,
  tailoredResume: null,
  coverLetterData: null,
  jobDescription: "",
  isLoading: false,
  error: null,

  setStep: (step) => set({ step }),
  setResumeData: (data) => set({ resumeData: data }),
  setTailoredResume: (data) => set({ tailoredResume: data }),
  setCoverLetterData: (data) => set({ coverLetterData: data }),
  setJobDescription: (jd) => set({ jobDescription: jd }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      step: "upload",
      resumeData: null,
      tailoredResume: null,
      coverLetterData: null,
      jobDescription: "",
      isLoading: false,
      error: null,
    }),
}));
