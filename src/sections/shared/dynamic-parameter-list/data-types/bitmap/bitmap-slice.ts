import {
  BitmapProduct,
  BitmapEntryProduct,
  DataTypeProduct,
  DynamicParameterDescriptionList,
} from "@/models";
import {
  createDataTypeProductBitmapSlice,
  DataTypeProductBitmapSlice,
} from "@/sections/shared/data-type-product/bitmap/bitmap-slice";

export interface DynamicParameterListBitmapSlice {
  setParameterListBitmapDataType: (
    dataPointIndex: number,
    paramIndex: number,
    bitmap: BitmapProduct
  ) => void;
  addParameterListBitmapEntry: (
    dataPointIndex: number,
    paramIndex: number,
    entry: BitmapEntryProduct
  ) => void;
  removeParameterListBitmapEntry: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number
  ) => void;
  updateParameterListBitmapEntryLiteral: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateParameterListBitmapEntryHexMask: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    hexMask: string
  ) => void;
  updateParameterListBitmapEntryDescription: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  addEmptyParameterListBitmapEntry: (dataPointIndex: number, paramIndex: number) => void;
}

/**
 * Creates a dynamic parameter list bitmap slice that works with any store state.
 * Uses the shared createDataTypeProductBitmapSlice internally for consistency.
 */
export function createDynamicParameterListBitmapSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getParameterList: (
    state: TState,
    dataPointIndex: number
  ) => DynamicParameterDescriptionList | undefined
): DynamicParameterListBitmapSlice {
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
  ): DataTypeProductBitmapSlice => {
    return createDataTypeProductBitmapSlice(
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
    setParameterListBitmapDataType: (dataPointIndex, paramIndex, bitmap) =>
      getSliceForIndices(dataPointIndex, paramIndex).setBitmapDataType(bitmap),

    addParameterListBitmapEntry: (dataPointIndex, paramIndex, entry) =>
      getSliceForIndices(dataPointIndex, paramIndex).addBitmapEntry(entry),

    removeParameterListBitmapEntry: (dataPointIndex, paramIndex, entryIndex) =>
      getSliceForIndices(dataPointIndex, paramIndex).removeBitmapEntry(entryIndex),

    updateParameterListBitmapEntryLiteral: (dataPointIndex, paramIndex, entryIndex, literal) =>
      getSliceForIndices(dataPointIndex, paramIndex).updateBitmapEntryLiteral(entryIndex, literal),

    updateParameterListBitmapEntryHexMask: (dataPointIndex, paramIndex, entryIndex, hexMask) =>
      getSliceForIndices(dataPointIndex, paramIndex).updateBitmapEntryHexMask(entryIndex, hexMask),

    updateParameterListBitmapEntryDescription: (
      dataPointIndex,
      paramIndex,
      entryIndex,
      description
    ) =>
      getSliceForIndices(dataPointIndex, paramIndex).updateBitmapEntryDescription(
        entryIndex,
        description
      ),

    addEmptyParameterListBitmapEntry: (dataPointIndex, paramIndex) =>
      getSliceForIndices(dataPointIndex, paramIndex).addEmptyBitmapEntry(),
  };
}
