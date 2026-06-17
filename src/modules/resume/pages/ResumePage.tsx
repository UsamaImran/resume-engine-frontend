import { useResumeStore } from "@/stores/resume.store";
import { GenerateActions } from "../components/generateActions";
import { JobDescriptionForm } from "../components/jobDescriptionForm";
import { ProgressStepper } from "../components/progressStepper";
import { ResumePreviewEditor } from "../components/resumePreviewEditor";
import { ResumeUploader } from "../components/resumeUploader";

export const ResumePage = () => {
  const step = useResumeStore((state) => state.step);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Resume Engine
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Tailor your resume to any job in seconds
          </p>
        </header>

        <ProgressStepper currentStep={step} />

        <div className="mt-6 transition-all duration-300">
          {step === "upload" && <ResumeUploader />}
          {step === "tailor" && <JobDescriptionForm />}
          {step === "preview" && <ResumePreviewEditor />}
          {step === "generate" && <GenerateActions />}
        </div>
      </div>
    </div>
  );
};
