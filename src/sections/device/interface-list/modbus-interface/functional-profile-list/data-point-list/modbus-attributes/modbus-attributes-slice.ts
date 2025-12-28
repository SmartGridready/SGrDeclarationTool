import { DeviceFrame } from "@/models";
import { ModbusDataPoint } from "@/models/product/modbus-interface";
import {
  createModbusAttributesSlice as createSharedModbusAttributesSlice,
  ModbusAttributesSlice as SharedModbusAttributesSlice,
} from "@/sections/shared/modbus-attributes/modbus-attributes-slice";

// Re-export the shared interface for use in device-specific code
export type ModbusAttributesSlice = SharedModbusAttributesSlice;

/**
 * Creates a modbus attributes slice specifically for data point level in device stores
 * This is a convenience function that sets up the getter/setter for dataPoint.modbusAttributes
 *
 * @param set - The Zustand set function
 * @param getDataPoint - Function to get the parent data point
 */
export function createModbusAttributesSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void,
  getDataPoint: (state: TState) => ModbusDataPoint | undefined
): ModbusAttributesSlice {
  return createSharedModbusAttributesSlice(
    set,
    (state) => getDataPoint(state)?.modbusAttributes,
    (state, modbusAttributes) => {
      const dataPoint = getDataPoint(state);
      if (dataPoint) {
        dataPoint.modbusAttributes = modbusAttributes;
      }
    },
    true // isOptional - modbusAttributes is optional in ModbusDataPoint
  );
}
