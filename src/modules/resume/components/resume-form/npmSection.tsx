//@ts-nocheck
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const NpmPackagesSection = ({ form }: { form: any }) => {
  return (
    <form.Field name="npmPackages" mode="array">
      {(field) => (
        <div className="space-y-3">
          {field.state.value?.map((_, idx) => (
            <div key={idx} className="flex gap-2">
              <form.Field name={`npmPackages[${idx}]`}>
                {(pkgField) => (
                  <Input
                    placeholder="e.g. @tanstack/react-query"
                    value={pkgField.state.value}
                    onChange={(e) => pkgField.handleChange(e.target.value)}
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

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => field.pushValue("")}
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add npm Package
          </Button>
        </div>
      )}
    </form.Field>
  );
};
