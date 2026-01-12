"use client";

import { ModbusAttributesForm as SharedModbusAttributesForm } from "@/sections/shared/modbus-attributes/modbus-attributes-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";
import { useShallow } from "zustand/react/shallow";

/**
 * Device specific modbus attributes form.
 * Uses the device store directly.
 */
export function ModbusAttributesForm() {
  const device = useDeviceStore(useShallow((state) => state.device));
  const store = useDeviceStore.getState();
  const useStore = createDeviceStoreAdapter(device, store);
  const useValidation = useDeviceValidation;

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
