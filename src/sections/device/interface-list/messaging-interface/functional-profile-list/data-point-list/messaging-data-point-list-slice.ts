import { DeviceFrame } from "@/models";
import {
  MessagingDataPoint,
  MessagingFunctionalProfile,
} from "@/models/product/messaging-interface";
import { createEmptyMessagingDataPoint } from "@/utils/factory-utils";
import {
  createDataPointBaseSlice,
  DataPointBaseSlice,
} from "@/sections/shared/data-point-base/data-point-base-slice";
import {
  createMessagingDataPointConfigurationSlice,
  MessagingDataPointConfigurationSlice,
} from "./messaging-data-point-configuration/messaging-data-point-configuration-slice";

export interface MessagingDataPointListSlice {
  // Data point list management
  addEmptyDataPoint: () => void;
  removeDataPoint: (index: number) => void;
  removeAllDataPoints: () => void;

  // Get slice for a specific data point
  getDataPointSlice: (index: number) => DataPointBaseSlice;
  getMessagingDataPointConfigurationSlice: (index: number) => MessagingDataPointConfigurationSlice;
}

/**
 * Creates a Messaging data point list slice.
 * @param set - The Zustand set function
 * @param getFunctionalProfile - Function to get the parent functional profile
 * @param functionalProfileIndex - Index of the functional profile
 */
export function createMessagingDataPointListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void,
  getFunctionalProfile: (state: TState) => MessagingFunctionalProfile | undefined,
  functionalProfileIndex: number
): MessagingDataPointListSlice {
  // Helper to get data point list
  const getDataPointList = (state: TState) => getFunctionalProfile(state)?.dataPointList;

  // Helper to get a specific data point
  const getDataPoint = (state: TState, index: number): MessagingDataPoint | undefined =>
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
          fp.dataPointList.dataPointListElement.push(createEmptyMessagingDataPoint());
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
        // Return the actual MessagingDataPoint object, not a copy
        // This allows the slice to modify genericAttributeList directly
        return getDataPoint(state, index);
      });
    },

    getMessagingDataPointConfigurationSlice: (
      index: number
    ): MessagingDataPointConfigurationSlice => {
      return createMessagingDataPointConfigurationSlice(
        set,
        (state) => getDataPoint(state, index)?.messagingDataPointConfiguration,
        (state, configuration) => {
          const dataPoint = getDataPoint(state, index);
          if (dataPoint && configuration) {
            dataPoint.messagingDataPointConfiguration = configuration;
          }
        }
      );
    },
  };
}
