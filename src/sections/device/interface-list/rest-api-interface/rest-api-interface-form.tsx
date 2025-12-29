"use client";

import { FormSection } from "@/components/forms/form-section";
import { useDeviceFormContext } from "@/context/device-form-context";
import { InterfaceList } from "@/models";
import { RestApiInterface } from "@/models/product/rest-api-interface";
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
  const { useDeviceState } = useDeviceFormContext();

  const interfaceList = useDeviceState((d) => d?.interfaceList);
  const restApiInterface = isRestApiInterface(interfaceList)
    ? interfaceList.restApiInterface
    : undefined;

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
      {/* TODO: Add REST API Interface Description Form when implemented */}
      <RestApiFunctionalProfileListForm />
    </FormSection>
  );
}
