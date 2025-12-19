import {
  BitmapProduct,
  BitmapEntryProduct,
  FunctionalProfileDataPoint,
  DynamicParameterDescriptionListElement,
} from "@/models";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface ParameterListBitmapSlice {
  setParameterListBitmapDataType: (
    dataPointIndex: number,
    paramIndex: number,
    bitmap: BitmapProduct
  ) => void;
  addParameterListBitmapEntry: (
    dataPointIndex: number,
    paramIndex: number,
    entry: BitmapEntryProduct
  ) => void;
  removeParameterListBitmapEntry: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number
  ) => void;
  updateParameterListBitmapEntryLiteral: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateParameterListBitmapEntryHexMask: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    hexMask: string
  ) => void;
  updateParameterListBitmapEntryDescription: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  addEmptyParameterListBitmapEntry: (dataPointIndex: number, paramIndex: number) => void;
}

export function createParameterListBitmapSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataPoint: (state: TState, index: number) => FunctionalProfileDataPoint | undefined
): ParameterListBitmapSlice {
  const getParameter = (
    state: TState,
    dataPointIndex: number,
    paramIndex: number
  ): DynamicParameterDescriptionListElement | undefined => {
    const dp = getDataPoint(state, dataPointIndex);
    return dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
  };

  return {
    setParameterListBitmapDataType: (dataPointIndex, paramIndex, bitmap) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        if (param) param.dataType = { bitmap: bitmap };
      }),

    addParameterListBitmapEntry: (dataPointIndex, paramIndex, entry) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        if (param && "bitmap" in param.dataType) {
          const entries = ensureArray(param.dataType.bitmap.bitmapEntry, () => []);
          entries.push(entry);
          param.dataType.bitmap.bitmapEntry = entries;
        }
      }),

    removeParameterListBitmapEntry: (dataPointIndex, paramIndex, entryIndex) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        if (param && "bitmap" in param.dataType) {
          const bitmapType = param.dataType.bitmap;
          removeArrayItem(bitmapType.bitmapEntry, entryIndex, () => {
            bitmapType.bitmapEntry = [];
          });
        }
      }),

    updateParameterListBitmapEntryLiteral: (dataPointIndex, paramIndex, entryIndex, literal) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        const entry =
          param?.dataType &&
          "bitmap" in param.dataType &&
          param.dataType.bitmap.bitmapEntry?.[entryIndex];
        if (entry) entry.literal = literal;
      }),

    updateParameterListBitmapEntryHexMask: (dataPointIndex, paramIndex, entryIndex, hexMask) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        const entry =
          param?.dataType &&
          "bitmap" in param.dataType &&
          param.dataType.bitmap.bitmapEntry?.[entryIndex];
        if (entry) entry.hexMask = hexMask;
      }),

    updateParameterListBitmapEntryDescription: (
      dataPointIndex,
      paramIndex,
      entryIndex,
      description
    ) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        const entry =
          param?.dataType &&
          "bitmap" in param.dataType &&
          param.dataType.bitmap.bitmapEntry?.[entryIndex];
        if (entry) entry.description = description;
      }),

    addEmptyParameterListBitmapEntry: (dataPointIndex, paramIndex) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        if (param && "bitmap" in param.dataType) {
          const entries = ensureArray(param.dataType.bitmap.bitmapEntry, () => []);
          entries.push({ literal: "", hexMask: "" });
          param.dataType.bitmap.bitmapEntry = entries;
        }
      }),
  };
}
