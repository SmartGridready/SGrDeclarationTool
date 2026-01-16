"use client";

import { FormSection } from "@/components/forms/form-section";
import { useDeviceField } from "@/hooks/use-store-field";
import { ContactInterfaceDescriptionForm } from "./interface-description/interface-description-form";
import { ContactFunctionalProfileListForm } from "./functional-profile-list/contact-functional-profile-list-form";

export function ContactInterfaceForm() {
  // Granular selector - only re-render when contactInterface existence changes
  const hasContactInterface = useDeviceField((d) => !!d?.interfaceList?.contactInterface);

  // Don't render if Contact interface is not selected
  if (!hasContactInterface) {
    return null;
  }

  return (
    <FormSection
      title="Contact Interface"
      description="Configure the Contact interface settings"
      required={true}
      nested={true}
    >
      <ContactInterfaceDescriptionForm />
      <ContactFunctionalProfileListForm />
    </FormSection>
  );
}
