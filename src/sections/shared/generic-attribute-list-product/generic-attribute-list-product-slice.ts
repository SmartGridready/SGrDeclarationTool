import {
  DataTypeProduct,
  GenericAttributeProduct,
  GenericAttributeListProduct,
  GenericAttributeListProductEnd,
  Units,
} from "@/models";
import {
  createEmptyGenericAttributeProduct,
  createEmptyGenericAttributeProductEnd,
} from "@/utils/factory-utils";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";
import {
  createGenericAttributeListProductSimpleEnumSlice,
  GenericAttributeListProductSimpleEnumSlice,
} from "@/sections/shared/generic-attribute-list-product/data-types/simple/enum/enum-slice";
import {
  createGenericAttributeListProductSimpleBitmapSlice,
  GenericAttributeListProductSimpleBitmapSlice,
} from "@/sections/shared/generic-attribute-list-product/data-types/simple/bitmap/bitmap-slice";
import {
  createGenericAttributeListProductNestedEnumSlice,
  GenericAttributeListProductNestedEnumSlice,
} from "@/sections/shared/generic-attribute-list-product/data-types/nested/enum/enum-slice";
import {
  createGenericAttributeListProductNestedBitmapSlice,
  GenericAttributeListProductNestedBitmapSlice,
} from "@/sections/shared/generic-attribute-list-product/data-types/nested/bitmap/bitmap-slice";

export interface GenericAttributeListProductSlice
  extends GenericAttributeListProductSimpleEnumSlice,
    GenericAttributeListProductSimpleBitmapSlice,
    GenericAttributeListProductNestedEnumSlice,
    GenericAttributeListProductNestedBitmapSlice {
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
export function isSimpleGenericAttribute(
  attr: GenericAttributeProduct
): attr is GenericAttributeProduct & { dataType: DataTypeProduct; value: string; unit: Units } {
  return "dataType" in attr && "value" in attr && "unit" in attr;
}

/**
 * Type guard to check if a GenericAttributeProduct is nested (has genericAttributeList)
 */
export function isNestedGenericAttribute(
  attr: GenericAttributeProduct
): attr is GenericAttributeProduct & { genericAttributeList: GenericAttributeListProductEnd } {
  return "genericAttributeList" in attr;
}

/**
 * Creates a generic attribute list product slice that works with any store state.
 * @param set - The Zustand set function
 * @param getGenericAttributeList - Function to get genericAttributeList from the store state
 * @param setGenericAttributeList - Function to set genericAttributeList in the store state
 */
export function createGenericAttributeListProductSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getGenericAttributeList: (state: TState) => GenericAttributeListProduct | undefined,
  setGenericAttributeList: (
    state: TState,
    genericAttributeList: GenericAttributeListProduct | undefined
  ) => void
): GenericAttributeListProductSlice {
  const getAttribute = (state: TState, elementIndex: number): GenericAttributeProduct | undefined =>
    getGenericAttributeList(state)?.genericAttributeListElement?.[elementIndex];

  const simpleEnumSlice = createGenericAttributeListProductSimpleEnumSlice(set, getAttribute);
  const simpleBitmapSlice = createGenericAttributeListProductSimpleBitmapSlice(set, getAttribute);
  const nestedEnumSlice = createGenericAttributeListProductNestedEnumSlice(set, getAttribute);
  const nestedBitmapSlice = createGenericAttributeListProductNestedBitmapSlice(set, getAttribute);

  return {
    ...simpleEnumSlice,
    ...simpleBitmapSlice,
    ...nestedEnumSlice,
    ...nestedBitmapSlice,

    addGenericAttributeList: () =>
      set((state) => {
        setGenericAttributeList(state, { genericAttributeListElement: [] });
      }),

    removeGenericAttributeList: () =>
      set((state) => {
        setGenericAttributeList(state, undefined);
      }),

    addGenericAttributeListElement: () =>
      set((state) => {
        const current = getGenericAttributeList(state);
        if (current) {
          const list = ensureArray(current.genericAttributeListElement, () => []);
          // Default to simple attribute
          list.push(createEmptyGenericAttributeProduct());
          current.genericAttributeListElement = list;
        } else {
          setGenericAttributeList(state, {
            genericAttributeListElement: [createEmptyGenericAttributeProduct()],
          });
        }
      }),

    removeGenericAttributeListElement: (elementIndex) =>
      set((state) => {
        const current = getGenericAttributeList(state);
        if (current?.genericAttributeListElement) {
          removeArrayItem(current.genericAttributeListElement, elementIndex, () => {
            setGenericAttributeList(state, undefined);
          });
        }
      }),

    updateGenericAttributeListElementName: (elementIndex, name) =>
      set((state) => {
        const element = getAttribute(state, elementIndex);
        if (element) element.name = name;
      }),

    setGenericAttributeListElementAsSimple: (elementIndex, dataType, value, unit) =>
      set((state) => {
        const element = getAttribute(state, elementIndex);
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
        const element = getAttribute(state, elementIndex);
        if (element && isSimpleGenericAttribute(element)) {
          element.dataType = dataType;
        }
      }),

    updateGenericAttributeListElementValue: (elementIndex, value) =>
      set((state) => {
        const element = getAttribute(state, elementIndex);
        if (element && isSimpleGenericAttribute(element)) {
          element.value = value || "";
        }
      }),

    updateGenericAttributeListElementUnit: (elementIndex, unit) =>
      set((state) => {
        const element = getAttribute(state, elementIndex);
        if (element && isSimpleGenericAttribute(element)) {
          element.unit = unit;
        }
      }),

    setGenericAttributeListElementAsNested: (elementIndex) =>
      set((state) => {
        const element = getAttribute(state, elementIndex);
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
        const element = getAttribute(state, elementIndex);
        if (element && isNestedGenericAttribute(element)) {
          const list = ensureArray(
            element.genericAttributeList.genericAttributeListElement,
            () => []
          );
          list.push(createEmptyGenericAttributeProductEnd());
          element.genericAttributeList.genericAttributeListElement = list;
        }
      }),

    removeNestedGenericAttributeListElement: (elementIndex, nestedElementIndex) =>
      set((state) => {
        const element = getAttribute(state, elementIndex);
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
        const element = getAttribute(state, elementIndex);
        if (element && isNestedGenericAttribute(element)) {
          const nestedElement =
            element.genericAttributeList.genericAttributeListElement?.[nestedElementIndex];
          if (nestedElement) nestedElement.name = name;
        }
      }),

    updateNestedGenericAttributeListElementDataType: (elementIndex, nestedElementIndex, dataType) =>
      set((state) => {
        const element = getAttribute(state, elementIndex);
        if (element && isNestedGenericAttribute(element)) {
          const nestedElement =
            element.genericAttributeList.genericAttributeListElement?.[nestedElementIndex];
          if (nestedElement) nestedElement.dataType = dataType;
        }
      }),

    updateNestedGenericAttributeListElementValue: (elementIndex, nestedElementIndex, value) =>
      set((state) => {
        const element = getAttribute(state, elementIndex);
        if (element && isNestedGenericAttribute(element)) {
          const nestedElement =
            element.genericAttributeList.genericAttributeListElement?.[nestedElementIndex];
          if (nestedElement) nestedElement.value = value || "";
        }
      }),

    updateNestedGenericAttributeListElementUnit: (elementIndex, nestedElementIndex, unit) =>
      set((state) => {
        const element = getAttribute(state, elementIndex);
        if (element && isNestedGenericAttribute(element)) {
          const nestedElement =
            element.genericAttributeList.genericAttributeListElement?.[nestedElementIndex];
          if (nestedElement) nestedElement.unit = unit;
        }
      }),
  };
}
