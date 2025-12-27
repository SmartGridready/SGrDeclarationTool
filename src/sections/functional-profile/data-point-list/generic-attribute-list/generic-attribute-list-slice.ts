import { GenericAttributeFunctionalProfile, FunctionalProfileDataPoint } from "@/models";
import { createEmptyGenericAttribute } from "@/utils/factory-utils";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface DataPointGenericAttributeListSlice {
  addDataPointGenericAttributeList: (dataPointIndex: number) => void;
  removeDataPointGenericAttributeList: (dataPointIndex: number) => void;
  addDataPointGenericAttribute: (dataPointIndex: number) => void;
  removeDataPointGenericAttribute: (dataPointIndex: number, attributeIndex: number) => void;
  updateDataPointGenericAttributeName: (
    dataPointIndex: number,
    attributeIndex: number,
    name: string
  ) => void;
}

/**
 * Creates a generic data point generic attribute list slice that works with any store state
 */
export function createDataPointGenericAttributeListSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataPoint: (state: TState, index: number) => FunctionalProfileDataPoint | undefined
): DataPointGenericAttributeListSlice {
  return {
    addDataPointGenericAttributeList: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) dp.genericAttributeList = { genericAttributeListElement: [] };
      }),

    removeDataPointGenericAttributeList: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) dp.genericAttributeList = undefined;
      }),

    addDataPointGenericAttribute: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) {
          if (!dp.genericAttributeList) {
            dp.genericAttributeList = { genericAttributeListElement: [] };
          }
          const list = ensureArray(dp.genericAttributeList.genericAttributeListElement, () => []);
          list.push(createEmptyGenericAttribute());
          dp.genericAttributeList.genericAttributeListElement = list;
        }
      }),

    removeDataPointGenericAttribute: (dataPointIndex, attributeIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp?.genericAttributeList?.genericAttributeListElement) {
          removeArrayItem(
            dp.genericAttributeList.genericAttributeListElement,
            attributeIndex,
            () => {
              if (dp) dp.genericAttributeList = undefined;
            }
          );
        }
      }),

    updateDataPointGenericAttributeName: (dataPointIndex, attributeIndex, name) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const attribute = dp?.genericAttributeList?.genericAttributeListElement?.[attributeIndex];
        if (attribute) attribute.name = name;
      }),
  };
}
