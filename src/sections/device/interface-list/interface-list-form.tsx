"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { InterfaceType, INTERFACE_TYPE_VALUES, InterfaceList } from "@/models/product/product";
import { createFormOptions } from "@/models/form-options-helper";
import { ModbusInterfaceForm } from "./modbus-interface/modbus-interface-form";
import { RestApiInterfaceForm } from "./rest-api-interface/rest-api-interface-form";
import { MessagingInterfaceForm } from "./messaging-interface/messaging-interface-form";
import { ContactInterfaceForm } from "./contact-interface/contact-interface-form";
import { GenericInterfaceForm } from "./generic-interface/generic-interface-form";

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

      {/* Conditionally render interface-specific forms */}
      {selectedInterfaceType === "modbusInterface" && <ModbusInterfaceForm />}
      {selectedInterfaceType === "restApiInterface" && <RestApiInterfaceForm />}
      {selectedInterfaceType === "messagingInterface" && <MessagingInterfaceForm />}
      {selectedInterfaceType === "contactInterface" && <ContactInterfaceForm />}
      {selectedInterfaceType === "genericInterface" && <GenericInterfaceForm />}
    </FormSection>
  );
}
