//@ts-nocheck
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const SummarySection = ({ form }: { form: any }) => {
  return (
    <div className="space-y-5">
      <form.Field name="targetCompany">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">
              Target Company
            </label>
            <Input
              placeholder="e.g. Google, Microsoft"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="targetJobTitle">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">
              Target Job Title
            </label>
            <Input
              placeholder="e.g. Senior Frontend Engineer"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="headline">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">Headline</label>
            <Input
              placeholder="e.g. Full Stack Engineer | React & Node.js Specialist"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="summary">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">
              Professional Summary
            </label>
            <Textarea
              rows={5}
              placeholder="Write a compelling professional summary..."
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>
    </div>
  );
};
