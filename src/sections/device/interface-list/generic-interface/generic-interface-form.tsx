"use client";

import { FormSection } from "@/components/forms/form-section";
import { useDeviceField } from "@/hooks/use-store-field";
import { GenericFunctionalProfileListForm } from "./functional-profile-list/generic-functional-profile-list-form";

export function GenericInterfaceForm() {
  // Granular selector - only re-render when genericInterface existence changes
  const hasGenericInterface = useDeviceField((d) => !!d?.interfaceList?.genericInterface);

  // Don't render if Generic interface is not selected
  if (!hasGenericInterface) {
    return null;
  }

  return (
    <FormSection
      title="Generic Interface"
      description="Configure the Generic interface settings"
      required={true}
      nested={true}
    >
      <GenericFunctionalProfileListForm />
    </FormSection>
  );
}
