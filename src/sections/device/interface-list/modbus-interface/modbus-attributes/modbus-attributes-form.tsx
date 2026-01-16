"use client";

import { ModbusAttributesForm as SharedModbusAttributesForm } from "@/sections/shared/modbus-attributes/modbus-attributes-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";
import { useHasDevice, useDeviceField } from "@/hooks/use-store-field";

/**
 * Device specific modbus attributes form.
 * Uses the device store directly.
 */
export function ModbusAttributesForm() {
  const hasDevice = useHasDevice();
  // Subscribe only to modbusAttributes for targeted re-renders
  const modbusAttributes = useDeviceField((d) => d?.interfaceList?.modbusInterface?.modbusAttributes);
  const store = useDeviceStore.getState();
  const useStore = createDeviceStoreAdapter(store.device, store);
  const useValidation = useDeviceValidation;

  void modbusAttributes;

  if (!hasDevice) {
    return null;
  }

  const fieldPathPrefix = "interfaceList.modbusInterface.modbusAttributes";

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
