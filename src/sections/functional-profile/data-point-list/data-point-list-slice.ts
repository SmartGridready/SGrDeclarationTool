import {
  FunctionalProfileFrame,
  FunctionalProfileDataPoint,
  FunctionalProfileDataPointList,
  DataDirectionFunctionalProfile,
  PresenceLevel,
  DataTypeFunctionalProfile,
  Units,
} from "@/models";
import { createEmptyDataPoint } from "@/utils/factory-utils";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";
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
import { createParameterListSlice } from "@/sections/functional-profile/data-point-list/dynamic-parameter-list/parameter-list-slice";
import { DynamicParameterListSlice } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-slice";
import {
  createDataPointAlternativeNamesSlice,
  DataPointAlternativeNamesSlice,
} from "@/sections/functional-profile/data-point-list/alternative-names/alternative-names-slice";
import {
  createDataPointLegibleDescriptionSlice,
  DataPointLegibleDescriptionSlice,
} from "@/sections/functional-profile/data-point-list/legible-description/legible-description-slice";
import {
  createDataPointGenericAttributeListSlice,
  DataPointGenericAttributeListSlice,
} from "@/sections/functional-profile/data-point-list/generic-attribute-list/generic-attribute-list-slice";

export interface DataPointListSlice
  extends EnumSlice,
    BitmapSlice,
    JsonSlice,
    DataPointAlternativeNamesSlice,
    DataPointLegibleDescriptionSlice,
    DynamicParameterListSlice,
    DataPointGenericAttributeListSlice {
  addDataPoint: (dataPoint: FunctionalProfileDataPoint) => void;
  removeDataPoint: (index: number) => void;
  removeAllDataPoints: () => void;
  updateDataPointName: (index: number, name: string) => void;
  updateDataDirection: (index: number, direction: DataDirectionFunctionalProfile) => void;
  updatePresenceLevel: (index: number, level: PresenceLevel) => void;
  updateDataType: (index: number, dataType: DataTypeFunctionalProfile) => void;
  updateUnit: (index: number, unit: Units) => void;
  updateArrayLength: (index: number, length: number | undefined) => void;
  addEmptyDataPoint: () => void;
}

/**
 * Creates a data point list slice specifically for functional profile stores
 * This is a convenience function that pre-configures the getters/setters
 */
export function createDataPointListSlice<TState extends { profile?: FunctionalProfileFrame }>(
  set: (fn: (state: TState) => void) => void
): DataPointListSlice {
  const getDataPointList = (state: TState) => state.profile?.dataPointList;
  const setDataPointList = (
    state: TState,
    dataPointList: FunctionalProfileDataPointList | undefined
  ) => {
    if (state.profile) {
      state.profile.dataPointList = dataPointList;
    }
  };

  const getDataPoint = (state: TState, index: number): FunctionalProfileDataPoint | undefined => {
    return getDataPointList(state)?.dataPointListElement?.[index];
  };

  const enumSlice = createEnumSlice(set, getDataPoint);
  const bitmapSlice = createBitmapSlice(set, getDataPoint);
  const jsonSlice = createJsonSlice(set, getDataPoint);
  const alternativeNamesSlice = createDataPointAlternativeNamesSlice(set, getDataPoint);
  const legibleDescriptionSlice = createDataPointLegibleDescriptionSlice(set, getDataPoint);
  const parameterListSlice = createParameterListSlice(set, getDataPoint);
  const genericAttributeListSlice = createDataPointGenericAttributeListSlice(set, getDataPoint);

  return {
    ...enumSlice,
    ...bitmapSlice,
    ...jsonSlice,
    ...alternativeNamesSlice,
    ...legibleDescriptionSlice,
    ...parameterListSlice,
    ...genericAttributeListSlice,

    addDataPoint: (dataPoint) =>
      set((state) => {
        const dpList = getDataPointList(state);
        if (dpList) {
          const list = ensureArray(dpList.dataPointListElement, () => []);
          list.push(dataPoint);
          dpList.dataPointListElement = list;
        } else {
          setDataPointList(state, { dataPointListElement: [dataPoint] });
        }
      }),

    removeDataPoint: (index) =>
      set((state) => {
        const dpList = getDataPointList(state);
        if (dpList?.dataPointListElement) {
          removeArrayItem(dpList.dataPointListElement, index, () => {
            setDataPointList(state, undefined);
          });
        }
      }),

    removeAllDataPoints: () =>
      set((state) => {
        setDataPointList(state, undefined);
      }),

    updateDataPointName: (index, name) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) dp.dataPoint.dataPointName = name;
      }),

    updateDataDirection: (index, direction) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) dp.dataPoint.dataDirection = direction;
      }),

    updatePresenceLevel: (index, level) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) dp.dataPoint.presenceLevel = level;
      }),

    updateDataType: (index, dataType) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) dp.dataPoint.dataType = dataType;
      }),

    updateUnit: (index, unit) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) dp.dataPoint.unit = unit;
      }),

    updateArrayLength: (index, length) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) dp.dataPoint.arrayLength = length;
      }),

    addEmptyDataPoint: () =>
      set((state) => {
        const dpList = getDataPointList(state);
        if (dpList) {
          const list = ensureArray(dpList.dataPointListElement, () => []);
          list.push(createEmptyDataPoint());
          dpList.dataPointListElement = list;
        } else {
          setDataPointList(state, { dataPointListElement: [createEmptyDataPoint()] });
        }
      }),
  };
}
