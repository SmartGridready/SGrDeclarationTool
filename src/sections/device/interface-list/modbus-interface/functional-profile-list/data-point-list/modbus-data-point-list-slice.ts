import { DeviceFrame } from "@/models";
import { ModbusDataPoint, ModbusFunctionalProfile } from "@/models/product/modbus-interface";
import { createEmptyModbusDataPoint } from "@/utils/factory-utils";
import { createDataPointBaseSlice, DataPointBaseSlice } from "@/sections/shared/data-point-base/data-point-base-slice";
import { createModbusAttributesSlice, ModbusAttributesSlice } from "./modbus-attributes/modbus-attributes-slice";
import {
  createModbusDataPointConfigurationSlice,
  ModbusDataPointConfigurationSlice,
} from "./modbus-data-point-configuration/modbus-data-point-configuration-slice";

export interface ModbusDataPointListSlice {
  // Data point list management
  addEmptyDataPoint: () => void;
  removeDataPoint: (index: number) => void;
  removeAllDataPoints: () => void;

  // Get slice for a specific data point
  getDataPointSlice: (index: number) => DataPointBaseSlice;

  // Get modbus attributes slice for a specific data point
  getModbusAttributesSlice: (index: number) => ModbusAttributesSlice;

  // Get modbus data point configuration slice
  getModbusDataPointConfigurationSlice: (
    functionalProfileIndex: number,
    dataPointIndex: number
  ) => ModbusDataPointConfigurationSlice;

  // Update blockCacheIdentification for a specific data point
  updateBlockCacheIdentification: (index: number, blockCacheIdentification: string | undefined) => void;
}

/**
 * Creates a modbus data point list slice.
 * @param set - The Zustand set function
 * @param getFunctionalProfile - Function to get the parent functional profile
 * @param functionalProfileIndex - Index of the functional profile (needed for configuration slice)
 */
export function createModbusDataPointListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void,
  getFunctionalProfile: (state: TState) => ModbusFunctionalProfile | undefined,
  _functionalProfileIndex: number // Kept for API consistency with other slice factories
): ModbusDataPointListSlice {
  // Helper to get data point list
  const getDataPointList = (state: TState) => getFunctionalProfile(state)?.dataPointList;

  // Helper to get a specific data point
  const getDataPoint = (state: TState, index: number): ModbusDataPoint | undefined =>
    getDataPointList(state)?.dataPointListElement?.[index];

  // Create configuration slice (shared across all data points)
  const configurationSlice = createModbusDataPointConfigurationSlice(set);

  return {
    addEmptyDataPoint: () =>
      set((state) => {
        const fp = getFunctionalProfile(state);
        if (fp) {
          // Ensure dataPointList exists
          if (!fp.dataPointList) {
            fp.dataPointList = {
              dataPointListElement: [],
            };
          }
          fp.dataPointList.dataPointListElement.push(createEmptyModbusDataPoint());
        }
      }),

    removeDataPoint: (index) =>
      set((state) => {
        const list = getDataPointList(state);
        if (list && list.dataPointListElement.length > index) {
          list.dataPointListElement.splice(index, 1);
        }
      }),

    removeAllDataPoints: () =>
      set((state) => {
        const list = getDataPointList(state);
        if (list) {
          list.dataPointListElement = [];
        }
      }),

    getDataPointSlice: (index: number): DataPointBaseSlice => {
      return createDataPointBaseSlice(set, (state) => {
        // Return the actual ModbusDataPoint object, not a copy
        // This allows the slice to modify genericAttributeList directly
        return getDataPoint(state, index);
      });
    },

    getModbusAttributesSlice: (index: number): ModbusAttributesSlice => {
      return createModbusAttributesSlice(set, (state) => getDataPoint(state, index));
    },

    getModbusDataPointConfigurationSlice: (
      _functionalProfileIndex: number, // Kept for API consistency
      _dataPointIndex: number // Kept for API consistency
    ): ModbusDataPointConfigurationSlice => {
      return configurationSlice;
    },

    updateBlockCacheIdentification: (index, blockCacheIdentification) =>
      set((state) => {
        const dataPoint = getDataPoint(state, index);
        if (dataPoint) {
          if (blockCacheIdentification !== undefined) {
            dataPoint.blockCacheIdentification = blockCacheIdentification;
          } else {
            delete dataPoint.blockCacheIdentification;
          }
        }
      }),
  };
}
