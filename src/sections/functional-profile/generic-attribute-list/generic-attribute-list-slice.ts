import {
  FunctionalProfileFrame,
  GenericAttributeFunctionalProfile,
  GenericAttributeListFunctionalProfile,
} from "@/models";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface GenericAttributeListSlice {
  // Main operations
  addGenericAttribute: (attribute: GenericAttributeFunctionalProfile) => void;
  removeGenericAttribute: (index: number) => void;
  removeAllGenericAttributes: () => void;

  // Field-specific updates
  updateGenericAttributeName: (index: number, name: string) => void;

  // Convenience methods
  addEmptyGenericAttribute: () => void;
}

const createEmptyGenericAttribute = (): GenericAttributeFunctionalProfile => ({
  name: "",
});

/**
 * Creates a generic attribute list slice specifically for functional profile stores
 * This is a convenience function that pre-configures the getters/setters
 */
export function createGenericAttributeListSlice<
  TState extends { profile?: FunctionalProfileFrame },
>(set: (fn: (state: TState) => void) => void): GenericAttributeListSlice {
  const getGenericAttributeList = (state: TState) => state.profile?.genericAttributeList;
  const setGenericAttributeList = (
    state: TState,
    list: GenericAttributeListFunctionalProfile | undefined
  ) => {
    if (state.profile) {
      state.profile.genericAttributeList = list;
    }
  };

  return {
    addGenericAttribute: (attribute) =>
      set((state) => {
        const currentList = getGenericAttributeList(state);
        if (currentList) {
          const list = ensureArray(currentList.genericAttributeListElement, () => []);
          list.push(attribute);
          currentList.genericAttributeListElement = list;
        } else {
          setGenericAttributeList(state, {
            genericAttributeListElement: [attribute],
          });
        }
      }),

    removeGenericAttribute: (index) =>
      set((state) => {
        const currentList = getGenericAttributeList(state);
        if (currentList?.genericAttributeListElement) {
          removeArrayItem(currentList.genericAttributeListElement, index, () => {
            setGenericAttributeList(state, undefined);
          });
        }
      }),

    removeAllGenericAttributes: () =>
      set((state) => {
        setGenericAttributeList(state, undefined);
      }),

    updateGenericAttributeName: (index, name) =>
      set((state) => {
        const attributeArray = getGenericAttributeList(state)?.genericAttributeListElement;
        if (attributeArray?.[index]) {
          attributeArray[index] = { ...attributeArray[index], name };
        }
      }),

    addEmptyGenericAttribute: () =>
      set((state) => {
        const currentList = getGenericAttributeList(state);
        if (currentList) {
          const list = ensureArray(currentList.genericAttributeListElement, () => []);
          list.push(createEmptyGenericAttribute());
          currentList.genericAttributeListElement = list;
        } else {
          setGenericAttributeList(state, {
            genericAttributeListElement: [createEmptyGenericAttribute()],
          });
        }
      }),
  };
}
