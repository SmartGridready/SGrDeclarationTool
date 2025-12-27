import { DeviceFrame } from "@/models";
import { ModbusDataPoint, ModbusFunctionalProfile } from "@/models/product/modbus-interface";
import { createEmptyModbusDataPoint } from "@/utils/factory-utils";
import {
  createDataPointBaseSlice,
  DataPointBaseSlice,
} from "@/sections/shared/data-point-base/data-point-base-slice";

export interface ModbusDataPointListSlice {
  // Data point list management
  addEmptyDataPoint: () => void;
  removeDataPoint: (index: number) => void;
  removeAllDataPoints: () => void;

  // Get slice for a specific data point
  getDataPointSlice: (index: number) => DataPointBaseSlice;
}

/**
 * Creates a modbus data point list slice.
 * @param set - The Zustand set function
 * @param getFunctionalProfile - Function to get the parent functional profile
 */
export function createModbusDataPointListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void,
  getFunctionalProfile: (state: TState) => ModbusFunctionalProfile | undefined
): ModbusDataPointListSlice {
  // Helper to get data point list
  const getDataPointList = (state: TState) => getFunctionalProfile(state)?.dataPointList;

  // Helper to get a specific data point
  const getDataPoint = (state: TState, index: number): ModbusDataPoint | undefined =>
    getDataPointList(state)?.dataPointListElement?.[index];

  // Cache for data point slices
  const dataPointSliceCache = new Map<number, DataPointBaseSlice>();

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
          // Clear cache for removed index
          dataPointSliceCache.delete(index);
        }
      }),

    removeAllDataPoints: () =>
      set((state) => {
        const list = getDataPointList(state);
        if (list) {
          list.dataPointListElement = [];
          dataPointSliceCache.clear();
        }
      }),

    getDataPointSlice: (index: number): DataPointBaseSlice => {
      // Create slice on demand and cache it
      if (!dataPointSliceCache.has(index)) {
        const slice = createDataPointBaseSlice(set, (state) => {
          // Return the actual ModbusDataPoint object, not a copy
          // This allows the slice to modify genericAttributeList directly
          return getDataPoint(state, index);
        });
        dataPointSliceCache.set(index, slice);
      }
      return dataPointSliceCache.get(index)!;
    },
  };
}
