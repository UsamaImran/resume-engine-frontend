//@ts-nocheck
import { Textarea } from "@/components/ui/textarea";

export const EducationSection = ({ form }: { form: any }) => {
  return (
    <form.Field name="education">
      {(field) => (
        <div>
          <label className="block text-sm font-medium mb-2">
            Education Details
          </label>
          <Textarea
            rows={6}
            placeholder="Degree, University, Year, GPA, Achievements..."
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        </div>
      )}
    </form.Field>
  );
};
