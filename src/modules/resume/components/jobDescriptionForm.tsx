import { useState } from "react";

import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/stores/resume.store";
import { useTailorResume } from "@/api/resume/useTailorResume";

export const JobDescriptionForm = () => {
  const { jobDescription, setJobDescription } = useResumeStore();
  const { mutate, isPending, error } = useTailorResume();
  const [jd, setJd] = useState(jobDescription || "");

  const handleTailor = () => {
    setJobDescription(jd);
    mutate(jd);
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="h-6 w-6 text-accent" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Paste Job Description
          </h3>
        </div>
        <Textarea
          rows={8}
          placeholder="Paste the full job description here..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          className="resize-y"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleTailor}
            isLoading={isPending}
            disabled={!jd.trim()}
          >
            {isPending ? "Tailoring..." : "Tailor Resume"}
          </Button>
        </div>
        {error && <p className="text-sm text-red-600">{error.message}</p>}
      </CardContent>
    </Card>
  );
};
