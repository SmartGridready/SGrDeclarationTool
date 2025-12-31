import {
  JSonOutputFunctionalProfile,
  JSonArrayOutputFunctionalProfile,
  JSonElemFunctionalProfile,
  FunctionalProfileDataPoint,
} from "@/models";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface JsonSlice {
  setJsonDataType: (index: number, json: JSonOutputFunctionalProfile) => void;
  addJsonItem: (dataPointIndex: number, item: JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile) => void;
  removeJsonItem: (dataPointIndex: number, itemIndex: number) => void;
  updateJsonArrayItem: (dataPointIndex: number, itemIndex: number, item: JSonArrayOutputFunctionalProfile) => void;
  updateJsonElemItem: (dataPointIndex: number, itemIndex: number, item: JSonElemFunctionalProfile) => void;
  addJsonItemAtPath: (
    dataPointIndex: number,
    path: number[],
    item: JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile
  ) => void;
  removeJsonItemAtPath: (dataPointIndex: number, path: number[]) => void;
  updateJsonArrayItemAtPath: (dataPointIndex: number, path: number[], item: JSonArrayOutputFunctionalProfile) => void;
  updateJsonElemItemAtPath: (dataPointIndex: number, path: number[], item: JSonElemFunctionalProfile) => void;
  addJsonNestedItem: (
    dataPointIndex: number,
    arrayItemIndex: number,
    item: JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile
  ) => void;
  removeJsonNestedItem: (dataPointIndex: number, arrayItemIndex: number, nestedItemIndex: number) => void;
  updateJsonNestedArrayItem: (
    dataPointIndex: number,
    arrayItemIndex: number,
    nestedItemIndex: number,
    item: JSonArrayOutputFunctionalProfile
  ) => void;
  updateJsonNestedElemItem: (
    dataPointIndex: number,
    arrayItemIndex: number,
    nestedItemIndex: number,
    item: JSonElemFunctionalProfile
  ) => void;
}

/**
 * Creates a generic JSON slice that works with any store state
 * @param set - The Zustand set function
 * @param getDataPoint - Function to get a data point by index from the store state
 */
export function createJsonSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataPoint: (state: TState, index: number) => FunctionalProfileDataPoint | undefined
): JsonSlice {
  return {
    setJsonDataType: (index, json) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.dataType = { json: json };
        }
      }),

    addJsonItem: (dataPointIndex, item) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp && "json" in dp.dataPoint.dataType) {
          const items = ensureArray(dp.dataPoint.dataType.json.items, () => []);
          items.push(item);
          dp.dataPoint.dataType.json.items = items;
        }
      }),

    removeJsonItem: (dataPointIndex, itemIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp && "json" in dp.dataPoint.dataType) {
          const jsonType = dp.dataPoint.dataType.json;
          removeArrayItem(jsonType.items, itemIndex, () => {
            jsonType.items = undefined;
          });
        }
      }),

    updateJsonArrayItem: (dataPointIndex, itemIndex, item) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const items = dp?.dataPoint.dataType && "json" in dp.dataPoint.dataType && dp.dataPoint.dataType.json.items;
        if (items && itemIndex >= 0 && itemIndex < items.length) {
          items[itemIndex] = item;
        }
      }),

    updateJsonElemItem: (dataPointIndex, itemIndex, item) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const items = dp?.dataPoint.dataType && "json" in dp.dataPoint.dataType && dp.dataPoint.dataType.json.items;
        if (items && itemIndex >= 0 && itemIndex < items.length) {
          items[itemIndex] = item;
        }
      }),

    addJsonNestedItem: (dataPointIndex, arrayItemIndex, item) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp && "json" in dp.dataPoint.dataType && dp.dataPoint.dataType.json.items) {
          const items = dp.dataPoint.dataType.json.items;
          const arrayItem = items[arrayItemIndex];
          if (arrayItem && "name" in arrayItem && arrayItemIndex >= 0 && arrayItemIndex < items.length) {
            const nestedItems = ensureArray(arrayItem.items, () => []);
            nestedItems.push(item);
            arrayItem.items = nestedItems;
          }
        }
      }),

    removeJsonNestedItem: (dataPointIndex, arrayItemIndex, nestedItemIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp && "json" in dp.dataPoint.dataType && dp.dataPoint.dataType.json.items) {
          const items = dp.dataPoint.dataType.json.items;
          const arrayItem = items[arrayItemIndex];
          if (
            arrayItem &&
            "name" in arrayItem &&
            arrayItem.items &&
            nestedItemIndex >= 0 &&
            nestedItemIndex < arrayItem.items.length
          ) {
            removeArrayItem(arrayItem.items, nestedItemIndex, () => {
              arrayItem.items = undefined;
            });
          }
        }
      }),

    updateJsonNestedArrayItem: (dataPointIndex, arrayItemIndex, nestedItemIndex, item) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp && "json" in dp.dataPoint.dataType && dp.dataPoint.dataType.json.items) {
          const items = dp.dataPoint.dataType.json.items;
          const arrayItem = items[arrayItemIndex];
          if (
            arrayItem &&
            "name" in arrayItem &&
            arrayItem.items &&
            nestedItemIndex >= 0 &&
            nestedItemIndex < arrayItem.items.length
          ) {
            arrayItem.items[nestedItemIndex] = item;
          }
        }
      }),

    updateJsonNestedElemItem: (dataPointIndex, arrayItemIndex, nestedItemIndex, item) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp && "json" in dp.dataPoint.dataType && dp.dataPoint.dataType.json.items) {
          const items = dp.dataPoint.dataType.json.items;
          const arrayItem = items[arrayItemIndex];
          if (
            arrayItem &&
            "name" in arrayItem &&
            arrayItem.items &&
            nestedItemIndex >= 0 &&
            nestedItemIndex < arrayItem.items.length
          ) {
            arrayItem.items[nestedItemIndex] = item;
          }
        }
      }),

    addJsonItemAtPath: (dataPointIndex, path, item) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (!dp || !("json" in dp.dataPoint.dataType)) return;

        if (path.length === 0) {
          const items = ensureArray(dp.dataPoint.dataType.json.items, () => []);
          items.push(item);
          dp.dataPoint.dataType.json.items = items;
          return;
        }

        let currentItems: (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[] | undefined =
          dp.dataPoint.dataType.json.items;

        for (let i = 0; i < path.length; i++) {
          const index = path[i];
          if (currentItems && index >= 0 && index < currentItems.length && "name" in currentItems[index]) {
            const arrayItem = currentItems[index] as JSonArrayOutputFunctionalProfile;
            if (i === path.length - 1) {
              const targetItems = ensureArray(arrayItem.items, () => []);
              targetItems.push(item);
              arrayItem.items = targetItems;
              return;
            }
            currentItems = arrayItem.items;
          } else {
            return;
          }
        }
      }),

    removeJsonItemAtPath: (dataPointIndex, path) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (!dp || !("json" in dp.dataPoint.dataType) || path.length === 0) return;

        const itemIndex = path[path.length - 1];
        const parentPath = path.slice(0, -1);
        const jsonType = dp.dataPoint.dataType.json;

        let currentItems: (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[] | undefined = jsonType.items;

        for (const index of parentPath) {
          if (currentItems && index >= 0 && index < currentItems.length && "name" in currentItems[index]) {
            currentItems = (currentItems[index] as JSonArrayOutputFunctionalProfile).items;
          } else {
            return;
          }
        }

        if (currentItems && itemIndex >= 0 && itemIndex < currentItems.length) {
          removeArrayItem(currentItems, itemIndex, () => {});
        }
      }),

    updateJsonArrayItemAtPath: (dataPointIndex, path, item) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (!dp || !("json" in dp.dataPoint.dataType) || path.length === 0) return;

        let currentItems: (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[] | undefined =
          dp.dataPoint.dataType.json.items;

        for (let i = 0; i < path.length - 1; i++) {
          const index = path[i];
          if (currentItems && index >= 0 && index < currentItems.length && "name" in currentItems[index]) {
            currentItems = (currentItems[index] as JSonArrayOutputFunctionalProfile).items;
          } else {
            return;
          }
        }

        const itemIndex = path[path.length - 1];
        if (currentItems && itemIndex >= 0 && itemIndex < currentItems.length) {
          currentItems[itemIndex] = item;
        }
      }),

    updateJsonElemItemAtPath: (dataPointIndex, path, item) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (!dp || !("json" in dp.dataPoint.dataType) || path.length === 0) return;

        let currentItems: (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[] | undefined =
          dp.dataPoint.dataType.json.items;

        for (let i = 0; i < path.length - 1; i++) {
          const index = path[i];
          if (currentItems && index >= 0 && index < currentItems.length && "name" in currentItems[index]) {
            currentItems = (currentItems[index] as JSonArrayOutputFunctionalProfile).items;
          } else {
            return;
          }
        }

        const itemIndex = path[path.length - 1];
        if (currentItems && itemIndex >= 0 && itemIndex < currentItems.length) {
          currentItems[itemIndex] = item;
        }
      }),
  };
}
