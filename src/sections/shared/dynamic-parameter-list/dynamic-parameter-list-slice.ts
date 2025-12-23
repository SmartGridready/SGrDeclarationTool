import { DataTypeProduct, DynamicParameterDescriptionList } from "@/models";
import { ensureArray, removeArrayItem, normalizeString } from "@/utils/slice-utils";
import {
  createDynamicParameterListEnumSlice,
  DynamicParameterListEnumSlice,
} from "@/sections/shared/dynamic-parameter-list/data-types/enum/enum-slice";
import {
  createDynamicParameterListBitmapSlice,
  DynamicParameterListBitmapSlice,
} from "@/sections/shared/dynamic-parameter-list/data-types/bitmap/bitmap-slice";
import {
  createDynamicParameterDescriptionsSlice,
  DynamicParameterDescriptionsSlice,
} from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-descriptions/parameter-descriptions-slice";

export interface DynamicParameterListSlice
  extends DynamicParameterListEnumSlice,
    DynamicParameterListBitmapSlice,
    DynamicParameterDescriptionsSlice {
  addParameterList: (dataPointIndex: number) => void;
  removeParameterList: (dataPointIndex: number) => void;
  addParameterListElement: (dataPointIndex: number) => void;
  removeParameterListElement: (dataPointIndex: number, paramIndex: number) => void;
  updateParameterListElementName: (
    dataPointIndex: number,
    paramIndex: number,
    name: string
  ) => void;
  updateParameterListElementDataType: (
    dataPointIndex: number,
    paramIndex: number,
    dataType: DataTypeProduct
  ) => void;
  updateParameterListElementDefaultValue: (
    dataPointIndex: number,
    paramIndex: number,
    defaultValue: string | undefined
  ) => void;
}

/**
 * Creates a dynamic parameter list slice that works with any store state.
 * This is a generic factory that can be used for both FunctionalProfile and Device stores.
 *
 * @param set - The Zustand set function
 * @param getParameterList - Function to get parameterList from the store state for a given dataPointIndex
 * @param setParameterList - Function to set parameterList in the store state for a given dataPointIndex
 */
export function createDynamicParameterListSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getParameterList: (
    state: TState,
    dataPointIndex: number
  ) => DynamicParameterDescriptionList | undefined,
  setParameterList: (
    state: TState,
    dataPointIndex: number,
    parameterList: DynamicParameterDescriptionList | undefined
  ) => void
): DynamicParameterListSlice {
  const enumSlice = createDynamicParameterListEnumSlice(set, getParameterList);
  const bitmapSlice = createDynamicParameterListBitmapSlice(set, getParameterList);
  const descriptionsSlice = createDynamicParameterDescriptionsSlice(set, getParameterList);

  return {
    ...enumSlice,
    ...bitmapSlice,
    ...descriptionsSlice,

    addParameterList: (dataPointIndex) =>
      set((state) => {
        setParameterList(state, dataPointIndex, {});
      }),

    removeParameterList: (dataPointIndex) =>
      set((state) => {
        setParameterList(state, dataPointIndex, undefined);
      }),

    addParameterListElement: (dataPointIndex) =>
      set((state) => {
        const paramList = getParameterList(state, dataPointIndex);
        if (paramList) {
          const list = ensureArray(paramList.parameterListElement, () => []);
          list.push({ name: "", dataType: { float64: {} } });
          paramList.parameterListElement = list;
        } else {
          setParameterList(state, dataPointIndex, {
            parameterListElement: [{ name: "", dataType: { float64: {} } }],
          });
        }
      }),

    removeParameterListElement: (dataPointIndex, paramIndex) =>
      set((state) => {
        const paramList = getParameterList(state, dataPointIndex);
        if (paramList?.parameterListElement) {
          removeArrayItem(paramList.parameterListElement, paramIndex, () => {
            paramList.parameterListElement = undefined;
          });
        }
      }),

    updateParameterListElementName: (dataPointIndex, paramIndex, name) =>
      set((state) => {
        const param = getParameterList(state, dataPointIndex)?.parameterListElement?.[paramIndex];
        if (param) param.name = name;
      }),

    updateParameterListElementDataType: (dataPointIndex, paramIndex, dataType) =>
      set((state) => {
        const param = getParameterList(state, dataPointIndex)?.parameterListElement?.[paramIndex];
        if (param) param.dataType = dataType;
      }),

    updateParameterListElementDefaultValue: (dataPointIndex, paramIndex, defaultValue) =>
      set((state) => {
        const param = getParameterList(state, dataPointIndex)?.parameterListElement?.[paramIndex];
        if (param) param.defaultValue = normalizeString(defaultValue);
      }),
  };
}
