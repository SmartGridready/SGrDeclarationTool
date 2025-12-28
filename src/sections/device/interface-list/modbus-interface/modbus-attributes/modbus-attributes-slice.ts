import { DeviceFrame } from "@/models";
import {
  createModbusAttributesSlice as createSharedModbusAttributesSlice,
  ModbusAttributesSlice as SharedModbusAttributesSlice,
} from "@/sections/shared/modbus-attributes/modbus-attributes-slice";

// Re-export the shared interface for use in device-specific code
export type ModbusAttributesSlice = SharedModbusAttributesSlice;

/**
 * Creates a modbus attributes slice specifically for device stores
 * This is a convenience function that sets up the getter/setter for device.interfaceList.modbusInterface.modbusAttributes
 */
export function createModbusAttributesSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusAttributesSlice {
  return createSharedModbusAttributesSlice(
    set,
    (state) => state.device?.interfaceList?.modbusInterface?.modbusAttributes,
    (state, modbusAttributes) => {
      if (state.device?.interfaceList?.modbusInterface) {
        state.device.interfaceList.modbusInterface.modbusAttributes = modbusAttributes;
      }
    },
    true // isOptional - modbusAttributes is optional in ModbusInterface
  );
}
