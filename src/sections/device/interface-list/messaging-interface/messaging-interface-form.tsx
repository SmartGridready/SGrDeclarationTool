"use client";

import { FormSection } from "@/components/forms/form-section";
import { useDeviceFormContext } from "@/context/device-form-context";
import { InterfaceList } from "@/models";
import { MessagingInterface } from "@/models/product/messaging-interface";
import { MessagingFunctionalProfileListForm } from "./functional-profile-list/messaging-functional-profile-list-form";

/**
 * Type guard to check if interface list is Messaging interface
 */
function isMessagingInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { messagingInterface: MessagingInterface } {
  return interfaceList !== undefined && "messagingInterface" in interfaceList;
}

export function MessagingInterfaceForm() {
  const { useDeviceState } = useDeviceFormContext();

  const interfaceList = useDeviceState((d) => d?.interfaceList);
  const messagingInterface = isMessagingInterface(interfaceList)
    ? interfaceList.messagingInterface
    : undefined;

  // Don't render if Messaging interface is not selected
  if (!messagingInterface) {
    return null;
  }

  return (
    <FormSection
      title="Messaging Interface"
      description="Configure the Messaging interface settings"
      required={true}
      nested={true}
    >
      {/* TODO: Add MessagingInterfaceDescriptionForm when implemented */}
      <MessagingFunctionalProfileListForm />
    </FormSection>
  );
}
