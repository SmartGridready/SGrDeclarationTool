import { DataTypeProduct, DynamicParameterDescriptionList } from "@/models";
import { createEmptyDynamicParameterDescriptionListElement } from "@/utils/factory-utils";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";
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
  addParameterList: (listIndex: number) => void;
  removeParameterList: (listIndex: number) => void;
  addParameterListElement: (listIndex: number) => void;
  removeParameterListElement: (listIndex: number, paramIndex: number) => void;
  updateParameterListElementName: (listIndex: number, paramIndex: number, name: string) => void;
  updateParameterListElementDataType: (listIndex: number, paramIndex: number, dataType: DataTypeProduct) => void;
  updateParameterListElementDefaultValue: (
    listIndex: number,
    paramIndex: number,
    defaultValue: string | undefined
  ) => void;
}

/**
 * Creates a dynamic parameter list slice that works with any store state.
 * This is a generic factory that can be used for both FunctionalProfile and Device stores.
 *
 * @param set - The Zustand set function
 * @param getParameterList - Function to get parameterList from the store state for a given listIndex
 * @param setParameterList - Function to set parameterList in the store state for a given listIndex
 */
export function createDynamicParameterListSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getParameterList: (state: TState, listIndex: number) => DynamicParameterDescriptionList | undefined,
  setParameterList: (
    state: TState,
    listIndex: number,
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

    addParameterList: (listIndex) =>
      set((state) => {
        setParameterList(state, listIndex, {});
      }),

    removeParameterList: (listIndex) =>
      set((state) => {
        setParameterList(state, listIndex, undefined);
      }),

    addParameterListElement: (listIndex) =>
      set((state) => {
        const paramList = getParameterList(state, listIndex);
        if (paramList) {
          const list = ensureArray(paramList.parameterListElement, () => []);
          list.push(createEmptyDynamicParameterDescriptionListElement());
          paramList.parameterListElement = list;
        } else {
          setParameterList(state, listIndex, {
            parameterListElement: [createEmptyDynamicParameterDescriptionListElement()],
          });
        }
      }),

    removeParameterListElement: (listIndex, paramIndex) =>
      set((state) => {
        const paramList = getParameterList(state, listIndex);
        if (paramList?.parameterListElement) {
          removeArrayItem(paramList.parameterListElement, paramIndex, () => {
            paramList.parameterListElement = undefined;
          });
        }
      }),

    updateParameterListElementName: (listIndex, paramIndex, name) =>
      set((state) => {
        const param = getParameterList(state, listIndex)?.parameterListElement?.[paramIndex];
        if (param) param.name = name;
      }),

    updateParameterListElementDataType: (listIndex, paramIndex, dataType) =>
      set((state) => {
        const param = getParameterList(state, listIndex)?.parameterListElement?.[paramIndex];
        if (param) param.dataType = dataType;
      }),

    updateParameterListElementDefaultValue: (listIndex, paramIndex, defaultValue) =>
      set((state) => {
        const param = getParameterList(state, listIndex)?.parameterListElement?.[paramIndex];
        if (param) {
          // Preserve empty strings for defaultValue (they should appear as empty elements in XML)
          // Only convert null/undefined to undefined
          param.defaultValue = defaultValue === null || defaultValue === undefined ? undefined : defaultValue;
        }
      }),
  };
}
