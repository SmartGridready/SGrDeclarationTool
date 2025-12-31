import { EnumMapProduct, EnumEntryProductRecord, GenericAttributeProduct } from "@/models";
import {
  createDataTypeProductEnumSlice,
  DataTypeProductEnumSlice,
} from "@/sections/shared/data-type-product/enum/enum-slice";

export interface GenericAttributeListProductSimpleEnumSlice {
  setGenericAttributeListSimpleEnumDataType: (elementIndex: number, enumMap: EnumMapProduct) => void;
  addGenericAttributeListSimpleEnumEntry: (elementIndex: number, entry: EnumEntryProductRecord) => void;
  removeGenericAttributeListSimpleEnumEntry: (elementIndex: number, entryIndex: number) => void;
  updateGenericAttributeListSimpleEnumEntryLiteral: (elementIndex: number, entryIndex: number, literal: string) => void;
  updateGenericAttributeListSimpleEnumEntryOrdinal: (
    elementIndex: number,
    entryIndex: number,
    ordinal: number | undefined
  ) => void;
  updateGenericAttributeListSimpleEnumEntryDescription: (
    elementIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  updateGenericAttributeListSimpleEnumHexMask: (elementIndex: number, hexMask: string | undefined) => void;
  addEmptyGenericAttributeListSimpleEnumEntry: (elementIndex: number) => void;
}

/**
 * Creates a generic attribute list product simple enum slice that works with any store state.
 * Uses the shared createDataTypeProductEnumSlice internally for consistency.
 */
export function createGenericAttributeListProductSimpleEnumSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getAttribute: (state: TState, elementIndex: number) => GenericAttributeProduct | undefined
): GenericAttributeListProductSimpleEnumSlice {
  // Helper function to get a slice bound to specific elementIndex
  const getSliceForIndex = (elementIndex: number): DataTypeProductEnumSlice => {
    return createDataTypeProductEnumSlice(
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
    setGenericAttributeListSimpleEnumDataType: (elementIndex, enumMap) =>
      getSliceForIndex(elementIndex).setEnumDataType(enumMap),

    addGenericAttributeListSimpleEnumEntry: (elementIndex, entry) => getSliceForIndex(elementIndex).addEnumEntry(entry),

    removeGenericAttributeListSimpleEnumEntry: (elementIndex, entryIndex) =>
      getSliceForIndex(elementIndex).removeEnumEntry(entryIndex),

    updateGenericAttributeListSimpleEnumEntryLiteral: (elementIndex, entryIndex, literal) =>
      getSliceForIndex(elementIndex).updateEnumEntryLiteral(entryIndex, literal),

    updateGenericAttributeListSimpleEnumEntryOrdinal: (elementIndex, entryIndex, ordinal) =>
      getSliceForIndex(elementIndex).updateEnumEntryOrdinal(entryIndex, ordinal),

    updateGenericAttributeListSimpleEnumEntryDescription: (elementIndex, entryIndex, description) =>
      getSliceForIndex(elementIndex).updateEnumEntryDescription(entryIndex, description),

    updateGenericAttributeListSimpleEnumHexMask: (elementIndex, hexMask) =>
      getSliceForIndex(elementIndex).updateEnumHexMask(hexMask),

    addEmptyGenericAttributeListSimpleEnumEntry: (elementIndex) => getSliceForIndex(elementIndex).addEmptyEnumEntry(),
  };
}
