//@ts-nocheck
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const ExperienceSection = ({ form }: { form: any }) => {
  return (
    <form.Field name="experience" mode="array">
      {(field) => (
        <div className="space-y-6">
          {field.state.value.map((_, idx) => (
            <div
              key={idx}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-4"
            >
              <div className="flex justify-between">
                <h4 className="font-semibold">Experience #{idx + 1}</h4>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => field.removeValue(idx)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field name={`experience[${idx}].title`}>
                  {(f) => (
                    <Input
                      placeholder="Job Title"
                      value={f.state.value}
                      onChange={(e) => f.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>
                <form.Field name={`experience[${idx}].company`}>
                  {(f) => (
                    <Input
                      placeholder="Company Name"
                      value={f.state.value}
                      onChange={(e) => f.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>
                <form.Field name={`experience[${idx}].location`}>
                  {(f) => (
                    <Input
                      placeholder="Location"
                      value={f.state.value}
                      onChange={(e) => f.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>
                <form.Field name={`experience[${idx}].date`}>
                  {(f) => (
                    <Input
                      placeholder="e.g. Jan 2023 - Present"
                      value={f.state.value}
                      onChange={(e) => f.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>
              </div>

              <form.Field name={`experience[${idx}].bullets`} mode="array">
                {(bulletsField) => (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bullet Points
                    </label>
                    {bulletsField.state.value.map((_, bIdx) => (
                      <div key={bIdx} className="flex gap-2 mb-3">
                        <Textarea
                          rows={2}
                          placeholder="• Key achievement or responsibility..."
                          value={bulletsField.state.value[bIdx] || ""}
                          onChange={(e) =>
                            bulletsField.handleChange((prev: string[]) => {
                              const next = [...prev];
                              next[bIdx] = e.target.value;
                              return next;
                            })
                          }
                        />
                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          className="mt-1"
                          onClick={() => bulletsField.removeValue(bIdx)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => bulletsField.pushValue("")}
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Bullet Point
                    </Button>
                  </div>
                )}
              </form.Field>
            </div>
          ))}

          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              field.pushValue({
                title: "",
                company: "",
                location: "",
                date: "",
                bullets: [""],
              })
            }
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add New Experience
          </Button>
        </div>
      )}
    </form.Field>
  );
};
