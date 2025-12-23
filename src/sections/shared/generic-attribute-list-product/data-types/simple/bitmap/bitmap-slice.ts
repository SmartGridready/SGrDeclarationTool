import { BitmapProduct, BitmapEntryProduct, GenericAttributeProduct } from "@/models";
import {
  createDataTypeProductBitmapSlice,
  DataTypeProductBitmapSlice,
} from "@/sections/shared/data-type-product/bitmap/bitmap-slice";

export interface GenericAttributeListProductSimpleBitmapSlice {
  setGenericAttributeListSimpleBitmapDataType: (
    elementIndex: number,
    bitmap: BitmapProduct
  ) => void;
  addGenericAttributeListSimpleBitmapEntry: (
    elementIndex: number,
    entry: BitmapEntryProduct
  ) => void;
  removeGenericAttributeListSimpleBitmapEntry: (elementIndex: number, entryIndex: number) => void;
  updateGenericAttributeListSimpleBitmapEntryLiteral: (
    elementIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateGenericAttributeListSimpleBitmapEntryHexMask: (
    elementIndex: number,
    entryIndex: number,
    hexMask: string
  ) => void;
  updateGenericAttributeListSimpleBitmapEntryDescription: (
    elementIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  addEmptyGenericAttributeListSimpleBitmapEntry: (elementIndex: number) => void;
}

/**
 * Creates a generic attribute list product simple bitmap slice that works with any store state.
 * Uses the shared createDataTypeProductBitmapSlice internally for consistency.
 */
export function createGenericAttributeListProductSimpleBitmapSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getAttribute: (state: TState, elementIndex: number) => GenericAttributeProduct | undefined
): GenericAttributeListProductSimpleBitmapSlice {
  // Helper function to get a slice bound to specific elementIndex
  const getSliceForIndex = (elementIndex: number): DataTypeProductBitmapSlice => {
    return createDataTypeProductBitmapSlice(
      set,
      (state) => {
        const attr = getAttribute(state, elementIndex);
        return attr && "dataType" in attr ? attr.dataType : undefined;
      },
      (state, dataType) => {
        const attr = getAttribute(state, elementIndex);
        if (attr && "dataType" in attr) {
          attr.dataType = dataType;
        }
      }
    );
  };

  return {
    setGenericAttributeListSimpleBitmapDataType: (elementIndex, bitmap) =>
      getSliceForIndex(elementIndex).setBitmapDataType(bitmap),

    addGenericAttributeListSimpleBitmapEntry: (elementIndex, entry) =>
      getSliceForIndex(elementIndex).addBitmapEntry(entry),

    removeGenericAttributeListSimpleBitmapEntry: (elementIndex, entryIndex) =>
      getSliceForIndex(elementIndex).removeBitmapEntry(entryIndex),

    updateGenericAttributeListSimpleBitmapEntryLiteral: (elementIndex, entryIndex, literal) =>
      getSliceForIndex(elementIndex).updateBitmapEntryLiteral(entryIndex, literal),

    updateGenericAttributeListSimpleBitmapEntryHexMask: (elementIndex, entryIndex, hexMask) =>
      getSliceForIndex(elementIndex).updateBitmapEntryHexMask(entryIndex, hexMask),

    updateGenericAttributeListSimpleBitmapEntryDescription: (
      elementIndex,
      entryIndex,
      description
    ) => getSliceForIndex(elementIndex).updateBitmapEntryDescription(entryIndex, description),

    addEmptyGenericAttributeListSimpleBitmapEntry: (elementIndex) =>
      getSliceForIndex(elementIndex).addEmptyBitmapEntry(),
  };
}
