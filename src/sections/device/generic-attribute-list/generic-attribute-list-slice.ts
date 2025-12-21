import {
  DataTypeProduct,
  DeviceFrame,
  GenericAttributeProduct,
  GenericAttributeListProductEnd,
  Units,
} from "@/models";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";
import {
  createGenericAttributeListSimpleEnumSlice,
  GenericAttributeListSimpleEnumSlice,
} from "@/sections/device/generic-attribute-list/data-types/simple/enum/enum-slice";
import {
  createGenericAttributeListSimpleBitmapSlice,
  GenericAttributeListSimpleBitmapSlice,
} from "@/sections/device/generic-attribute-list/data-types/simple/bitmap/bitmap-slice";
import {
  createGenericAttributeListNestedEnumSlice,
  GenericAttributeListNestedEnumSlice,
} from "@/sections/device/generic-attribute-list/data-types/nested/enum/enum-slice";
import {
  createGenericAttributeListNestedBitmapSlice,
  GenericAttributeListNestedBitmapSlice,
} from "@/sections/device/generic-attribute-list/data-types/nested/bitmap/bitmap-slice";

export interface GenericAttributeListSlice
  extends GenericAttributeListSimpleEnumSlice,
    GenericAttributeListSimpleBitmapSlice,
    GenericAttributeListNestedEnumSlice,
    GenericAttributeListNestedBitmapSlice {
  addGenericAttributeList: () => void;
  removeGenericAttributeList: () => void;
  addGenericAttributeListElement: () => void;
  removeGenericAttributeListElement: (elementIndex: number) => void;
  updateGenericAttributeListElementName: (elementIndex: number, name: string) => void;
  // Simple attribute actions
  setGenericAttributeListElementAsSimple: (
    elementIndex: number,
    dataType: DataTypeProduct,
    value: string,
    unit: Units
  ) => void;
  updateGenericAttributeListElementDataType: (
    elementIndex: number,
    dataType: DataTypeProduct
  ) => void;
  updateGenericAttributeListElementValue: (elementIndex: number, value: string) => void;
  updateGenericAttributeListElementUnit: (elementIndex: number, unit: Units) => void;
  // Nested attribute actions
  setGenericAttributeListElementAsNested: (elementIndex: number) => void;
  addNestedGenericAttributeListElement: (elementIndex: number) => void;
  removeNestedGenericAttributeListElement: (
    elementIndex: number,
    nestedElementIndex: number
  ) => void;
  updateNestedGenericAttributeListElementName: (
    elementIndex: number,
    nestedElementIndex: number,
    name: string
  ) => void;
  updateNestedGenericAttributeListElementDataType: (
    elementIndex: number,
    nestedElementIndex: number,
    dataType: DataTypeProduct
  ) => void;
  updateNestedGenericAttributeListElementValue: (
    elementIndex: number,
    nestedElementIndex: number,
    value: string
  ) => void;
  updateNestedGenericAttributeListElementUnit: (
    elementIndex: number,
    nestedElementIndex: number,
    unit: Units
  ) => void;
}

/**
 * Type guard to check if a GenericAttributeProduct is simple (has dataType, value, unit)
 */
function isSimpleGenericAttribute(
  attr: GenericAttributeProduct
): attr is GenericAttributeProduct & { dataType: DataTypeProduct; value: string; unit: Units } {
  return "dataType" in attr && "value" in attr && "unit" in attr;
}

/**
 * Type guard to check if a GenericAttributeProduct is nested (has genericAttributeList)
 */
function isNestedGenericAttribute(
  attr: GenericAttributeProduct
): attr is GenericAttributeProduct & { genericAttributeList: GenericAttributeListProductEnd } {
  return "genericAttributeList" in attr;
}

export function createGenericAttributeListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): GenericAttributeListSlice {
  const simpleEnumSlice = createGenericAttributeListSimpleEnumSlice(set);
  const simpleBitmapSlice = createGenericAttributeListSimpleBitmapSlice(set);
  const nestedEnumSlice = createGenericAttributeListNestedEnumSlice(set);
  const nestedBitmapSlice = createGenericAttributeListNestedBitmapSlice(set);

  return {
    ...simpleEnumSlice,
    ...simpleBitmapSlice,
    ...nestedEnumSlice,
    ...nestedBitmapSlice,

    addGenericAttributeList: () =>
      set((state) => {
        if (state.device) {
          state.device.genericAttributeList = { genericAttributeListElement: [] };
        }
      }),

    removeGenericAttributeList: () =>
      set((state) => {
        if (state.device) {
          state.device.genericAttributeList = undefined;
        }
      }),

    addGenericAttributeListElement: () =>
      set((state) => {
        if (state.device) {
          if (!state.device.genericAttributeList) {
            state.device.genericAttributeList = { genericAttributeListElement: [] };
          }
          const list = ensureArray(
            state.device.genericAttributeList.genericAttributeListElement,
            () => []
          );
          // Default to simple attribute
          list.push({
            name: "",
            dataType: { float64: {} },
            value: "",
            unit: "NO_UNITS",
          });
          state.device.genericAttributeList.genericAttributeListElement = list;
        }
      }),

    removeGenericAttributeListElement: (elementIndex) =>
      set((state) => {
        if (state.device?.genericAttributeList?.genericAttributeListElement) {
          removeArrayItem(
            state.device.genericAttributeList.genericAttributeListElement,
            elementIndex,
            () => {
              // Remove the entire genericAttributeList when empty
              if (state.device) {
                state.device.genericAttributeList = undefined;
              }
            }
          );
        }
      }),

    updateGenericAttributeListElementName: (elementIndex, name) =>
      set((state) => {
        const element =
          state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
        if (element) element.name = name;
      }),

    setGenericAttributeListElementAsSimple: (elementIndex, dataType, value, unit) =>
      set((state) => {
        const element =
          state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
        if (element) {
          // Remove nested structure if it exists
          const mutableElement = element as unknown as Record<string, unknown>;
          if ("genericAttributeList" in element) {
            delete mutableElement.genericAttributeList;
          }
          // Set simple structure
          mutableElement.dataType = dataType;
          mutableElement.value = value;
          mutableElement.unit = unit;
        }
      }),

    updateGenericAttributeListElementDataType: (elementIndex, dataType) =>
      set((state) => {
        const element =
          state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
        if (element && isSimpleGenericAttribute(element)) {
          element.dataType = dataType;
        }
      }),

    updateGenericAttributeListElementValue: (elementIndex, value) =>
      set((state) => {
        const element =
          state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
        if (element && isSimpleGenericAttribute(element)) {
          element.value = value || "";
        }
      }),

    updateGenericAttributeListElementUnit: (elementIndex, unit) =>
      set((state) => {
        const element =
          state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
        if (element && isSimpleGenericAttribute(element)) {
          element.unit = unit;
        }
      }),

    setGenericAttributeListElementAsNested: (elementIndex) =>
      set((state) => {
        const element =
          state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
        if (element) {
          // Remove simple structure if it exists
          const mutableElement = element as unknown as Record<string, unknown>;
          if ("dataType" in element) {
            delete mutableElement.dataType;
            delete mutableElement.value;
            delete mutableElement.unit;
          }
          // Set nested structure
          mutableElement.genericAttributeList = { genericAttributeListElement: [] };
        }
      }),

    addNestedGenericAttributeListElement: (elementIndex) =>
      set((state) => {
        const element =
          state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
        if (element && isNestedGenericAttribute(element)) {
          const list = ensureArray(
            element.genericAttributeList.genericAttributeListElement,
            () => []
          );
          list.push({
            name: "",
            dataType: { float64: {} },
            value: "",
            unit: "NO_UNITS",
          });
          element.genericAttributeList.genericAttributeListElement = list;
        }
      }),

    removeNestedGenericAttributeListElement: (elementIndex, nestedElementIndex) =>
      set((state) => {
        const element =
          state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
        if (element && isNestedGenericAttribute(element)) {
          removeArrayItem(
            element.genericAttributeList.genericAttributeListElement,
            nestedElementIndex,
            () => {
              element.genericAttributeList.genericAttributeListElement = [];
            }
          );
        }
      }),

    updateNestedGenericAttributeListElementName: (elementIndex, nestedElementIndex, name) =>
      set((state) => {
        const element =
          state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
        if (element && isNestedGenericAttribute(element)) {
          const nestedElement =
            element.genericAttributeList.genericAttributeListElement?.[nestedElementIndex];
          if (nestedElement) nestedElement.name = name;
        }
      }),

    updateNestedGenericAttributeListElementDataType: (elementIndex, nestedElementIndex, dataType) =>
      set((state) => {
        const element =
          state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
        if (element && isNestedGenericAttribute(element)) {
          const nestedElement =
            element.genericAttributeList.genericAttributeListElement?.[nestedElementIndex];
          if (nestedElement) nestedElement.dataType = dataType;
        }
      }),

    updateNestedGenericAttributeListElementValue: (elementIndex, nestedElementIndex, value) =>
      set((state) => {
        const element =
          state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
        if (element && isNestedGenericAttribute(element)) {
          const nestedElement =
            element.genericAttributeList.genericAttributeListElement?.[nestedElementIndex];
          if (nestedElement) nestedElement.value = value || "";
        }
      }),

    updateNestedGenericAttributeListElementUnit: (elementIndex, nestedElementIndex, unit) =>
      set((state) => {
        const element =
          state.device?.genericAttributeList?.genericAttributeListElement?.[elementIndex];
        if (element && isNestedGenericAttribute(element)) {
          const nestedElement =
            element.genericAttributeList.genericAttributeListElement?.[nestedElementIndex];
          if (nestedElement) nestedElement.unit = unit;
        }
      }),
  };
}
