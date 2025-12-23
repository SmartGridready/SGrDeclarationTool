import {
  EnumMapProduct,
  EnumEntryProductRecord,
  DataTypeProduct,
  DynamicParameterDescriptionList,
} from "@/models";
import {
  createDataTypeProductEnumSlice,
  DataTypeProductEnumSlice,
} from "@/sections/shared/data-type-product/enum/enum-slice";

export interface DynamicParameterListEnumSlice {
  setParameterListEnumDataType: (
    dataPointIndex: number,
    paramIndex: number,
    enumMap: EnumMapProduct
  ) => void;
  addParameterListEnumEntry: (
    dataPointIndex: number,
    paramIndex: number,
    entry: EnumEntryProductRecord
  ) => void;
  removeParameterListEnumEntry: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number
  ) => void;
  updateParameterListEnumEntryLiteral: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateParameterListEnumEntryOrdinal: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    ordinal: number | undefined
  ) => void;
  updateParameterListEnumEntryDescription: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  updateParameterListEnumHexMask: (
    dataPointIndex: number,
    paramIndex: number,
    hexMask: string | undefined
  ) => void;
  addEmptyParameterListEnumEntry: (dataPointIndex: number, paramIndex: number) => void;
}

/**
 * Creates a dynamic parameter list enum slice that works with any store state.
 * Uses the shared createDataTypeProductEnumSlice internally for consistency.
 */
export function createDynamicParameterListEnumSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getParameterList: (
    state: TState,
    dataPointIndex: number
  ) => DynamicParameterDescriptionList | undefined
): DynamicParameterListEnumSlice {
  const getParameter = (
    state: TState,
    dataPointIndex: number,
    paramIndex: number
  ): { dataType: DataTypeProduct } | undefined => {
    const paramList = getParameterList(state, dataPointIndex);
    return paramList?.parameterListElement?.[paramIndex];
  };

  // Helper function to get a slice bound to specific dataPointIndex and paramIndex
  const getSliceForIndices = (
    dataPointIndex: number,
    paramIndex: number
  ): DataTypeProductEnumSlice => {
    return createDataTypeProductEnumSlice(
      set,
      (state) => getParameter(state, dataPointIndex, paramIndex)?.dataType,
      (state, dataType) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        if (param) {
          param.dataType = dataType;
        }
      }
    );
  };

  return {
    setParameterListEnumDataType: (dataPointIndex, paramIndex, enumMap) =>
      getSliceForIndices(dataPointIndex, paramIndex).setEnumDataType(enumMap),

    addParameterListEnumEntry: (dataPointIndex, paramIndex, entry) =>
      getSliceForIndices(dataPointIndex, paramIndex).addEnumEntry(entry),

    removeParameterListEnumEntry: (dataPointIndex, paramIndex, entryIndex) =>
      getSliceForIndices(dataPointIndex, paramIndex).removeEnumEntry(entryIndex),

    updateParameterListEnumEntryLiteral: (dataPointIndex, paramIndex, entryIndex, literal) =>
      getSliceForIndices(dataPointIndex, paramIndex).updateEnumEntryLiteral(entryIndex, literal),

    updateParameterListEnumEntryOrdinal: (dataPointIndex, paramIndex, entryIndex, ordinal) =>
      getSliceForIndices(dataPointIndex, paramIndex).updateEnumEntryOrdinal(entryIndex, ordinal),

    updateParameterListEnumEntryDescription: (
      dataPointIndex,
      paramIndex,
      entryIndex,
      description
    ) =>
      getSliceForIndices(dataPointIndex, paramIndex).updateEnumEntryDescription(
        entryIndex,
        description
      ),

    updateParameterListEnumHexMask: (dataPointIndex, paramIndex, hexMask) =>
      getSliceForIndices(dataPointIndex, paramIndex).updateEnumHexMask(hexMask),

    addEmptyParameterListEnumEntry: (dataPointIndex, paramIndex) =>
      getSliceForIndices(dataPointIndex, paramIndex).addEmptyEnumEntry(),
  };
}
