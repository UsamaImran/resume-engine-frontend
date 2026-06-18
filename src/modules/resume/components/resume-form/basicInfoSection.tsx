//@ts-nocheck
import { Input } from "@/components/ui/input";
import type { ResumeData } from "@/types/resume.types";

const fields = [
  { name: "name", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "location", label: "Location" },
  { name: "linkedin", label: "LinkedIn URL" },
  { name: "github", label: "GitHub URL" },
  { name: "portfolio", label: "Portfolio URL" },
  { name: "npm", label: "npm Profile URL" },
];

export const BasicInfoSection = ({ form }: { form: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((field) => (
        <form.Field key={field.name} name={field.name as keyof ResumeData}>
          {(f) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {field.label} {field.required && "*"}
              </label>
              <Input
                type={field.type}
                value={f.state.value || ""}
                onChange={(e) => f.handleChange(e.target.value)}
                placeholder={field.label}
              />
            </div>
          )}
        </form.Field>
      ))}
    </div>
  );
};
