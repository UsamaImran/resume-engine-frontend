import { formOptions, useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

import type { ResumeData } from "@/types/resume.types";
import { CollapsibleSection } from "@/components/ui/collapsableSection";
import { BasicInfoSection } from "./basicInfoSection";
import { EducationSection } from "./educationSection";
import { ExperienceSection } from "./experienceSection";
import { SkillsSection } from "./skillsSection";
import { SummarySection } from "./summarySection";
import { NpmPackagesSection } from "./npmSection";

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
    education: [],
    npmPackages: [],
  } as ResumeData,
});

interface ResumeFormProps {
  resume: ResumeData;
  onUpdate: (updated: ResumeData) => void;
}

export const ResumeForm = ({ resume, onUpdate }: ResumeFormProps) => {
  const form = useForm({
    ...resumeFormOptions,
    defaultValues: resume,
    onSubmit: ({ value }) => onUpdate(value),
  });

  useEffect(() => {
    const subscription = form.store.subscribe(() => {
      onUpdate(form.store.state.values as ResumeData);
    });

    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      <CollapsibleSection title="Basic Information" defaultOpen>
        <BasicInfoSection form={form} />
      </CollapsibleSection>

      <CollapsibleSection title="Professional Summary & Targeting" defaultOpen>
        <SummarySection form={form} />
      </CollapsibleSection>

      <CollapsibleSection title="Skills" defaultOpen>
        <SkillsSection form={form} />
      </CollapsibleSection>

      <CollapsibleSection title="Experience" defaultOpen>
        <ExperienceSection form={form} />
      </CollapsibleSection>

      <CollapsibleSection title="Education">
        <EducationSection form={form} />
      </CollapsibleSection>
      {!!form.getFieldValue("npmPackages")?.length && (
        <CollapsibleSection title="npm Packages">
          <NpmPackagesSection form={form} />
        </CollapsibleSection>
      )}

      <Button type="submit" variant="primary" className="w-full text-lg">
        Generate PDF
      </Button>
    </form>
  );
};
