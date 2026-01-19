"use client";

import { FormSection } from "@/components/forms/form-section";
import { useDeviceField } from "@/hooks/use-store-field";
import { MessagingInterfaceDescriptionForm } from "./interface-description/interface-description-form";
import { MessagingFunctionalProfileListForm } from "./functional-profile-list/messaging-functional-profile-list-form";

export function MessagingInterfaceForm() {
  // Granular selector - only re-render when messagingInterface existence changes
  const hasMessagingInterface = useDeviceField((d) => !!d?.interfaceList?.messagingInterface);

  // Don't render if Messaging interface is not selected
  if (!hasMessagingInterface) {
    return null;
  }

  return (
    <FormSection
      title="Messaging Interface"
      description="Configure the Messaging interface settings"
      required={true}
      nested={true}
    >
      <MessagingInterfaceDescriptionForm />
      <MessagingFunctionalProfileListForm />
    </FormSection>
  );
}
