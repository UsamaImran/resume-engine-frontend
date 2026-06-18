//@ts-nocheck
import { useForm } from "@tanstack/react-form";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SkillCategory } from "@/types/resume.types";

export const SkillsSection = ({ form }: any) => {
  return (
    <div>
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
                        onChange={(e) => catField.handleChange(e.target.value)}
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
                        <div key={itemIdx} className="flex items-center gap-3">
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
  );
};
