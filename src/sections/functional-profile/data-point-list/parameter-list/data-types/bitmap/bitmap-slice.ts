import { BitmapProduct, BitmapEntryProduct } from "@/models";
import {
  SetState,
  getDataPoint,
  ensureArray,
  removeArrayItem,
  normalizeString,
} from "@/sections/shared/utils/slice-utils";

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

export const createParameterListBitmapSlice = (set: SetState): ParameterListBitmapSlice => ({
  setParameterListBitmapDataType: (dataPointIndex, paramIndex, bitmap) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
      if (param) {
        param.dataType = { bitmap: bitmap };
      }
    }),

  addParameterListBitmapEntry: (dataPointIndex, paramIndex, entry) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
      if (param && "bitmap" in param.dataType) {
        const bitmapType = param.dataType.bitmap;
        const entries = ensureArray(bitmapType.bitmapEntry, () => []);
        entries.push(entry);
        bitmapType.bitmapEntry = entries;
      }
    }),

  removeParameterListBitmapEntry: (dataPointIndex, paramIndex, entryIndex) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
      if (param && "bitmap" in param.dataType) {
        const bitmapType = param.dataType.bitmap;
        removeArrayItem(bitmapType.bitmapEntry, entryIndex, () => {
          bitmapType.bitmapEntry = [];
        });
      }
    }),

  updateParameterListBitmapEntryLiteral: (dataPointIndex, paramIndex, entryIndex, literal) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const entry =
        dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.dataType &&
        "bitmap" in dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType &&
        dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType.bitmap.bitmapEntry?.[
          entryIndex
        ];
      if (entry) {
        entry.literal = literal;
      }
    }),

  updateParameterListBitmapEntryHexMask: (dataPointIndex, paramIndex, entryIndex, hexMask) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const entry =
        dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.dataType &&
        "bitmap" in dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType &&
        dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType.bitmap.bitmapEntry?.[
          entryIndex
        ];
      if (entry) {
        entry.hexMask = hexMask;
      }
    }),

  updateParameterListBitmapEntryDescription: (
    dataPointIndex,
    paramIndex,
    entryIndex,
    description
  ) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const entry =
        dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.dataType &&
        "bitmap" in dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType &&
        dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType.bitmap.bitmapEntry?.[
          entryIndex
        ];
      if (entry) {
        entry.description = normalizeString(description);
      }
    }),

  addEmptyParameterListBitmapEntry: (dataPointIndex, paramIndex) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
      if (param && "bitmap" in param.dataType) {
        const bitmapType = param.dataType.bitmap;
        const entries = ensureArray(bitmapType.bitmapEntry, () => []);
        entries.push({ literal: "", hexMask: "" });
        bitmapType.bitmapEntry = entries;
      }
    }),
});
