"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { InterfaceType, INTERFACE_TYPE_VALUES, InterfaceList } from "@/models/product/product";
import { createFormOptions } from "@/models/form-options-helper";

const INTERFACE_TYPE_OPTIONS = createFormOptions(INTERFACE_TYPE_VALUES);

/**
 * Helper function to determine which interface type is currently selected
 */
function getSelectedInterfaceType(
  interfaceList: InterfaceList | undefined
): InterfaceType | undefined {
  if (!interfaceList) return undefined;

  // Find the first interface type that exists in the interfaceList
  return INTERFACE_TYPE_VALUES.find((type) => type in interfaceList);
}

export function InterfaceListForm() {
  const { useDeviceState, useValidation, interfaceListActions, pathPrefix } =
    useDeviceFormContext();

  const interfaceList = useDeviceState((d) => d?.interfaceList);
  const { getError } = useValidation();

  const selectedInterfaceType = getSelectedInterfaceType(interfaceList);
  const fieldPath = (field: string) => buildDeviceFieldPath(pathPrefix, `interfaceList.${field}`);

  return (
    <FormSection
      title="Interface List"
      description="Select and configure the communication interface for the device"
      required={true}
    >
      <FormGroup>
        <SelectField
          label="Interface Type"
          name="interfaceType"
          required={true}
          options={INTERFACE_TYPE_OPTIONS}
          value={selectedInterfaceType || ""}
          onChange={(value) => {
            if (value) {
              interfaceListActions.setInterfaceType(value as InterfaceType);
            }
          }}
          placeholder="Select interface type"
          error={getError(fieldPath("interfaceType"))}
        />
      </FormGroup>
    </FormSection>
  );
}
