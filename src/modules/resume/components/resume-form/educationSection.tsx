//@ts-nocheck
import { useForm } from "@tanstack/react-form";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { EducationItem } from "@/types/resume.types";

export const EducationSection = ({ form }: any) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Education</h3>
        <form.Field name="education" mode="array">
          {(field) => (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                field.pushValue({
                  institution: "",
                  degree: "",
                  fieldOfStudy: "",
                  startDate: "",
                  endDate: "",
                  gpa: undefined,
                  honors: [],
                  courses: [],
                } as EducationItem)
              }
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Education
            </Button>
          )}
        </form.Field>
      </div>

      <form.Field name="education" mode="array">
        {(field) => (
          <div className="space-y-6">
            {field.state.value.map((_, eduIdx) => (
              <div
                key={eduIdx}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-5"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-medium text-gray-500">
                    Education #{eduIdx + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => field.removeValue(eduIdx)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Institution */}
                  <form.Field name={`education[${eduIdx}].institution`}>
                    {(instField) => (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Institution *
                        </label>
                        <Input
                          placeholder="e.g. GIFT University"
                          value={instField.state.value}
                          onChange={(e) =>
                            instField.handleChange(e.target.value)
                          }
                        />
                      </div>
                    )}
                  </form.Field>

                  {/* Degree */}
                  <form.Field name={`education[${eduIdx}].degree`}>
                    {(degField) => (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Degree *
                        </label>
                        <Input
                          placeholder="e.g. BSc"
                          value={degField.state.value}
                          onChange={(e) =>
                            degField.handleChange(e.target.value)
                          }
                        />
                      </div>
                    )}
                  </form.Field>

                  {/* Field of Study */}
                  <form.Field name={`education[${eduIdx}].fieldOfStudy`}>
                    {(fieldField) => (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Field of Study *
                        </label>
                        <Input
                          placeholder="e.g. Software Engineering"
                          value={fieldField.state.value}
                          onChange={(e) =>
                            fieldField.handleChange(e.target.value)
                          }
                        />
                      </div>
                    )}
                  </form.Field>

                  {/* GPA */}
                  <form.Field name={`education[${eduIdx}].gpa`}>
                    {(gpaField) => (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          GPA (optional)
                        </label>
                        <Input
                          placeholder="e.g. 3.8"
                          value={gpaField.state.value || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            gpaField.handleChange(
                              val ? parseFloat(val) : undefined,
                            );
                          }}
                        />
                      </div>
                    )}
                  </form.Field>

                  {/* Start Date */}
                  <form.Field name={`education[${eduIdx}].startDate`}>
                    {(startField) => (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Start Date *
                        </label>
                        <Input
                          placeholder="e.g. Sep 2015"
                          value={startField.state.value}
                          onChange={(e) =>
                            startField.handleChange(e.target.value)
                          }
                        />
                      </div>
                    )}
                  </form.Field>

                  {/* End Date */}
                  <form.Field name={`education[${eduIdx}].endDate`}>
                    {(endField) => (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          End Date (optional)
                        </label>
                        <Input
                          placeholder="e.g. Jun 2019"
                          value={endField.state.value || ""}
                          onChange={(e) =>
                            endField.handleChange(e.target.value || undefined)
                          }
                        />
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Honors */}
                <form.Field name={`education[${eduIdx}].honors`} mode="array">
                  {(honorsField) => (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">
                        Honors (optional)
                      </label>
                      <div className="space-y-2">
                        {honorsField?.state?.value?.map((_, honorIdx) => (
                          <div
                            key={honorIdx}
                            className="flex items-center gap-3"
                          >
                            <form.Field
                              name={`education[${eduIdx}].honors[${honorIdx}]`}
                            >
                              {(honorNameField) => (
                                <Input
                                  placeholder="e.g. Cum Laude"
                                  value={honorNameField.state.value}
                                  onChange={(e) =>
                                    honorNameField.handleChange(e.target.value)
                                  }
                                  className="flex-1"
                                />
                              )}
                            </form.Field>
                            <Button
                              type="button"
                              variant="danger"
                              size="sm"
                              onClick={() => honorsField.removeValue(honorIdx)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => honorsField.pushValue("")}
                        >
                          <PlusIcon className="h-4 w-4 mr-1" />
                          Add Honor
                        </Button>
                      </div>
                    </div>
                  )}
                </form.Field>

                {/* Courses */}
                <form.Field name={`education[${eduIdx}].courses`} mode="array">
                  {(coursesField) => (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">
                        Relevant Courses (optional)
                      </label>
                      <div className="space-y-2">
                        {coursesField?.state?.value?.map((_, courseIdx) => (
                          <div
                            key={courseIdx}
                            className="flex items-center gap-3"
                          >
                            <form.Field
                              name={`education[${eduIdx}].courses[${courseIdx}]`}
                            >
                              {(courseNameField) => (
                                <Input
                                  placeholder="e.g. Data Structures"
                                  value={courseNameField.state.value}
                                  onChange={(e) =>
                                    courseNameField.handleChange(e.target.value)
                                  }
                                  className="flex-1"
                                />
                              )}
                            </form.Field>
                            <Button
                              type="button"
                              variant="danger"
                              size="sm"
                              onClick={() =>
                                coursesField.removeValue(courseIdx)
                              }
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => coursesField.pushValue("")}
                        >
                          <PlusIcon className="h-4 w-4 mr-1" />
                          Add Course
                        </Button>
                      </div>
                    </div>
                  )}
                </form.Field>
              </div>
            ))}

            {field.state.value.length === 0 && (
              <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-xl">
                <p className="text-sm">No education entries added yet.</p>
                <p className="text-xs mt-1">
                  Click "Add Education" to get started.
                </p>
              </div>
            )}
          </div>
        )}
      </form.Field>
    </div>
  );
};
