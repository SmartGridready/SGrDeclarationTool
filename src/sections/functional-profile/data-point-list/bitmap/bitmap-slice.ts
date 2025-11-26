import {
  FunctionalProfileFrame,
  BitmapFunctionalProfile,
  BitmapEntryFunctionalProfile,
} from "@/models";

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

type StoreState = {
  profile?: FunctionalProfileFrame;
};

type SetState = (fn: (state: StoreState) => void) => void;

export const createBitmapSlice = (set: SetState): BitmapSlice => ({
  setBitmapDataType: (index, bitmap) =>
    set((state) => {
      const dp = state.profile?.dataPointList?.dataPointListElement?.[index];
      if (dp) {
        dp.dataPoint.dataType = { bitmap: bitmap };
      }
    }),

  addBitmapEntry: (dataPointIndex, entry) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
      if (dp && "bitmap" in dp.dataPoint.dataType) {
        if (!dp.dataPoint.dataType.bitmap.bitmapEntry) {
          dp.dataPoint.dataType.bitmap.bitmapEntry = [];
        }
        dp.dataPoint.dataType.bitmap.bitmapEntry.push(entry);
      }
    }),

  removeBitmapEntry: (dataPointIndex, entryIndex) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
      const entries = dp?.dataPoint.dataType;
      if (
        entries &&
        "bitmap" in entries &&
        entries.bitmap.bitmapEntry &&
        entryIndex >= 0 &&
        entryIndex < entries.bitmap.bitmapEntry.length
      ) {
        entries.bitmap.bitmapEntry.splice(entryIndex, 1);
        if (entries.bitmap.bitmapEntry.length === 0) {
          entries.bitmap.bitmapEntry = undefined;
        }
      }
    }),

  updateBitmapEntryLiteral: (dataPointIndex, entryIndex, literal) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
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
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
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
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
      if (dp && "bitmap" in dp.dataPoint.dataType) {
        if (!dp.dataPoint.dataType.bitmap.bitmapEntry) {
          dp.dataPoint.dataType.bitmap.bitmapEntry = [];
        }
        dp.dataPoint.dataType.bitmap.bitmapEntry.push({
          literal: "",
        });
      }
    }),
});
