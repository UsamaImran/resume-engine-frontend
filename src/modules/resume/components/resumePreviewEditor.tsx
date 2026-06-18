import { useResumeStore } from "@/stores/resume.store";
import { ResumeForm } from "./resumeForm";
import { ResumePreview } from "./resumePreview";

export const ResumePreviewEditor = () => {
  const tailoredResume = useResumeStore((state) => state.tailoredResume);
  const setTailoredResume = useResumeStore((state) => state.setTailoredResume);

  if (!tailoredResume) {
    return <div>No resume data to preview.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Edit Your Resume
        </h2>
        <ResumeForm resume={tailoredResume} onUpdate={setTailoredResume} />
      </div>

      {/* Right: Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Preview
        </h2>
        <ResumePreview resume={tailoredResume} />
      </div>
    </div>
  );
};
