import {
  BitmapProduct,
  BitmapEntryProduct,
  DeviceFrame,
  GenericAttributeProductEnd,
} from "@/models";
import {
  createDataTypeProductBitmapSlice,
  DataTypeProductBitmapSlice,
} from "@/sections/shared/data-type-product/bitmap/bitmap-slice";

export interface GenericAttributeListNestedBitmapSlice {
  setGenericAttributeListNestedBitmapDataType: (
    elementIndex: number,
    nestedElementIndex: number,
    bitmap: BitmapProduct
  ) => void;
  addGenericAttributeListNestedBitmapEntry: (
    elementIndex: number,
    nestedElementIndex: number,
    entry: BitmapEntryProduct
  ) => void;
  removeGenericAttributeListNestedBitmapEntry: (
    elementIndex: number,
    nestedElementIndex: number,
    entryIndex: number
  ) => void;
  updateGenericAttributeListNestedBitmapEntryLiteral: (
    elementIndex: number,
    nestedElementIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateGenericAttributeListNestedBitmapEntryHexMask: (
    elementIndex: number,
    nestedElementIndex: number,
    entryIndex: number,
    hexMask: string
  ) => void;
  updateGenericAttributeListNestedBitmapEntryDescription: (
    elementIndex: number,
    nestedElementIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  addEmptyGenericAttributeListNestedBitmapEntry: (
    elementIndex: number,
    nestedElementIndex: number
  ) => void;
}

/**
 * Creates a generic attribute list nested bitmap slice that works with any store state.
 * Uses the shared createDataTypeProductBitmapSlice internally for consistency.
 */
export function createGenericAttributeListNestedBitmapSlice<
  TState extends { device?: DeviceFrame },
>(set: (fn: (state: TState) => void) => void): GenericAttributeListNestedBitmapSlice {
  const getNestedAttribute = (
    state: TState,
    elementIndex: number,
    nestedElementIndex: number
  ): GenericAttributeProductEnd | undefined => {
    const attr = state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
    if (attr && "genericAttributeList" in attr) {
      return attr.genericAttributeList.genericAttributeListElement?.[nestedElementIndex];
    }
    return undefined;
  };

  // Helper function to get a slice bound to specific elementIndex and nestedElementIndex
  const getSliceForIndex = (
    elementIndex: number,
    nestedElementIndex: number
  ): DataTypeProductBitmapSlice => {
    return createDataTypeProductBitmapSlice(
      set,
      (state) => {
        const nestedAttr = getNestedAttribute(state, elementIndex, nestedElementIndex);
        return nestedAttr?.dataType;
      },
      (state, dataType) => {
        const nestedAttr = getNestedAttribute(state, elementIndex, nestedElementIndex);
        if (nestedAttr) {
          nestedAttr.dataType = dataType;
        }
      }
    );
  };

  return {
    setGenericAttributeListNestedBitmapDataType: (elementIndex, nestedElementIndex, bitmap) =>
      getSliceForIndex(elementIndex, nestedElementIndex).setBitmapDataType(bitmap),

    addGenericAttributeListNestedBitmapEntry: (elementIndex, nestedElementIndex, entry) =>
      getSliceForIndex(elementIndex, nestedElementIndex).addBitmapEntry(entry),

    removeGenericAttributeListNestedBitmapEntry: (elementIndex, nestedElementIndex, entryIndex) =>
      getSliceForIndex(elementIndex, nestedElementIndex).removeBitmapEntry(entryIndex),

    updateGenericAttributeListNestedBitmapEntryLiteral: (
      elementIndex,
      nestedElementIndex,
      entryIndex,
      literal
    ) =>
      getSliceForIndex(elementIndex, nestedElementIndex).updateBitmapEntryLiteral(
        entryIndex,
        literal
      ),

    updateGenericAttributeListNestedBitmapEntryHexMask: (
      elementIndex,
      nestedElementIndex,
      entryIndex,
      hexMask
    ) =>
      getSliceForIndex(elementIndex, nestedElementIndex).updateBitmapEntryHexMask(
        entryIndex,
        hexMask
      ),

    updateGenericAttributeListNestedBitmapEntryDescription: (
      elementIndex,
      nestedElementIndex,
      entryIndex,
      description
    ) =>
      getSliceForIndex(elementIndex, nestedElementIndex).updateBitmapEntryDescription(
        entryIndex,
        description
      ),

    addEmptyGenericAttributeListNestedBitmapEntry: (elementIndex, nestedElementIndex) =>
      getSliceForIndex(elementIndex, nestedElementIndex).addEmptyBitmapEntry(),
  };
}
