import { useGenerateCoverLetter } from "@/api/cover-letter/useGenerateCoverLetterPdf";
import { useGenerateResumePdf } from "@/api/resume/useGenerateResumePdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useResumeStore } from "@/stores/resume.store";
import {
  DocumentArrowDownIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

export const GenerateActions = () => {
  const { reset } = useResumeStore();
  const {
    mutate: generatePdf,
    isPending: pdfPending,
    error: pdfError,
  } = useGenerateResumePdf();
  const {
    mutate: generateCover,
    isPending: coverPending,
    error: coverError,
  } = useGenerateCoverLetter();

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Your resume is ready!
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Download your tailored resume or generate a cover letter.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={() => generatePdf()} isLoading={pdfPending}>
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            Download Resume PDF
          </Button>
          <Button
            variant="secondary"
            onClick={() => generateCover()}
            isLoading={coverPending}
          >
            <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
            Generate Cover Letter
          </Button>
        </div>
        {(pdfError || coverError) && (
          <p className="text-sm text-red-600 text-center">
            {pdfError?.message || coverError?.message}
          </p>
        )}
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" onClick={reset}>
            Start Over
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
