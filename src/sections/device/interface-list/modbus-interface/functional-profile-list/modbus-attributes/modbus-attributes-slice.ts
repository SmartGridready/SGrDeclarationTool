import { DeviceFrame } from "@/models";
import { ModbusFunctionalProfile } from "@/models/product/modbus-interface";
import {
  createModbusAttributesSlice as createSharedModbusAttributesSlice,
  ModbusAttributesSlice as SharedModbusAttributesSlice,
} from "@/sections/shared/modbus-attributes/modbus-attributes-slice";

// Re-export the shared interface for use in device-specific code
export type ModbusAttributesSlice = SharedModbusAttributesSlice;

/**
 * Creates a modbus attributes slice for functional profile level in Device stores.
 * This is a wrapper around the shared slice that provides profile-specific getters/setters.
 *
 * @param set - The Zustand set function
 * @param getFunctionalProfile - Function to get the parent functional profile
 */
export function createModbusAttributesSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void,
  getFunctionalProfile: (state: TState) => ModbusFunctionalProfile | undefined
): ModbusAttributesSlice {
  const getModbusAttributes = (state: TState) => {
    return getFunctionalProfile(state)?.modbusAttributes;
  };

  const setModbusAttributes = (
    state: TState,
    modbusAttributes: import("@/models/product/modbus-types").ModbusAttributes | undefined
  ) => {
    const functionalProfile = getFunctionalProfile(state);
    if (functionalProfile) {
      functionalProfile.modbusAttributes = modbusAttributes;
    }
  };

  return createSharedModbusAttributesSlice(set, getModbusAttributes, setModbusAttributes, true);
}
