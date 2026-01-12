"use client";

import { FormSection } from "@/components/forms/form-section";
import { useDeviceStore } from "@/sections/device/device-store";
import { useShallow } from "zustand/react/shallow";
import { InterfaceList } from "@/models";
import { RestApiInterface } from "@/models/product/rest-api-interface";
import { RestApiInterfaceDescriptionForm } from "./interface-description/interface-description-form";
import { RestApiFunctionalProfileListForm } from "./functional-profile-list/rest-api-functional-profile-list-form";

/**
 * Type guard to check if interface list is REST API interface
 */
function isRestApiInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { restApiInterface: RestApiInterface } {
  return interfaceList !== undefined && "restApiInterface" in interfaceList;
}

export function RestApiInterfaceForm() {
  const interfaceList = useDeviceStore(useShallow((state) => state.device?.interfaceList));
  const restApiInterface = isRestApiInterface(interfaceList) ? interfaceList.restApiInterface : undefined;

  // Don't render if REST API interface is not selected
  if (!restApiInterface) {
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
