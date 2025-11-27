import {
  FunctionalProfileDataPoint,
  DataDirectionFunctionalProfile,
  PresenceLevel,
  DataTypeFunctionalProfile,
  Units,
  LegibleDescription,
  Language,
} from "@/models";
import { createSimpleDataType } from "@/sections/functional-profile/data-point-list/data-type-utils";
import {
  SetState,
  getDataPoint,
  ensureArray,
  removeArrayItem,
} from "@/sections/shared/slice-utils";
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

const createEmptyDataPoint = (): FunctionalProfileDataPoint => ({
  dataPoint: {
    dataPointName: "",
    dataDirection: "R",
    presenceLevel: "M",
    dataType: createSimpleDataType("float64"),
    unit: "NO_UNITS",
  },
});

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
          const list = ensureArray(
            state.profile.dataPointList?.dataPointListElement,
            () => []
          );
          list.push(dataPoint);
          if (!state.profile.dataPointList) {
            state.profile.dataPointList = { dataPointListElement: list };
          } else {
            state.profile.dataPointList.dataPointListElement = list;
          }
        }
      }),

    removeDataPoint: (index) =>
      set((state) => {
        if (state.profile?.dataPointList?.dataPointListElement) {
          removeArrayItem(
            state.profile.dataPointList.dataPointListElement,
            index,
            () => {
              if (state.profile) {
                state.profile.dataPointList = undefined;
              }
            }
          );
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
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.dataPointName = name;
        }
      }),

    updateDataDirection: (index, direction) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.dataDirection = direction;
        }
      }),

    updatePresenceLevel: (index, level) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.presenceLevel = level;
        }
      }),

    updateDataType: (index, dataType) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.dataType = dataType;
        }
      }),

    updateUnit: (index, unit) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.unit = unit;
        }
      }),

    updateArrayLength: (index, length) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.arrayLength = length;
        }
      }),

    addDataPointLegibleDescription: (dataPointIndex, description) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) {
          const list = ensureArray(dp.dataPoint.legibleDescription, () => []);
          if (list.length < 4) {
            list.push(description);
            dp.dataPoint.legibleDescription = list;
          }
        }
      }),

    removeDataPointLegibleDescription: (dataPointIndex, descIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp?.dataPoint.legibleDescription) {
          removeArrayItem(dp.dataPoint.legibleDescription, descIndex, () => {
            dp.dataPoint.legibleDescription = undefined;
          });
        }
      }),

    updateDataPointLegibleDescriptionText: (dataPointIndex, descIndex, text) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
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
        const dp = getDataPoint(state, dataPointIndex);
        const desc = dp?.dataPoint.legibleDescription?.[descIndex];
        if (desc) {
          desc.language = language;
        }
      }),

    addEmptyDataPoint: () =>
      set((state) => {
        if (state.profile) {
          const list = ensureArray(
            state.profile.dataPointList?.dataPointListElement,
            () => []
          );
          list.push(createEmptyDataPoint());
          if (!state.profile.dataPointList) {
            state.profile.dataPointList = { dataPointListElement: list };
          } else {
            state.profile.dataPointList.dataPointListElement = list;
          }
        }
      }),

    addEmptyDataPointLegibleDescription: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) {
          const list = ensureArray(dp.dataPoint.legibleDescription, () => []);
          if (list.length < 4) {
            list.push({ textElement: "", language: "en" });
            dp.dataPoint.legibleDescription = list;
          }
        }
      }),
  };
};
