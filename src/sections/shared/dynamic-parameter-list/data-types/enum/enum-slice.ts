import { EnumMapProduct, EnumEntryProductRecord, DataTypeProduct, DynamicParameterDescriptionList } from "@/models";
import {
  createDataTypeProductEnumSlice,
  DataTypeProductEnumSlice,
} from "@/sections/shared/data-type-product/enum/enum-slice";

export interface DynamicParameterListEnumSlice {
  setParameterListEnumDataType: (listIndex: number, paramIndex: number, enumMap: EnumMapProduct) => void;
  addParameterListEnumEntry: (listIndex: number, paramIndex: number, entry: EnumEntryProductRecord) => void;
  removeParameterListEnumEntry: (listIndex: number, paramIndex: number, entryIndex: number) => void;
  updateParameterListEnumEntryLiteral: (
    listIndex: number,
    paramIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateParameterListEnumEntryOrdinal: (
    listIndex: number,
    paramIndex: number,
    entryIndex: number,
    ordinal: number | undefined
  ) => void;
  updateParameterListEnumEntryDescription: (
    listIndex: number,
    paramIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  updateParameterListEnumHexMask: (listIndex: number, paramIndex: number, hexMask: string | undefined) => void;
  addEmptyParameterListEnumEntry: (listIndex: number, paramIndex: number) => void;
}

/**
 * Creates a dynamic parameter list enum slice that works with any store state.
 * Uses the shared createDataTypeProductEnumSlice internally for consistency.
 */
export function createDynamicParameterListEnumSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getParameterList: (state: TState, listIndex: number) => DynamicParameterDescriptionList | undefined
): DynamicParameterListEnumSlice {
  const getParameter = (
    state: TState,
    listIndex: number,
    paramIndex: number
  ): { dataType: DataTypeProduct } | undefined => {
    const paramList = getParameterList(state, listIndex);
    return paramList?.parameterListElement?.[paramIndex];
  };

  // Helper function to get a slice bound to specific listIndex and paramIndex
  const getSliceForIndices = (listIndex: number, paramIndex: number): DataTypeProductEnumSlice => {
    return createDataTypeProductEnumSlice(
      set,
      (state) => getParameter(state, listIndex, paramIndex)?.dataType,
      (state, dataType) => {
        const param = getParameter(state, listIndex, paramIndex);
        if (param) {
          param.dataType = dataType;
        }
      }
    );
  };

  return {
    setParameterListEnumDataType: (listIndex, paramIndex, enumMap) =>
      getSliceForIndices(listIndex, paramIndex).setEnumDataType(enumMap),

    addParameterListEnumEntry: (listIndex, paramIndex, entry) =>
      getSliceForIndices(listIndex, paramIndex).addEnumEntry(entry),

    removeParameterListEnumEntry: (listIndex, paramIndex, entryIndex) =>
      getSliceForIndices(listIndex, paramIndex).removeEnumEntry(entryIndex),

    updateParameterListEnumEntryLiteral: (listIndex, paramIndex, entryIndex, literal) =>
      getSliceForIndices(listIndex, paramIndex).updateEnumEntryLiteral(entryIndex, literal),

    updateParameterListEnumEntryOrdinal: (listIndex, paramIndex, entryIndex, ordinal) =>
      getSliceForIndices(listIndex, paramIndex).updateEnumEntryOrdinal(entryIndex, ordinal),

    updateParameterListEnumEntryDescription: (listIndex, paramIndex, entryIndex, description) =>
      getSliceForIndices(listIndex, paramIndex).updateEnumEntryDescription(entryIndex, description),

    updateParameterListEnumHexMask: (listIndex, paramIndex, hexMask) =>
      getSliceForIndices(listIndex, paramIndex).updateEnumHexMask(hexMask),

    addEmptyParameterListEnumEntry: (listIndex, paramIndex) =>
      getSliceForIndices(listIndex, paramIndex).addEmptyEnumEntry(),
  };
}
