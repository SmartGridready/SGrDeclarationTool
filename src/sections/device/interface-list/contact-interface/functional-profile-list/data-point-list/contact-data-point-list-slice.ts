import { DeviceFrame, DataPointBase } from "@/models";
import { ContactFunctionalProfile } from "@/models/product/contact-interface";
import { createEmptyContactDataPoint } from "@/utils/factory-utils";
import { createDataPointBaseSlice, DataPointBaseSlice } from "@/sections/shared/data-point-base/data-point-base-slice";

export interface ContactDataPointListSlice {
  // Data point list management
  addEmptyDataPoint: () => void;
  removeDataPoint: (index: number) => void;
  removeAllDataPoints: () => void;

  // Get slice for a specific data point
  getDataPointSlice: (index: number) => DataPointBaseSlice;
}

/**
 * Creates a Contact data point list slice.
 * @param set - The Zustand set function
 * @param getFunctionalProfile - Function to get the parent functional profile
 * @param functionalProfileIndex - Index of the functional profile
 */
export function createContactDataPointListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void,
  getFunctionalProfile: (state: TState) => ContactFunctionalProfile | undefined,
  _functionalProfileIndex: number // Kept for API consistency with other slice factories
): ContactDataPointListSlice {
  // Helper to get data point list
  const getDataPointList = (state: TState) => getFunctionalProfile(state)?.dataPointList;

  // Helper to get a specific data point
  const getDataPoint = (state: TState, index: number): DataPointBase | undefined =>
    getDataPointList(state)?.dataPointListElement?.[index];

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
          fp.dataPointList.dataPointListElement.push(createEmptyContactDataPoint());
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
        // Return the actual DataPointBase object, not a copy
        // This allows the slice to modify genericAttributeList directly
        return getDataPoint(state, index);
      });
    },
  };
}
