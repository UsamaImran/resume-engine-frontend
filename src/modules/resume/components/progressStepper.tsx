import type { Step } from "@/types";
import { cn } from "@/utils/cn";

interface ProgressStepperProps {
  currentStep: Step;
}

const steps: Step[] = ["upload", "tailor", "preview", "generate"];
const stepLabels: Record<Step, string> = {
  upload: "Upload",
  tailor: "Tailor",
  preview: "Preview",
  generate: "Generate",
};

export const ProgressStepper = ({ currentStep }: ProgressStepperProps) => {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-8 px-4">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors",
              index < currentIndex && "bg-accent text-white",
              index === currentIndex &&
                "bg-accent/20 text-accent border-2 border-accent",
              index > currentIndex &&
                "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400",
            )}
          >
            {index + 1}
          </div>
          <span
            className={cn(
              "ml-2 text-sm font-medium hidden sm:block",
              index === currentIndex
                ? "text-accent"
                : "text-gray-500 dark:text-gray-400",
            )}
          >
            {stepLabels[step]}
          </span>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-12 h-0.5 mx-2 transition-colors",
                index < currentIndex
                  ? "bg-accent"
                  : "bg-gray-200 dark:bg-gray-700",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};
