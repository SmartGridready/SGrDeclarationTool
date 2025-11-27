import { LegibleDescription, Language } from "@/models";
import {
  SetState,
  ensureArray,
  removeArrayItem,
  normalizeString,
} from "@/sections/shared/utils/slice-utils";

export interface LegibleDescriptionSlice {
  // Main operations
  addLegibleDescription: (legibleDescription: LegibleDescription) => void;
  removeLegibleDescription: (index: number) => void;
  removeAllLegibleDescriptions: () => void;

  // Field-specific updates
  updateTextElement: (index: number, textElement: string) => void;
  updateLanguage: (index: number, language: Language) => void;
  updateUri: (index: number, uri: string | undefined) => void;

  // Convenience methods
  addEmptyLegibleDescription: () => void;
}

const createEmptyLegibleDescription = (): LegibleDescription => ({
  textElement: "",
  language: "en",
});

export const createLegibleDescriptionSlice = (
  set: SetState
): LegibleDescriptionSlice => ({
  addLegibleDescription: (legibleDescription) =>
    set((state) => {
      if (state.profile?.functionalProfile) {
        const list = ensureArray(
          state.profile.functionalProfile.legibleDescription,
          () => []
        );
        if (list.length < 4) {
          list.push(legibleDescription);
          state.profile.functionalProfile.legibleDescription = list;
        }
      }
    }),

  removeLegibleDescription: (index) =>
    set((state) => {
      if (state.profile?.functionalProfile?.legibleDescription) {
        removeArrayItem(
          state.profile.functionalProfile.legibleDescription,
          index,
          () => {
            if (state.profile?.functionalProfile) {
              state.profile.functionalProfile.legibleDescription = undefined;
            }
          }
        );
      }
    }),

  removeAllLegibleDescriptions: () =>
    set((state) => {
      if (state.profile?.functionalProfile) {
        state.profile.functionalProfile.legibleDescription = undefined;
      }
    }),

  updateTextElement: (index, textElement) =>
    set((state) => {
      const array = state.profile?.functionalProfile?.legibleDescription;
      if (array?.[index]) {
        array[index] = { ...array[index], textElement };
      }
    }),

  updateLanguage: (index, language) =>
    set((state) => {
      const array = state.profile?.functionalProfile?.legibleDescription;
      if (array?.[index] && language !== undefined) {
        array[index] = { ...array[index], language };
      }
    }),

  updateUri: (index, uri) =>
    set((state) => {
      const array = state.profile?.functionalProfile?.legibleDescription;
      if (array?.[index]) {
        array[index] = { ...array[index], uri: normalizeString(uri) };
      }
    }),

  addEmptyLegibleDescription: () =>
    set((state) => {
      if (state.profile?.functionalProfile) {
        const list = ensureArray(
          state.profile.functionalProfile.legibleDescription,
          () => []
        );
        if (list.length < 4) {
          list.push(createEmptyLegibleDescription());
          state.profile.functionalProfile.legibleDescription = list;
        }
      }
    }),
});
