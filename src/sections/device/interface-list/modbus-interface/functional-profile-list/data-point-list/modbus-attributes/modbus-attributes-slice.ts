import { DeviceFrame } from "@/models";
import { ModbusDataPoint } from "@/models/product/modbus-interface";
import {
  createModbusAttributesSlice as createSharedModbusAttributesSlice,
  ModbusAttributesSlice as SharedModbusAttributesSlice,
} from "@/sections/shared/modbus-attributes/modbus-attributes-slice";

// Re-export the shared interface for use in device-specific code
export type ModbusAttributesSlice = SharedModbusAttributesSlice;

/**
 * Creates a modbus attributes slice for data point level in Device stores.
 * This is a wrapper around the shared slice that provides data-point-specific getters/setters.
 *
 * @param set - The Zustand set function
 * @param getDataPoint - Function to get the parent data point
 */
export function createModbusAttributesSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void,
  getDataPoint: (state: TState) => ModbusDataPoint | undefined
): ModbusAttributesSlice {
  const getModbusAttributes = (state: TState) => {
    return getDataPoint(state)?.modbusAttributes;
  };

  const setModbusAttributes = (
    state: TState,
    modbusAttributes: import("@/models/product/modbus-types").ModbusAttributes | undefined
  ) => {
    const dataPoint = getDataPoint(state);
    if (dataPoint) {
      dataPoint.modbusAttributes = modbusAttributes;
    }
  };

  return createSharedModbusAttributesSlice(set, getModbusAttributes, setModbusAttributes, true);
}
