import {
  FunctionalProfileFrame,
  FunctionalProfileDataPoint,
  DataDirectionFunctionalProfile,
  PresenceLevel,
  DataTypeFunctionalProfile,
  Units,
  LegibleDescription,
  Language,
} from "@/models";
import { createSimpleDataType } from "@/sections/functional-profile/data-point-list/data-type-utils";
import { createEnumSlice, EnumSlice } from "./enum/enum-slice";
import { createBitmapSlice, BitmapSlice } from "./bitmap/bitmap-slice";
import { createJsonSlice, JsonSlice } from "./json/json-slice";

export interface DataPointListSlice extends EnumSlice, BitmapSlice, JsonSlice {
  // Main operations
  addDataPoint: (dataPoint: FunctionalProfileDataPoint) => void;
  removeDataPoint: (index: number) => void;
  removeAllDataPoints: () => void;

  // Field-specific updates for dataPoint
  updateDataPointName: (index: number, name: string) => void;
  updateDataDirection: (
    index: number,
    direction: DataDirectionFunctionalProfile
  ) => void;
  updatePresenceLevel: (index: number, level: PresenceLevel) => void;
  updateDataType: (index: number, dataType: DataTypeFunctionalProfile) => void;
  updateUnit: (index: number, unit: Units) => void;
  updateArrayLength: (index: number, length: number | undefined) => void;

  // Legible description operations for data points
  addDataPointLegibleDescription: (
    dataPointIndex: number,
    description: LegibleDescription
  ) => void;
  removeDataPointLegibleDescription: (
    dataPointIndex: number,
    descIndex: number
  ) => void;
  updateDataPointLegibleDescriptionText: (
    dataPointIndex: number,
    descIndex: number,
    text: string
  ) => void;
  updateDataPointLegibleDescriptionLanguage: (
    dataPointIndex: number,
    descIndex: number,
    language: Language
  ) => void;

  // Convenience methods
  addEmptyDataPoint: () => void;
  addEmptyDataPointLegibleDescription: (dataPointIndex: number) => void;
}

type StoreState = {
  profile?: FunctionalProfileFrame;
};

type SetState = (fn: (state: StoreState) => void) => void;

/**
 * Creates a new empty FunctionalProfileDataPoint entry with default values
 */
function createEmptyDataPoint(): FunctionalProfileDataPoint {
  return {
    dataPoint: {
      dataPointName: "",
      dataDirection: "R",
      presenceLevel: "M",
      dataType: createSimpleDataType("float64"),
      unit: "NO_UNITS",
    },
  };
}

export const createDataPointListSlice = (set: SetState): DataPointListSlice => {
  const enumSlice = createEnumSlice(set);
  const bitmapSlice = createBitmapSlice(set);
  const jsonSlice = createJsonSlice(set);

  return {
    ...enumSlice,
    ...bitmapSlice,
    ...jsonSlice,

    addDataPoint: (dataPoint) =>
      set((state) => {
        if (state.profile) {
          if (!state.profile.dataPointList) {
            state.profile.dataPointList = { dataPointListElement: [] };
          }
          state.profile.dataPointList.dataPointListElement.push(dataPoint);
        }
      }),

    removeDataPoint: (index) =>
      set((state) => {
        const dataPointArray =
          state.profile?.dataPointList?.dataPointListElement;
        if (dataPointArray && index >= 0 && index < dataPointArray.length) {
          dataPointArray.splice(index, 1);
          if (dataPointArray.length === 0 && state.profile) {
            state.profile.dataPointList = undefined;
          }
        }
      }),

    removeAllDataPoints: () =>
      set((state) => {
        if (state.profile) {
          state.profile.dataPointList = undefined;
        }
      }),

    updateDataPointName: (index, name) =>
      set((state) => {
        const dp = state.profile?.dataPointList?.dataPointListElement?.[index];
        if (dp) {
          dp.dataPoint.dataPointName = name;
        }
      }),

    updateDataDirection: (index, direction) =>
      set((state) => {
        const dp = state.profile?.dataPointList?.dataPointListElement?.[index];
        if (dp) {
          dp.dataPoint.dataDirection = direction;
        }
      }),

    updatePresenceLevel: (index, level) =>
      set((state) => {
        const dp = state.profile?.dataPointList?.dataPointListElement?.[index];
        if (dp) {
          dp.dataPoint.presenceLevel = level;
        }
      }),

    updateDataType: (index, dataType) =>
      set((state) => {
        const dp = state.profile?.dataPointList?.dataPointListElement?.[index];
        if (dp) {
          dp.dataPoint.dataType = dataType;
        }
      }),

    updateUnit: (index, unit) =>
      set((state) => {
        const dp = state.profile?.dataPointList?.dataPointListElement?.[index];
        if (dp) {
          dp.dataPoint.unit = unit;
        }
      }),

    updateArrayLength: (index, length) =>
      set((state) => {
        const dp = state.profile?.dataPointList?.dataPointListElement?.[index];
        if (dp) {
          dp.dataPoint.arrayLength = length;
        }
      }),

    addDataPointLegibleDescription: (dataPointIndex, description) =>
      set((state) => {
        const dp =
          state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
        if (dp) {
          if (!dp.dataPoint.legibleDescription) {
            dp.dataPoint.legibleDescription = [];
          }
          if (dp.dataPoint.legibleDescription.length < 4) {
            dp.dataPoint.legibleDescription.push(description);
          }
        }
      }),

    removeDataPointLegibleDescription: (dataPointIndex, descIndex) =>
      set((state) => {
        const dp =
          state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
        const descriptions = dp?.dataPoint.legibleDescription;
        if (descriptions && descIndex >= 0 && descIndex < descriptions.length) {
          descriptions.splice(descIndex, 1);
          if (descriptions.length === 0) {
            dp.dataPoint.legibleDescription = undefined;
          }
        }
      }),

    updateDataPointLegibleDescriptionText: (dataPointIndex, descIndex, text) =>
      set((state) => {
        const dp =
          state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
        const desc = dp?.dataPoint.legibleDescription?.[descIndex];
        if (desc) {
          desc.textElement = text;
        }
      }),

    updateDataPointLegibleDescriptionLanguage: (
      dataPointIndex,
      descIndex,
      language
    ) =>
      set((state) => {
        const dp =
          state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
        const desc = dp?.dataPoint.legibleDescription?.[descIndex];
        if (desc) {
          desc.language = language;
        }
      }),

    addEmptyDataPoint: () =>
      set((state) => {
        if (state.profile) {
          if (!state.profile.dataPointList) {
            state.profile.dataPointList = { dataPointListElement: [] };
          }
          state.profile.dataPointList.dataPointListElement.push(
            createEmptyDataPoint()
          );
        }
      }),

    addEmptyDataPointLegibleDescription: (dataPointIndex) =>
      set((state) => {
        const dp =
          state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
        if (dp) {
          if (!dp.dataPoint.legibleDescription) {
            dp.dataPoint.legibleDescription = [];
          }
          if (dp.dataPoint.legibleDescription.length < 4) {
            dp.dataPoint.legibleDescription.push({
              textElement: "",
              language: "en",
            });
          }
        }
      }),
  };
};
