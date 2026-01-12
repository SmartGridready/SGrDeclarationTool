"use client";

import { FormSection } from "@/components/forms/form-section";
import { useDeviceStore } from "@/sections/device/device-store";
import { useShallow } from "zustand/react/shallow";
import { InterfaceList } from "@/models";
import { GenericInterface } from "@/models/product/generic-interface";
import { GenericFunctionalProfileListForm } from "./functional-profile-list/generic-functional-profile-list-form";

/**
 * Type guard to check if interface list is Generic interface
 */
function isGenericInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { genericInterface: GenericInterface } {
  return interfaceList !== undefined && "genericInterface" in interfaceList;
}

export function GenericInterfaceForm() {
  const interfaceList = useDeviceStore(useShallow((state) => state.device?.interfaceList));
  const genericInterface = isGenericInterface(interfaceList) ? interfaceList.genericInterface : undefined;

  // Don't render if Generic interface is not selected
  if (!genericInterface) {
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
