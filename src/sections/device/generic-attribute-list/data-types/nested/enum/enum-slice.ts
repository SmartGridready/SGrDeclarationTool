import {
  EnumMapProduct,
  EnumEntryProductRecord,
  DeviceFrame,
  GenericAttributeProductEnd,
} from "@/models";
import {
  createDataTypeProductEnumSlice,
  DataTypeProductEnumSlice,
} from "@/sections/shared/data-type-product/enum/enum-slice";

export interface GenericAttributeListNestedEnumSlice {
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
  addEmptyGenericAttributeListNestedEnumEntry: (
    elementIndex: number,
    nestedElementIndex: number
  ) => void;
}

/**
 * Creates a generic attribute list nested enum slice that works with any store state.
 * Uses the shared createDataTypeProductEnumSlice internally for consistency.
 */
export function createGenericAttributeListNestedEnumSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): GenericAttributeListNestedEnumSlice {
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
  ): DataTypeProductEnumSlice => {
    return createDataTypeProductEnumSlice(
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
    setGenericAttributeListNestedEnumDataType: (elementIndex, nestedElementIndex, enumMap) =>
      getSliceForIndex(elementIndex, nestedElementIndex).setEnumDataType(enumMap),

    addGenericAttributeListNestedEnumEntry: (elementIndex, nestedElementIndex, entry) =>
      getSliceForIndex(elementIndex, nestedElementIndex).addEnumEntry(entry),

    removeGenericAttributeListNestedEnumEntry: (elementIndex, nestedElementIndex, entryIndex) =>
      getSliceForIndex(elementIndex, nestedElementIndex).removeEnumEntry(entryIndex),

    updateGenericAttributeListNestedEnumEntryLiteral: (
      elementIndex,
      nestedElementIndex,
      entryIndex,
      literal
    ) =>
      getSliceForIndex(elementIndex, nestedElementIndex).updateEnumEntryLiteral(
        entryIndex,
        literal
      ),

    updateGenericAttributeListNestedEnumEntryOrdinal: (
      elementIndex,
      nestedElementIndex,
      entryIndex,
      ordinal
    ) =>
      getSliceForIndex(elementIndex, nestedElementIndex).updateEnumEntryOrdinal(
        entryIndex,
        ordinal
      ),

    updateGenericAttributeListNestedEnumEntryDescription: (
      elementIndex,
      nestedElementIndex,
      entryIndex,
      description
    ) =>
      getSliceForIndex(elementIndex, nestedElementIndex).updateEnumEntryDescription(
        entryIndex,
        description
      ),

    updateGenericAttributeListNestedEnumHexMask: (elementIndex, nestedElementIndex, hexMask) =>
      getSliceForIndex(elementIndex, nestedElementIndex).updateEnumHexMask(hexMask),

    addEmptyGenericAttributeListNestedEnumEntry: (elementIndex, nestedElementIndex) =>
      getSliceForIndex(elementIndex, nestedElementIndex).addEmptyEnumEntry(),
  };
}
