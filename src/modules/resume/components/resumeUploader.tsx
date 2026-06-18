import { useDropzone } from "react-dropzone";
import { useUploadResume } from "@/api/resume/useUploadResume";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils/cn";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export const ResumeUploader = () => {
  const { mutate, isPending, error } = useUploadResume();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => files[0] && mutate(files[0]),
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  return (
    <div className="flex justify-center">
      <Card className="max-w-4xl">
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              " border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors",
              isDragActive
                ? "border-accent bg-accent/5"
                : "border-gray-300 dark:border-gray-600 hover:border-accent/50",
            )}
          >
            <input {...getInputProps()} />
            <CloudArrowUpIcon className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
            <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
              {isDragActive
                ? "Drop your resume here"
                : "Drag & drop your resume"}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              PDF or DOCX up to 10MB
            </p>
            <Button variant="secondary" size="sm" className="mt-4">
              Browse Files
            </Button>
            {isPending && <Spinner className="mx-auto mt-4" />}
            {error && (
              <p className="mt-4 text-sm text-red-600">{error.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
