import { DataTypeProduct, FunctionalProfileDataPoint } from "@/models";
import { ensureArray, removeArrayItem, normalizeString } from "@/utils/slice-utils";
import {
  createParameterListEnumSlice,
  ParameterListEnumSlice,
} from "@/sections/functional-profile/data-point-list/parameter-list/data-types/enum/enum-slice";
import {
  createParameterListBitmapSlice,
  ParameterListBitmapSlice,
} from "@/sections/functional-profile/data-point-list/parameter-list/data-types/bitmap/bitmap-slice";
import {
  createParameterDescriptionsSlice,
  ParameterDescriptionsSlice,
} from "@/sections/functional-profile/data-point-list/parameter-list/parameter-descriptions/parameter-descriptions-slice";

export interface ParameterListSlice
  extends ParameterListEnumSlice,
    ParameterListBitmapSlice,
    ParameterDescriptionsSlice {
  addDataPointParameterList: (dataPointIndex: number) => void;
  removeDataPointParameterList: (dataPointIndex: number) => void;
  addDataPointParameterListElement: (dataPointIndex: number) => void;
  removeDataPointParameterListElement: (dataPointIndex: number, paramIndex: number) => void;
  updateDataPointParameterListElementName: (
    dataPointIndex: number,
    paramIndex: number,
    name: string
  ) => void;
  updateDataPointParameterListElementDataType: (
    dataPointIndex: number,
    paramIndex: number,
    dataType: DataTypeProduct
  ) => void;
  updateDataPointParameterListElementDefaultValue: (
    dataPointIndex: number,
    paramIndex: number,
    defaultValue: string | undefined
  ) => void;
}

export function createParameterListSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataPoint: (state: TState, index: number) => FunctionalProfileDataPoint | undefined
): ParameterListSlice {
  const enumSlice = createParameterListEnumSlice(set, getDataPoint);
  const bitmapSlice = createParameterListBitmapSlice(set, getDataPoint);
  const descriptionsSlice = createParameterDescriptionsSlice(set, getDataPoint);

  return {
    ...enumSlice,
    ...bitmapSlice,
    ...descriptionsSlice,

    addDataPointParameterList: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) dp.dataPoint.parameterList = {};
      }),

    removeDataPointParameterList: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) dp.dataPoint.parameterList = undefined;
      }),

    addDataPointParameterListElement: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) {
          if (!dp.dataPoint.parameterList) dp.dataPoint.parameterList = {};
          const list = ensureArray(dp.dataPoint.parameterList.parameterListElement, () => []);
          list.push({ name: "", dataType: { float64: {} } });
          dp.dataPoint.parameterList.parameterListElement = list;
        }
      }),

    removeDataPointParameterListElement: (dataPointIndex, paramIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp?.dataPoint.parameterList?.parameterListElement) {
          removeArrayItem(dp.dataPoint.parameterList.parameterListElement, paramIndex, () => {
            if (dp.dataPoint.parameterList)
              dp.dataPoint.parameterList.parameterListElement = undefined;
          });
        }
      }),

    updateDataPointParameterListElementName: (dataPointIndex, paramIndex, name) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param) param.name = name;
      }),

    updateDataPointParameterListElementDataType: (dataPointIndex, paramIndex, dataType) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param) param.dataType = dataType;
      }),

    updateDataPointParameterListElementDefaultValue: (dataPointIndex, paramIndex, defaultValue) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param) param.defaultValue = normalizeString(defaultValue);
      }),
  };
}
