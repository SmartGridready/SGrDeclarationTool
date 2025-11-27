import { GenericAttributeFunctionalProfile } from "@/models";
import {
  SetState,
  ensureArray,
  removeArrayItem,
} from "@/sections/shared/utils/slice-utils";

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

export const createGenericAttributeListSlice = (
  set: SetState
): GenericAttributeListSlice => ({
  addGenericAttribute: (attribute) =>
    set((state) => {
      if (state.profile) {
        const list = ensureArray(
          state.profile.genericAttributeList?.genericAttributeListElement,
          () => []
        );
        list.push(attribute);
        if (!state.profile.genericAttributeList) {
          state.profile.genericAttributeList = {
            genericAttributeListElement: list,
          };
        } else {
          state.profile.genericAttributeList.genericAttributeListElement = list;
        }
      }
    }),

  removeGenericAttribute: (index) =>
    set((state) => {
      if (state.profile?.genericAttributeList?.genericAttributeListElement) {
        removeArrayItem(
          state.profile.genericAttributeList.genericAttributeListElement,
          index,
          () => {
            if (state.profile) {
              state.profile.genericAttributeList = undefined;
            }
          }
        );
      }
    }),

  removeAllGenericAttributes: () =>
    set((state) => {
      if (state.profile) {
        state.profile.genericAttributeList = undefined;
      }
    }),

  updateGenericAttributeName: (index, name) =>
    set((state) => {
      const attributeArray =
        state.profile?.genericAttributeList?.genericAttributeListElement;
      if (attributeArray?.[index]) {
        attributeArray[index] = { ...attributeArray[index], name };
      }
    }),

  addEmptyGenericAttribute: () =>
    set((state) => {
      if (state.profile) {
        const list = ensureArray(
          state.profile.genericAttributeList?.genericAttributeListElement,
          () => []
        );
        list.push(createEmptyGenericAttribute());
        if (!state.profile.genericAttributeList) {
          state.profile.genericAttributeList = {
            genericAttributeListElement: list,
          };
        } else {
          state.profile.genericAttributeList.genericAttributeListElement = list;
        }
      }
    }),
});
