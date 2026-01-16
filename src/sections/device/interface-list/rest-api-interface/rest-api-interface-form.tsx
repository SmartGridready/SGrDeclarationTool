"use client";

import { FormSection } from "@/components/forms/form-section";
import { useDeviceField } from "@/hooks/use-store-field";
import { RestApiInterfaceDescriptionForm } from "./interface-description/interface-description-form";
import { RestApiFunctionalProfileListForm } from "./functional-profile-list/rest-api-functional-profile-list-form";

export function RestApiInterfaceForm() {
  // Granular selector - only re-render when restApiInterface existence changes
  const hasRestApiInterface = useDeviceField((d) => !!d?.interfaceList?.restApiInterface);

  // Don't render if REST API interface is not selected
  if (!hasRestApiInterface) {
    return null;
  }

  return (
    <FormSection
      title="REST API Interface"
      description="Configure the REST API interface settings"
      required={true}
      nested={true}
    >
      <RestApiInterfaceDescriptionForm />
      <RestApiFunctionalProfileListForm />
    </FormSection>
  );
}
