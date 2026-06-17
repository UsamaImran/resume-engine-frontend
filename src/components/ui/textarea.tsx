import { type TextareaHTMLAttributes, type Ref } from "react";
import { cn } from "@/utils/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  ref?: Ref<HTMLTextAreaElement>;
}

export const Textarea = ({
  className,
  error,
  ref,
  ...props
}: TextareaProps) => {
  return (
    <div className="w-full">
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-md border px-3 py-2 text-sm shadow-sm outline-none transition resize-y",
          "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
