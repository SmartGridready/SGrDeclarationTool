import {
  FunctionalProfileDataPoint,
  DataDirectionFunctionalProfile,
  PresenceLevel,
  DataTypeFunctionalProfile,
  Units,
} from "@/models";
import { createSimpleDataType } from "@/sections/functional-profile/data-point-list/data-type-utils";
import {
  SetState,
  getDataPoint,
  ensureArray,
  removeArrayItem,
} from "@/sections/shared/utils/slice-utils";
import {
  createEnumSlice,
  EnumSlice,
} from "@/sections/functional-profile/data-point-list/data-types/enum/enum-slice";
import {
  createBitmapSlice,
  BitmapSlice,
} from "@/sections/functional-profile/data-point-list/data-types/bitmap/bitmap-slice";
import {
  createJsonSlice,
  JsonSlice,
} from "@/sections/functional-profile/data-point-list/data-types/json/json-slice";
import {
  createParameterListSlice,
  ParameterListSlice,
} from "@/sections/functional-profile/data-point-list/parameter-list/parameter-list-slice";
import {
  createDataPointAlternativeNamesSlice,
  DataPointAlternativeNamesSlice,
} from "@/sections/functional-profile/data-point-list/alternative-names/alternative-names-slice";
import {
  createDataPointLegibleDescriptionSlice,
  DataPointLegibleDescriptionSlice,
} from "@/sections/functional-profile/data-point-list/legible-description/legible-description-slice";

export interface DataPointListSlice
  extends EnumSlice,
    BitmapSlice,
    JsonSlice,
    DataPointAlternativeNamesSlice,
    DataPointLegibleDescriptionSlice,
    ParameterListSlice {
  // Main operations
  addDataPoint: (dataPoint: FunctionalProfileDataPoint) => void;
  removeDataPoint: (index: number) => void;
  removeAllDataPoints: () => void;

  // Field-specific updates for dataPoint
  updateDataPointName: (index: number, name: string) => void;
  updateDataDirection: (index: number, direction: DataDirectionFunctionalProfile) => void;
  updatePresenceLevel: (index: number, level: PresenceLevel) => void;
  updateDataType: (index: number, dataType: DataTypeFunctionalProfile) => void;
  updateUnit: (index: number, unit: Units) => void;
  updateArrayLength: (index: number, length: number | undefined) => void;

  // Convenience methods
  addEmptyDataPoint: () => void;
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
  const alternativeNamesSlice = createDataPointAlternativeNamesSlice(set);
  const legibleDescriptionSlice = createDataPointLegibleDescriptionSlice(set);
  const parameterListSlice = createParameterListSlice(set);

  return {
    ...enumSlice,
    ...bitmapSlice,
    ...jsonSlice,
    ...alternativeNamesSlice,
    ...legibleDescriptionSlice,
    ...parameterListSlice,

    addDataPoint: (dataPoint) =>
      set((state) => {
        if (state.profile) {
          const list = ensureArray(state.profile.dataPointList?.dataPointListElement, () => []);
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
          removeArrayItem(state.profile.dataPointList.dataPointListElement, index, () => {
            if (state.profile) {
              state.profile.dataPointList = undefined;
            }
          });
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

    addEmptyDataPoint: () =>
      set((state) => {
        if (state.profile) {
          const list = ensureArray(state.profile.dataPointList?.dataPointListElement, () => []);
          list.push(createEmptyDataPoint());
          if (!state.profile.dataPointList) {
            state.profile.dataPointList = { dataPointListElement: list };
          } else {
            state.profile.dataPointList.dataPointListElement = list;
          }
        }
      }),
  };
};
