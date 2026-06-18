import { formOptions, useForm } from "@tanstack/react-form";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeData, SkillCategory } from "@/types/resume.types";
import { useEffect } from "react";

const resumeFormOptions = formOptions({
  defaultValues: {
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    github: "",
    npm: "",
    location: "",
    targetCompany: "",
    targetJobTitle: "",
    targeting: "",
    headline: "",
    summary: "",
    skills: [],
    experience: [],
    education: "",
    npmPackages: [],
  },
});

interface ResumeFormProps {
  resume: ResumeData;
  onUpdate: (updated: ResumeData) => void;
}

export const ResumeForm = ({ resume, onUpdate }: ResumeFormProps) => {
  const form = useForm({
    ...resumeFormOptions,
    defaultValues: {
      ...resume,
    },
    onSubmit: ({ value }) => {
      onUpdate(value);
    },
  });

  useEffect(() => {
    const subscription = form.store.subscribe(() => {
      const values = form.store.state.values;
      onUpdate(values);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [form, onUpdate]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {/* === Basic Info === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field name="name">
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name *
              </label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email *
              </label>
              <Input
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
      </div>

      {/* Add other simple fields similarly (phone, linkedin, portfolio, github, npm, location, targetCompany, targetJobTitle, targeting, headline) */}

      <form.Field name="summary">
        {(field) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Summary
            </label>
            <Textarea
              rows={4}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {/* ====================== SKILLS ====================== */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Skills</h3>
          <form.Field name="skills" mode="array">
            {(field) => (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() =>
                  field.pushValue({ category: "", items: [] } as SkillCategory)
                }
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Category
              </Button>
            )}
          </form.Field>
        </div>

        <form.Field name="skills" mode="array">
          {(field) => (
            <div className="space-y-6">
              {field.state.value.map((_, skillIdx) => (
                <div
                  key={skillIdx}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-5"
                >
                  <div className="flex gap-3 mb-4">
                    <form.Field name={`skills[${skillIdx}].category`}>
                      {(catField) => (
                        <Input
                          placeholder="Category (e.g. Frontend, Backend...)"
                          value={catField.state.value}
                          onChange={(e) =>
                            catField.handleChange(e.target.value)
                          }
                          className="flex-1"
                        />
                      )}
                    </form.Field>

                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => field.removeValue(skillIdx)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <form.Field name={`skills[${skillIdx}].items`} mode="array">
                    {(itemsField) => (
                      <div className="space-y-3 ml-4">
                        {itemsField.state.value.map((_, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="flex items-center gap-3"
                          >
                            <form.Field
                              name={`skills[${skillIdx}].items[${itemIdx}].name`}
                            >
                              {(nameField) => (
                                <Input
                                  placeholder="Skill name"
                                  value={nameField.state.value}
                                  onChange={(e) =>
                                    nameField.handleChange(e.target.value)
                                  }
                                  className="flex-1"
                                />
                              )}
                            </form.Field>

                            <form.Field
                              name={`skills[${skillIdx}].items[${itemIdx}].highlight`}
                            >
                              {(hlField) => (
                                <label className="flex items-center gap-1.5 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={hlField.state.value}
                                    onChange={(e) =>
                                      hlField.handleChange(e.target.checked)
                                    }
                                  />
                                  Highlight
                                </label>
                              )}
                            </form.Field>

                            <Button
                              type="button"
                              variant="danger"
                              size="sm"
                              onClick={() => itemsField.removeValue(itemIdx)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            itemsField.pushValue({ name: "", highlight: false })
                          }
                        >
                          <PlusIcon className="h-4 w-4 mr-1" />
                          Add Skill
                        </Button>
                      </div>
                    )}
                  </form.Field>
                </div>
              ))}
            </div>
          )}
        </form.Field>
      </div>

      {/* ====================== EXPERIENCE ====================== */}
      {/* Similar structure as Skills - you can copy/adapt the pattern above */}

      {/* Education */}
      <form.Field name="education">
        {(field) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Education
            </label>
            <Textarea
              rows={3}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {/* npm Packages */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">npm Packages</h3>
          <form.Field name="npmPackages" mode="array">
            {(field) => (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => field.pushValue("")}
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Package
              </Button>
            )}
          </form.Field>
        </div>

        <form.Field name="npmPackages" mode="array">
          {(field) => (
            <div className="space-y-2">
              {field?.state?.value?.map((_, idx) => (
                <div key={idx} className="flex gap-2">
                  <form.Field name={`npmPackages[${idx}]`}>
                    {(pkgField) => (
                      <Input
                        placeholder="e.g. @tanstack/react-form"
                        value={pkgField.state.value}
                        onChange={(e) => pkgField.handleChange(e.target.value)}
                        className="flex-1"
                      />
                    )}
                  </form.Field>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => field.removeValue(idx)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </form.Field>
      </div>

      <Button type="submit" variant="primary" className="w-full md:w-auto">
        Update Preview
      </Button>
    </form>
  );
};
