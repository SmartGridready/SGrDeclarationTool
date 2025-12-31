import {
  EnumMapProduct,
  EnumEntryProductRecord,
  GenericAttributeProduct,
  GenericAttributeListProductEnd,
} from "@/models";
import {
  createDataTypeProductEnumSlice,
  DataTypeProductEnumSlice,
} from "@/sections/shared/data-type-product/enum/enum-slice";

export interface GenericAttributeListProductNestedEnumSlice {
  setGenericAttributeListNestedEnumDataType: (
    elementIndex: number,
    nestedElementIndex: number,
    enumMap: EnumMapProduct
  ) => void;
  addGenericAttributeListNestedEnumEntry: (
    elementIndex: number,
    nestedElementIndex: number,
    entry: EnumEntryProductRecord
  ) => void;
  removeGenericAttributeListNestedEnumEntry: (
    elementIndex: number,
    nestedElementIndex: number,
    entryIndex: number
  ) => void;
  updateGenericAttributeListNestedEnumEntryLiteral: (
    elementIndex: number,
    nestedElementIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateGenericAttributeListNestedEnumEntryOrdinal: (
    elementIndex: number,
    nestedElementIndex: number,
    entryIndex: number,
    ordinal: number | undefined
  ) => void;
  updateGenericAttributeListNestedEnumEntryDescription: (
    elementIndex: number,
    nestedElementIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  updateGenericAttributeListNestedEnumHexMask: (
    elementIndex: number,
    nestedElementIndex: number,
    hexMask: string | undefined
  ) => void;
  addEmptyGenericAttributeListNestedEnumEntry: (elementIndex: number, nestedElementIndex: number) => void;
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
 * Creates a generic attribute list product nested enum slice that works with any store state.
 * Uses the shared createDataTypeProductEnumSlice internally for consistency.
 */
export function createGenericAttributeListProductNestedEnumSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getAttribute: (state: TState, elementIndex: number) => GenericAttributeProduct | undefined
): GenericAttributeListProductNestedEnumSlice {
  // Helper function to get a slice bound to specific element and nested element indices
  const getSliceForIndices = (elementIndex: number, nestedElementIndex: number): DataTypeProductEnumSlice => {
    return createDataTypeProductEnumSlice(
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
    setGenericAttributeListNestedEnumDataType: (elementIndex, nestedElementIndex, enumMap) =>
      getSliceForIndices(elementIndex, nestedElementIndex).setEnumDataType(enumMap),

    addGenericAttributeListNestedEnumEntry: (elementIndex, nestedElementIndex, entry) =>
      getSliceForIndices(elementIndex, nestedElementIndex).addEnumEntry(entry),

    removeGenericAttributeListNestedEnumEntry: (elementIndex, nestedElementIndex, entryIndex) =>
      getSliceForIndices(elementIndex, nestedElementIndex).removeEnumEntry(entryIndex),

    updateGenericAttributeListNestedEnumEntryLiteral: (elementIndex, nestedElementIndex, entryIndex, literal) =>
      getSliceForIndices(elementIndex, nestedElementIndex).updateEnumEntryLiteral(entryIndex, literal),

    updateGenericAttributeListNestedEnumEntryOrdinal: (elementIndex, nestedElementIndex, entryIndex, ordinal) =>
      getSliceForIndices(elementIndex, nestedElementIndex).updateEnumEntryOrdinal(entryIndex, ordinal),

    updateGenericAttributeListNestedEnumEntryDescription: (elementIndex, nestedElementIndex, entryIndex, description) =>
      getSliceForIndices(elementIndex, nestedElementIndex).updateEnumEntryDescription(entryIndex, description),

    updateGenericAttributeListNestedEnumHexMask: (elementIndex, nestedElementIndex, hexMask) =>
      getSliceForIndices(elementIndex, nestedElementIndex).updateEnumHexMask(hexMask),

    addEmptyGenericAttributeListNestedEnumEntry: (elementIndex, nestedElementIndex) =>
      getSliceForIndices(elementIndex, nestedElementIndex).addEmptyEnumEntry(),
  };
}
