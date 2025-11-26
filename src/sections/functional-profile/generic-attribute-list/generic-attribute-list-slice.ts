import {
  FunctionalProfileFrame,
  GenericAttributeFunctionalProfile,
} from "@/models";

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

type StoreState = {
  profile?: FunctionalProfileFrame;
};

type SetState = (fn: (state: StoreState) => void) => void;

/**
 * Creates a new empty GenericAttributeFunctionalProfile entry with default values
 */
function createEmptyGenericAttribute(): GenericAttributeFunctionalProfile {
  return {
    name: "",
  };
}

export const createGenericAttributeListSlice = (
  set: SetState
): GenericAttributeListSlice => ({
  addGenericAttribute: (attribute) =>
    set((state) => {
      if (state.profile) {
        if (!state.profile.genericAttributeList) {
          state.profile.genericAttributeList = {
            genericAttributeListElement: [],
          };
        }
        state.profile.genericAttributeList.genericAttributeListElement.push(
          attribute
        );
      }
    }),

  removeGenericAttribute: (index) =>
    set((state) => {
      const attributeArray =
        state.profile?.genericAttributeList?.genericAttributeListElement;
      if (attributeArray && index >= 0 && index < attributeArray.length) {
        attributeArray.splice(index, 1);
        // Set to undefined if array becomes empty
        if (attributeArray.length === 0 && state.profile) {
          state.profile.genericAttributeList = undefined;
        }
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
        attributeArray[index] = {
          ...attributeArray[index],
          name: name,
        };
      }
    }),

  addEmptyGenericAttribute: () =>
    set((state) => {
      if (state.profile) {
        if (!state.profile.genericAttributeList) {
          state.profile.genericAttributeList = {
            genericAttributeListElement: [],
          };
        }
        state.profile.genericAttributeList.genericAttributeListElement.push(
          createEmptyGenericAttribute()
        );
      }
    }),
});
