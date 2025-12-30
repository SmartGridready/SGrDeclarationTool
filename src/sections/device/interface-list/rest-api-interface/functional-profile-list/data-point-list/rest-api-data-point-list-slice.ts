import { DeviceFrame } from "@/models";
import { RestApiDataPoint, RestApiFunctionalProfile } from "@/models/product/rest-api-interface";
import { createEmptyRestApiDataPoint } from "@/utils/factory-utils";
import {
  createDataPointBaseSlice,
  DataPointBaseSlice,
} from "@/sections/shared/data-point-base/data-point-base-slice";
import {
  createRestApiDataPointConfigurationSlice,
  RestApiDataPointConfigurationSlice,
} from "./rest-api-data-point-configuration/rest-api-data-point-configuration-slice";

export interface RestApiDataPointListSlice {
  // Data point list management
  addEmptyDataPoint: () => void;
  removeDataPoint: (index: number) => void;
  removeAllDataPoints: () => void;

  // Get slice for a specific data point
  getDataPointSlice: (index: number) => DataPointBaseSlice;

  // Get configuration slice for a specific data point
  getDataPointConfigurationSlice: (index: number) => RestApiDataPointConfigurationSlice;
}

/**
 * Creates a REST API data point list slice.
 * @param set - The Zustand set function
 * @param getFunctionalProfile - Function to get the parent functional profile
 * @param functionalProfileIndex - Index of the functional profile
 */
export function createRestApiDataPointListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void,
  getFunctionalProfile: (state: TState) => RestApiFunctionalProfile | undefined,
  _functionalProfileIndex: number // Kept for API consistency with other slice factories
): RestApiDataPointListSlice {
  // Helper to get data point list
  const getDataPointList = (state: TState) => getFunctionalProfile(state)?.dataPointList;

  // Helper to get a specific data point
  const getDataPoint = (state: TState, index: number): RestApiDataPoint | undefined =>
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
          fp.dataPointList.dataPointListElement.push(createEmptyRestApiDataPoint());
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
        // Return the actual RestApiDataPoint object, not a copy
        // This allows the slice to modify genericAttributeList directly
        return getDataPoint(state, index);
      });
    },

    getDataPointConfigurationSlice: (index: number): RestApiDataPointConfigurationSlice => {
      return createRestApiDataPointConfigurationSlice(set, (state) => {
        return getDataPoint(state, index);
      });
    },
  };
}
