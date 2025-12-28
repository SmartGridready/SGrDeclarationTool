import { DeviceFrame } from "@/models";
import { ModbusFunctionalProfile } from "@/models/product/modbus-interface";
import {
  createModbusAttributesSlice as createSharedModbusAttributesSlice,
  ModbusAttributesSlice as SharedModbusAttributesSlice,
} from "@/sections/shared/modbus-attributes/modbus-attributes-slice";

// Re-export the shared interface for use in device-specific code
export type ModbusAttributesSlice = SharedModbusAttributesSlice;

/**
 * Creates a modbus attributes slice specifically for functional profile level in device stores
 * This is a convenience function that sets up the getter/setter for functionalProfile.modbusAttributes
 *
 * @param set - The Zustand set function
 * @param getFunctionalProfile - Function to get the parent functional profile
 */
export function createModbusAttributesSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void,
  getFunctionalProfile: (state: TState) => ModbusFunctionalProfile | undefined
): ModbusAttributesSlice {
  return createSharedModbusAttributesSlice(
    set,
    (state) => getFunctionalProfile(state)?.modbusAttributes,
    (state, modbusAttributes) => {
      const functionalProfile = getFunctionalProfile(state);
      if (functionalProfile) {
        functionalProfile.modbusAttributes = modbusAttributes;
      }
    },
    true // isOptional - modbusAttributes is optional in ModbusFunctionalProfile
  );
}
