import { BitmapProduct, BitmapEntryProduct, DataTypeProduct } from "@/models";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface DataTypeProductBitmapSlice {
  setBitmapDataType: (bitmap: BitmapProduct) => void;
  addBitmapEntry: (entry: BitmapEntryProduct) => void;
  removeBitmapEntry: (entryIndex: number) => void;
  updateBitmapEntryLiteral: (entryIndex: number, literal: string) => void;
  updateBitmapEntryHexMask: (entryIndex: number, hexMask: string) => void;
  updateBitmapEntryDescription: (entryIndex: number, description: string | undefined) => void;
  addEmptyBitmapEntry: () => void;
}

/**
 * Creates a generic bitmap slice for DataTypeProduct that works with any store state.
 * @param set - The Zustand set function
 * @param getDataType - Function to get the DataTypeProduct from the store state
 * @param setDataType - Function to set the DataTypeProduct in the store state
 */
export function createDataTypeProductBitmapSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataType: (state: TState) => DataTypeProduct | undefined,
  setDataType: (state: TState, dataType: DataTypeProduct) => void
): DataTypeProductBitmapSlice {
  return {
    setBitmapDataType: (bitmap) =>
      set((state) => {
        setDataType(state, { bitmap: bitmap });
      }),

    addBitmapEntry: (entry) =>
      set((state) => {
        const dataType = getDataType(state);
        if (dataType && "bitmap" in dataType) {
          const entries = ensureArray(dataType.bitmap.bitmapEntry, () => []);
          entries.push(entry);
          dataType.bitmap.bitmapEntry = entries;
        }
      }),

    removeBitmapEntry: (entryIndex) =>
      set((state) => {
        const dataType = getDataType(state);
        if (dataType && "bitmap" in dataType) {
          const bitmapType = dataType.bitmap;
          removeArrayItem(bitmapType.bitmapEntry, entryIndex, () => {
            bitmapType.bitmapEntry = [];
          });
        }
      }),

    updateBitmapEntryLiteral: (entryIndex, literal) =>
      set((state) => {
        const dataType = getDataType(state);
        const entry = dataType && "bitmap" in dataType && dataType.bitmap.bitmapEntry?.[entryIndex];
        if (entry) entry.literal = literal;
      }),

    updateBitmapEntryHexMask: (entryIndex, hexMask) =>
      set((state) => {
        const dataType = getDataType(state);
        const entry = dataType && "bitmap" in dataType && dataType.bitmap.bitmapEntry?.[entryIndex];
        if (entry) entry.hexMask = hexMask;
      }),

    updateBitmapEntryDescription: (entryIndex, description) =>
      set((state) => {
        const dataType = getDataType(state);
        const entry = dataType && "bitmap" in dataType && dataType.bitmap.bitmapEntry?.[entryIndex];
        if (entry) entry.description = description;
      }),

    addEmptyBitmapEntry: () =>
      set((state) => {
        const dataType = getDataType(state);
        if (dataType && "bitmap" in dataType) {
          const entries = ensureArray(dataType.bitmap.bitmapEntry, () => []);
          entries.push({ literal: "", hexMask: "" });
          dataType.bitmap.bitmapEntry = entries;
        }
      }),
  };
}
