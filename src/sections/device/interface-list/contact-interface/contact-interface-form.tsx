"use client";

import { FormSection } from "@/components/forms/form-section";
import { useDeviceStore } from "@/sections/device/device-store";
import { useShallow } from "zustand/react/shallow";
import { InterfaceList } from "@/models";
import { ContactInterface } from "@/models/product/contact-interface";
import { ContactInterfaceDescriptionForm } from "./interface-description/interface-description-form";
import { ContactFunctionalProfileListForm } from "./functional-profile-list/contact-functional-profile-list-form";

/**
 * Type guard to check if interface list is Contact interface
 */
function isContactInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { contactInterface: ContactInterface } {
  return interfaceList !== undefined && "contactInterface" in interfaceList;
}

export function ContactInterfaceForm() {
  const interfaceList = useDeviceStore(useShallow((state) => state.device?.interfaceList));
  const contactInterface = isContactInterface(interfaceList) ? interfaceList.contactInterface : undefined;

  // Don't render if Contact interface is not selected
  if (!contactInterface) {
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
