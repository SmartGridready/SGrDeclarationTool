import { BitmapProduct, BitmapEntryProduct, GenericAttributeProduct, GenericAttributeListProductEnd } from "@/models";
import {
  createDataTypeProductBitmapSlice,
  DataTypeProductBitmapSlice,
} from "@/sections/shared/data-type-product/bitmap/bitmap-slice";

export interface GenericAttributeListProductNestedBitmapSlice {
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
  addEmptyGenericAttributeListNestedBitmapEntry: (elementIndex: number, nestedElementIndex: number) => void;
}

/**
 * Type guard to check if attribute is nested
 */
function isNestedGenericAttribute(
  attr: GenericAttributeProduct
): attr is GenericAttributeProduct & { genericAttributeList: GenericAttributeListProductEnd } {
  return "genericAttributeList" in attr;
}

/**
 * Creates a generic attribute list product nested bitmap slice that works with any store state.
 * Uses the shared createDataTypeProductBitmapSlice internally for consistency.
 */
export function createGenericAttributeListProductNestedBitmapSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getAttribute: (state: TState, elementIndex: number) => GenericAttributeProduct | undefined
): GenericAttributeListProductNestedBitmapSlice {
  // Helper function to get a slice bound to specific element and nested element indices
  const getSliceForIndices = (elementIndex: number, nestedElementIndex: number): DataTypeProductBitmapSlice => {
    return createDataTypeProductBitmapSlice(
      set,
      (state) => {
        const attr = getAttribute(state, elementIndex);
        if (attr && isNestedGenericAttribute(attr)) {
          return attr.genericAttributeList.genericAttributeListElement?.[nestedElementIndex]?.dataType;
        }
        return undefined;
      },
      (state, dataType) => {
        const attr = getAttribute(state, elementIndex);
        if (attr && isNestedGenericAttribute(attr)) {
          const nestedElement = attr.genericAttributeList.genericAttributeListElement?.[nestedElementIndex];
          if (nestedElement) {
            nestedElement.dataType = dataType;
          }
        }
      }
    );
  };

  return {
    setGenericAttributeListNestedBitmapDataType: (elementIndex, nestedElementIndex, bitmap) =>
      getSliceForIndices(elementIndex, nestedElementIndex).setBitmapDataType(bitmap),

    addGenericAttributeListNestedBitmapEntry: (elementIndex, nestedElementIndex, entry) =>
      getSliceForIndices(elementIndex, nestedElementIndex).addBitmapEntry(entry),

    removeGenericAttributeListNestedBitmapEntry: (elementIndex, nestedElementIndex, entryIndex) =>
      getSliceForIndices(elementIndex, nestedElementIndex).removeBitmapEntry(entryIndex),

    updateGenericAttributeListNestedBitmapEntryLiteral: (elementIndex, nestedElementIndex, entryIndex, literal) =>
      getSliceForIndices(elementIndex, nestedElementIndex).updateBitmapEntryLiteral(entryIndex, literal),

    updateGenericAttributeListNestedBitmapEntryHexMask: (elementIndex, nestedElementIndex, entryIndex, hexMask) =>
      getSliceForIndices(elementIndex, nestedElementIndex).updateBitmapEntryHexMask(entryIndex, hexMask),

    updateGenericAttributeListNestedBitmapEntryDescription: (
      elementIndex,
      nestedElementIndex,
      entryIndex,
      description
    ) => getSliceForIndices(elementIndex, nestedElementIndex).updateBitmapEntryDescription(entryIndex, description),

    addEmptyGenericAttributeListNestedBitmapEntry: (elementIndex, nestedElementIndex) =>
      getSliceForIndices(elementIndex, nestedElementIndex).addEmptyBitmapEntry(),
  };
}
