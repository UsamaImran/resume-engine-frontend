import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useResumeStore } from "@/stores/resume.store";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export const ResumePreviewEditor = () => {
  const { tailoredResume, setStep } = useResumeStore();
  if (!tailoredResume) return null;

  // For demo, we display a summary – you can make fields editable via TanStack Form
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Preview & Edit
          </h3>
          <Button variant="outline" size="sm">
            <PencilSquareIcon className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            <strong>Name:</strong> {tailoredResume.name}
          </p>
          <p>
            <strong>Summary:</strong> {tailoredResume.summary}
          </p>
          <p>
            <strong>Skills:</strong>{" "}
            {tailoredResume.skills
              .map((s) => s.items.map((i) => i.name).join(", "))
              .join("; ")}
          </p>
          {/* add more fields */}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setStep("tailor")}>
            Back
          </Button>
          <Button onClick={() => setStep("generate")}>
            Continue to Generate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
