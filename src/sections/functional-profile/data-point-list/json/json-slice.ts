import {
  FunctionalProfileFrame,
  JSonOutputFunctionalProfile,
  JSonArrayOutputFunctionalProfile,
  JSonElemFunctionalProfile,
} from "@/models";

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

type StoreState = {
  profile?: FunctionalProfileFrame;
};

type SetState = (fn: (state: StoreState) => void) => void;

export const createJsonSlice = (set: SetState): JsonSlice => ({
  setJsonDataType: (index, json) =>
    set((state) => {
      const dp = state.profile?.dataPointList?.dataPointListElement?.[index];
      if (dp) {
        dp.dataPoint.dataType = { json: json };
      }
    }),

  addJsonItem: (dataPointIndex, item) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
      if (dp && "json" in dp.dataPoint.dataType) {
        if (!dp.dataPoint.dataType.json.items) {
          dp.dataPoint.dataType.json.items = [];
        }
        dp.dataPoint.dataType.json.items.push(item);
      }
    }),

  removeJsonItem: (dataPointIndex, itemIndex) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
      const items = dp?.dataPoint.dataType;
      if (
        items &&
        "json" in items &&
        items.json.items &&
        itemIndex >= 0 &&
        itemIndex < items.json.items.length
      ) {
        items.json.items.splice(itemIndex, 1);
        if (items.json.items.length === 0) {
          items.json.items = undefined;
        }
      }
    }),

  updateJsonArrayItem: (dataPointIndex, itemIndex, item) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
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
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
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
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
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
          if (!arrayItem.items) {
            arrayItem.items = [];
          }
          arrayItem.items.push(item);
        }
      }
    }),

  removeJsonNestedItem: (dataPointIndex, arrayItemIndex, nestedItemIndex) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
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
          arrayItem.items.splice(nestedItemIndex, 1);
          if (arrayItem.items.length === 0) {
            arrayItem.items = undefined;
          }
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
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
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
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
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
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
      if (!dp || !("json" in dp.dataPoint.dataType)) {
        return;
      }

      // If path is empty, add to root level
      if (path.length === 0) {
        if (!dp.dataPoint.dataType.json.items) {
          dp.dataPoint.dataType.json.items = [];
        }
        dp.dataPoint.dataType.json.items.push(item);
        return;
      }

      // Navigate to the target array using the path
      let currentItems:
        | (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[]
        | undefined = dp.dataPoint.dataType.json.items;

      // Follow the path to find the target array
      for (const index of path) {
        if (
          currentItems &&
          index >= 0 &&
          index < currentItems.length &&
          "name" in currentItems[index]
        ) {
          const arrayItem = currentItems[
            index
          ] as JSonArrayOutputFunctionalProfile;
          if (!arrayItem.items) {
            arrayItem.items = [];
          }
          currentItems = arrayItem.items;
        } else {
          return; // Invalid path
        }
      }

      // Add item to the target array
      if (currentItems) {
        currentItems.push(item);
      }
    }),

  removeJsonItemAtPath: (dataPointIndex, path) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
      if (!dp || !("json" in dp.dataPoint.dataType)) {
        return;
      }

      if (path.length === 0) {
        return; // Cannot remove root
      }

      // Navigate to the parent array
      const itemIndex = path[path.length - 1];
      const parentPath = path.slice(0, -1);

      let currentItems:
        | (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[]
        | undefined = dp.dataPoint.dataType.json.items;

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
        currentItems.splice(itemIndex, 1);
        if (currentItems.length === 0 && parentPath.length > 0) {
          // If parent array is now empty, set it to undefined
          const parentIndex = parentPath[parentPath.length - 1];
          const grandParentPath = parentPath.slice(0, -1);
          let grandParentItems:
            | (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[]
            | undefined = dp.dataPoint.dataType.json.items;

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
              grandParentItems[parentIndex] as JSonArrayOutputFunctionalProfile
            ).items = undefined;
          }
        }
      }
    }),

  updateJsonArrayItemAtPath: (dataPointIndex, path, item) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
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
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
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
