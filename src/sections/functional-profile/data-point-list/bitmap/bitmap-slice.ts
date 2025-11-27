import {
  BitmapFunctionalProfile,
  BitmapEntryFunctionalProfile,
} from "@/models";
import {
  SetState,
  getDataPoint,
  ensureArray,
  removeArrayItem,
} from "@/sections/shared/utils/slice-utils";

export interface BitmapSlice {
  setBitmapDataType: (index: number, bitmap: BitmapFunctionalProfile) => void;
  addBitmapEntry: (
    dataPointIndex: number,
    entry: BitmapEntryFunctionalProfile
  ) => void;
  removeBitmapEntry: (dataPointIndex: number, entryIndex: number) => void;
  updateBitmapEntryLiteral: (
    dataPointIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateBitmapEntryDescription: (
    dataPointIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  addEmptyBitmapEntry: (dataPointIndex: number) => void;
}

export const createBitmapSlice = (set: SetState): BitmapSlice => ({
  setBitmapDataType: (index, bitmap) =>
    set((state) => {
      const dp = getDataPoint(state, index);
      if (dp) {
        dp.dataPoint.dataType = { bitmap: bitmap };
      }
    }),

  addBitmapEntry: (dataPointIndex, entry) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp && "bitmap" in dp.dataPoint.dataType) {
        const bitmapType = dp.dataPoint.dataType.bitmap;
        const entries = ensureArray(bitmapType.bitmapEntry, () => []);
        entries.push(entry);
        bitmapType.bitmapEntry = entries;
      }
    }),

  removeBitmapEntry: (dataPointIndex, entryIndex) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp && "bitmap" in dp.dataPoint.dataType) {
        const bitmapType = dp.dataPoint.dataType.bitmap;
        removeArrayItem(bitmapType.bitmapEntry, entryIndex, () => {
          bitmapType.bitmapEntry = undefined;
        });
      }
    }),

  updateBitmapEntryLiteral: (dataPointIndex, entryIndex, literal) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const entry =
        dp?.dataPoint.dataType &&
        "bitmap" in dp.dataPoint.dataType &&
        dp.dataPoint.dataType.bitmap.bitmapEntry?.[entryIndex];
      if (entry) {
        entry.literal = literal;
      }
    }),

  updateBitmapEntryDescription: (dataPointIndex, entryIndex, description) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const entry =
        dp?.dataPoint.dataType &&
        "bitmap" in dp.dataPoint.dataType &&
        dp.dataPoint.dataType.bitmap.bitmapEntry?.[entryIndex];
      if (entry) {
        entry.description = description;
      }
    }),

  addEmptyBitmapEntry: (dataPointIndex) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp && "bitmap" in dp.dataPoint.dataType) {
        const bitmapType = dp.dataPoint.dataType.bitmap;
        const entries = ensureArray(bitmapType.bitmapEntry, () => []);
        entries.push({ literal: "" });
        bitmapType.bitmapEntry = entries;
      }
    }),
});
