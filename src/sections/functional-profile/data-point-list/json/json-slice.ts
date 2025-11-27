import {
  JSonOutputFunctionalProfile,
  JSonArrayOutputFunctionalProfile,
  JSonElemFunctionalProfile,
} from "@/models";
import {
  SetState,
  getDataPoint,
  ensureArray,
  removeArrayItem,
} from "@/sections/shared/utils/slice-utils";

export interface JsonSlice {
  setJsonDataType: (index: number, json: JSonOutputFunctionalProfile) => void;
  addJsonItem: (
    dataPointIndex: number,
    item: JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile
  ) => void;
  removeJsonItem: (dataPointIndex: number, itemIndex: number) => void;
  updateJsonArrayItem: (
    dataPointIndex: number,
    itemIndex: number,
    item: JSonArrayOutputFunctionalProfile
  ) => void;
  updateJsonElemItem: (
    dataPointIndex: number,
    itemIndex: number,
    item: JSonElemFunctionalProfile
  ) => void;
  // Nested JSON array operations (using path array for deep nesting)
  addJsonItemAtPath: (
    dataPointIndex: number,
    path: number[],
    item: JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile
  ) => void;
  removeJsonItemAtPath: (dataPointIndex: number, path: number[]) => void;
  updateJsonArrayItemAtPath: (
    dataPointIndex: number,
    path: number[],
    item: JSonArrayOutputFunctionalProfile
  ) => void;
  updateJsonElemItemAtPath: (
    dataPointIndex: number,
    path: number[],
    item: JSonElemFunctionalProfile
  ) => void;
  // Legacy nested operations (kept for backward compatibility, but use path-based methods)
  addJsonNestedItem: (
    dataPointIndex: number,
    arrayItemIndex: number,
    item: JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile
  ) => void;
  removeJsonNestedItem: (
    dataPointIndex: number,
    arrayItemIndex: number,
    nestedItemIndex: number
  ) => void;
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

export const createJsonSlice = (set: SetState): JsonSlice => ({
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
      const items =
        dp?.dataPoint.dataType &&
        "json" in dp.dataPoint.dataType &&
        dp.dataPoint.dataType.json.items;
      if (items && itemIndex >= 0 && itemIndex < items.length) {
        items[itemIndex] = item;
      }
    }),

  updateJsonElemItem: (dataPointIndex, itemIndex, item) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const items =
        dp?.dataPoint.dataType &&
        "json" in dp.dataPoint.dataType &&
        dp.dataPoint.dataType.json.items;
      if (items && itemIndex >= 0 && itemIndex < items.length) {
        items[itemIndex] = item;
      }
    }),

  // Nested JSON array operations
  addJsonNestedItem: (dataPointIndex, arrayItemIndex, item) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (
        dp &&
        "json" in dp.dataPoint.dataType &&
        dp.dataPoint.dataType.json.items
      ) {
        const items = dp.dataPoint.dataType.json.items;
        const arrayItem = items[arrayItemIndex];
        if (
          arrayItem &&
          "name" in arrayItem &&
          arrayItemIndex >= 0 &&
          arrayItemIndex < items.length
        ) {
          const nestedItems = ensureArray(arrayItem.items, () => []);
          nestedItems.push(item);
          arrayItem.items = nestedItems;
        }
      }
    }),

  removeJsonNestedItem: (dataPointIndex, arrayItemIndex, nestedItemIndex) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (
        dp &&
        "json" in dp.dataPoint.dataType &&
        dp.dataPoint.dataType.json.items
      ) {
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

  updateJsonNestedArrayItem: (
    dataPointIndex,
    arrayItemIndex,
    nestedItemIndex,
    item
  ) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (
        dp &&
        "json" in dp.dataPoint.dataType &&
        dp.dataPoint.dataType.json.items
      ) {
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

  updateJsonNestedElemItem: (
    dataPointIndex,
    arrayItemIndex,
    nestedItemIndex,
    item
  ) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (
        dp &&
        "json" in dp.dataPoint.dataType &&
        dp.dataPoint.dataType.json.items
      ) {
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

  // Path-based operations for deep nesting
  // Path is an array of indices: [] = root, [0] = first item's items, [0,1] = first item's second nested item's items
  addJsonItemAtPath: (dataPointIndex, path, item) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (!dp || !("json" in dp.dataPoint.dataType)) {
        return;
      }

      // If path is empty, add to root level
      if (path.length === 0) {
        const items = ensureArray(dp.dataPoint.dataType.json.items, () => []);
        items.push(item);
        dp.dataPoint.dataType.json.items = items;
        return;
      }

      // Navigate to the target array using the path
      let currentItems:
        | (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[]
        | undefined = dp.dataPoint.dataType.json.items;

      // Follow the path to find the target array
      for (let i = 0; i < path.length; i++) {
        const index = path[i];
        if (
          currentItems &&
          index >= 0 &&
          index < currentItems.length &&
          "name" in currentItems[index]
        ) {
          const arrayItem = currentItems[
            index
          ] as JSonArrayOutputFunctionalProfile;
          if (i === path.length - 1) {
            // Last index in path - this is where we add
            const targetItems = ensureArray(arrayItem.items, () => []);
            targetItems.push(item);
            arrayItem.items = targetItems;
            return;
          }
          currentItems = arrayItem.items;
        } else {
          return; // Invalid path
        }
      }

      // If we get here, path was empty (handled above) or we need to add to root
      const targetItems = ensureArray(currentItems, () => []);
      targetItems.push(item);
      if (path.length === 0) {
        dp.dataPoint.dataType.json.items = targetItems;
      }
    }),

  removeJsonItemAtPath: (dataPointIndex, path) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (!dp || !("json" in dp.dataPoint.dataType)) {
        return;
      }

      if (path.length === 0) {
        return; // Cannot remove root
      }

      // Navigate to the parent array
      const itemIndex = path[path.length - 1];
      const parentPath = path.slice(0, -1);
      const jsonDataType = dp.dataPoint.dataType;
      if (!("json" in jsonDataType)) return;
      const jsonType = jsonDataType.json;

      let currentItems:
        | (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[]
        | undefined = jsonType.items;

      for (const index of parentPath) {
        if (
          currentItems &&
          index >= 0 &&
          index < currentItems.length &&
          "name" in currentItems[index]
        ) {
          const arrayItem = currentItems[
            index
          ] as JSonArrayOutputFunctionalProfile;
          currentItems = arrayItem.items;
        } else {
          return;
        }
      }

      if (currentItems && itemIndex >= 0 && itemIndex < currentItems.length) {
        removeArrayItem(currentItems, itemIndex, () => {
          if (parentPath.length > 0) {
            const parentIndex = parentPath[parentPath.length - 1];
            const grandParentPath = parentPath.slice(0, -1);
            let grandParentItems:
              | (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[]
              | undefined = jsonType.items;

            for (const index of grandParentPath) {
              if (
                grandParentItems &&
                index >= 0 &&
                index < grandParentItems.length &&
                "name" in grandParentItems[index]
              ) {
                const arrayItem = grandParentItems[
                  index
                ] as JSonArrayOutputFunctionalProfile;
                grandParentItems = arrayItem.items;
              } else {
                return;
              }
            }

            if (
              grandParentItems &&
              parentIndex >= 0 &&
              parentIndex < grandParentItems.length &&
              "name" in grandParentItems[parentIndex]
            ) {
              (
                grandParentItems[
                  parentIndex
                ] as JSonArrayOutputFunctionalProfile
              ).items = undefined;
            }
          }
        });
      }
    }),

  updateJsonArrayItemAtPath: (dataPointIndex, path, item) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (!dp || !("json" in dp.dataPoint.dataType) || path.length === 0) {
        return;
      }

      let currentItems:
        | (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[]
        | undefined = dp.dataPoint.dataType.json.items;

      for (let i = 0; i < path.length - 1; i++) {
        const index = path[i];
        if (
          currentItems &&
          index >= 0 &&
          index < currentItems.length &&
          "name" in currentItems[index]
        ) {
          const arrayItem = currentItems[
            index
          ] as JSonArrayOutputFunctionalProfile;
          currentItems = arrayItem.items;
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
      if (!dp || !("json" in dp.dataPoint.dataType) || path.length === 0) {
        return;
      }

      let currentItems:
        | (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[]
        | undefined = dp.dataPoint.dataType.json.items;

      for (let i = 0; i < path.length - 1; i++) {
        const index = path[i];
        if (
          currentItems &&
          index >= 0 &&
          index < currentItems.length &&
          "name" in currentItems[index]
        ) {
          const arrayItem = currentItems[
            index
          ] as JSonArrayOutputFunctionalProfile;
          currentItems = arrayItem.items;
        } else {
          return;
        }
      }

      const itemIndex = path[path.length - 1];
      if (currentItems && itemIndex >= 0 && itemIndex < currentItems.length) {
        currentItems[itemIndex] = item;
      }
    }),
});
