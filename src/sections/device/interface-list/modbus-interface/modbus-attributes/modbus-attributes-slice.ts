import { DeviceFrame } from "@/models";
import {
  createModbusAttributesSlice as createSharedModbusAttributesSlice,
  ModbusAttributesSlice as SharedModbusAttributesSlice,
} from "@/sections/shared/modbus-attributes/modbus-attributes-slice";

// Re-export the shared interface for use in device-specific code
export type ModbusAttributesSlice = SharedModbusAttributesSlice;

/**
 * Creates a modbus attributes slice for Device stores.
 * This is a wrapper around the shared slice that provides device-specific getters/setters.
 */
export function createModbusAttributesSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusAttributesSlice {
  const getModbusAttributes = (state: TState) => {
    return state.device?.interfaceList?.modbusInterface?.modbusAttributes;
  };

  const setModbusAttributes = (
    state: TState,
    modbusAttributes: import("@/models/product/modbus-types").ModbusAttributes | undefined
  ) => {
    const modbusInterface = state.device?.interfaceList?.modbusInterface;
    if (modbusInterface) {
      modbusInterface.modbusAttributes = modbusAttributes;
    }
  };

  return createSharedModbusAttributesSlice(set, getModbusAttributes, setModbusAttributes, true);
}
