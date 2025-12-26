"use client";

import { ModbusAttributesForm as SharedModbusAttributesForm } from "@/sections/shared/modbus-attributes/modbus-attributes-form";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { DeviceStoreState } from "@/sections/device/device-store";

/**
 * Device specific modbus attributes form.
 * Uses the DeviceFormContext to connect to the store.
 */
export function ModbusAttributesForm() {
  const { useDeviceState, useValidation, modbusAttributesActions, pathPrefix } =
    useDeviceFormContext();

  // Create a store hook adapter
  const useStore = <TSelected,>(selector: (store: DeviceStoreState) => TSelected): TSelected => {
    const device = useDeviceState((d) => d);
    const adaptedStore = {
      device,
      ...modbusAttributesActions,
    } as DeviceStoreState;
    return selector(adaptedStore);
  };

  const fullPathPrefix = pathPrefix
    ? buildDeviceFieldPath(pathPrefix, "interfaceList.modbusInterface.modbusAttributes")
    : "interfaceList.modbusInterface.modbusAttributes";

  return (
    <SharedModbusAttributesForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        modbusAttributes: store.device?.interfaceList?.modbusInterface?.modbusAttributes,
      })}
      isAddedSelector={(store) => !!store.device?.interfaceList?.modbusInterface?.modbusAttributes}
      fieldPathPrefix={fullPathPrefix}
      required={false}
      title="Modbus Attributes"
      description="Configure Modbus-specific attributes"
      nested={true}
    />
  );
}
