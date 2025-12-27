"use client";

import { ModbusAttributesForm as SharedModbusAttributesForm } from "@/sections/shared/modbus-attributes/modbus-attributes-form";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";

/**
 * Device specific modbus attributes form.
 * Uses the DeviceFormContext to connect to the store.
 */
export function ModbusAttributesForm() {
  const { useDeviceState, useValidation, modbusAttributesActions, pathPrefix } =
    useDeviceFormContext();

  const device = useDeviceState((d) => d);
  const useStore = createDeviceStoreAdapter(device, modbusAttributesActions);

  const fieldPathPrefix = buildDeviceFieldPath(
    pathPrefix,
    "interfaceList.modbusInterface.modbusAttributes"
  );

  return (
    <SharedModbusAttributesForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        modbusAttributes: store.device?.interfaceList?.modbusInterface?.modbusAttributes,
      })}
      isAddedSelector={(store) => !!store.device?.interfaceList?.modbusInterface?.modbusAttributes}
      fieldPathPrefix={fieldPathPrefix}
      required={false}
      title="Modbus Attributes"
      description="Configure Modbus-specific attributes"
      nested={true}
    />
  );
}
