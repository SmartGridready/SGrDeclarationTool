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
    listIndex: number,
    paramIndex: number,
    bitmap: BitmapProduct
  ) => void;
  addParameterListBitmapEntry: (
    listIndex: number,
    paramIndex: number,
    entry: BitmapEntryProduct
  ) => void;
  removeParameterListBitmapEntry: (
    listIndex: number,
    paramIndex: number,
    entryIndex: number
  ) => void;
  updateParameterListBitmapEntryLiteral: (
    listIndex: number,
    paramIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateParameterListBitmapEntryHexMask: (
    listIndex: number,
    paramIndex: number,
    entryIndex: number,
    hexMask: string
  ) => void;
  updateParameterListBitmapEntryDescription: (
    listIndex: number,
    paramIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  addEmptyParameterListBitmapEntry: (listIndex: number, paramIndex: number) => void;
}

/**
 * Creates a dynamic parameter list bitmap slice that works with any store state.
 * Uses the shared createDataTypeProductBitmapSlice internally for consistency.
 */
export function createDynamicParameterListBitmapSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getParameterList: (
    state: TState,
    listIndex: number
  ) => DynamicParameterDescriptionList | undefined
): DynamicParameterListBitmapSlice {
  const getParameter = (
    state: TState,
    listIndex: number,
    paramIndex: number
  ): { dataType: DataTypeProduct } | undefined => {
    const paramList = getParameterList(state, listIndex);
    return paramList?.parameterListElement?.[paramIndex];
  };

  // Helper function to get a slice bound to specific listIndex and paramIndex
  const getSliceForIndices = (
    listIndex: number,
    paramIndex: number
  ): DataTypeProductBitmapSlice => {
    return createDataTypeProductBitmapSlice(
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
    setParameterListBitmapDataType: (listIndex, paramIndex, bitmap) =>
      getSliceForIndices(listIndex, paramIndex).setBitmapDataType(bitmap),

    addParameterListBitmapEntry: (listIndex, paramIndex, entry) =>
      getSliceForIndices(listIndex, paramIndex).addBitmapEntry(entry),

    removeParameterListBitmapEntry: (listIndex, paramIndex, entryIndex) =>
      getSliceForIndices(listIndex, paramIndex).removeBitmapEntry(entryIndex),

    updateParameterListBitmapEntryLiteral: (listIndex, paramIndex, entryIndex, literal) =>
      getSliceForIndices(listIndex, paramIndex).updateBitmapEntryLiteral(entryIndex, literal),

    updateParameterListBitmapEntryHexMask: (listIndex, paramIndex, entryIndex, hexMask) =>
      getSliceForIndices(listIndex, paramIndex).updateBitmapEntryHexMask(entryIndex, hexMask),

    updateParameterListBitmapEntryDescription: (listIndex, paramIndex, entryIndex, description) =>
      getSliceForIndices(listIndex, paramIndex).updateBitmapEntryDescription(
        entryIndex,
        description
      ),

    addEmptyParameterListBitmapEntry: (listIndex, paramIndex) =>
      getSliceForIndices(listIndex, paramIndex).addEmptyBitmapEntry(),
  };
}
