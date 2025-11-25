import { FunctionalProfileFrame, LegibleDescription, Language } from "@/models";

export interface LegibleDescriptionSlice {
  // Main operations
  addLegibleDescription: (legibleDescription: LegibleDescription) => void;
  removeLegibleDescription: (index: number) => void;

  // Field-specific updates
  updateTextElement: (index: number, textElement: string) => void;
  updateLanguage: (index: number, language: Language) => void;
  updateUri: (index: number, uri: string | undefined) => void;

  // Convenience methods
  addEmptyLegibleDescription: () => void;
}

type StoreState = {
  profile?: FunctionalProfileFrame;
};

type SetState = (fn: (state: StoreState) => void) => void;

/**
 * Creates a new empty LegibleDescription entry with default values
 */
function createEmptyLegibleDescription(): LegibleDescription {
  return {
    textElement: "",
    language: "en",
  };
}

export const createLegibleDescriptionSlice = (
  set: SetState
): LegibleDescriptionSlice => ({
  addLegibleDescription: (legibleDescription) =>
    set((state) => {
      if (state.profile?.functionalProfile) {
        if (!state.profile.functionalProfile.legibleDescription) {
          state.profile.functionalProfile.legibleDescription = [];
        }
        // Check maxOccurs="4" constraint
        if (state.profile.functionalProfile.legibleDescription.length < 4) {
          state.profile.functionalProfile.legibleDescription.push(
            legibleDescription
          );
        }
      }
    }),

  removeLegibleDescription: (index) =>
    set((state) => {
      const legibleDescriptionArray =
        state.profile?.functionalProfile?.legibleDescription;
      if (
        legibleDescriptionArray &&
        index >= 0 &&
        index < legibleDescriptionArray.length
      ) {
        legibleDescriptionArray.splice(index, 1);
        // Set to undefined if array becomes empty
        if (
          legibleDescriptionArray.length === 0 &&
          state.profile?.functionalProfile
        ) {
          state.profile.functionalProfile.legibleDescription = undefined;
        }
      }
    }),

  updateTextElement: (index, textElement) =>
    set((state) => {
      const legibleDescriptionArray =
        state.profile?.functionalProfile?.legibleDescription;
      if (legibleDescriptionArray?.[index]) {
        legibleDescriptionArray[index] = {
          ...legibleDescriptionArray[index],
          textElement: textElement,
        };
      }
    }),

  updateLanguage: (index, language) =>
    set((state) => {
      const legibleDescriptionArray =
        state.profile?.functionalProfile?.legibleDescription;
      if (legibleDescriptionArray?.[index] && language !== undefined) {
        legibleDescriptionArray[index] = {
          ...legibleDescriptionArray[index],
          language: language,
        };
      }
    }),

  updateUri: (index, uri) =>
    set((state) => {
      const legibleDescriptionArray =
        state.profile?.functionalProfile?.legibleDescription;
      if (legibleDescriptionArray?.[index]) {
        legibleDescriptionArray[index] = {
          ...legibleDescriptionArray[index],
          uri: !uri || uri.trim() === "" ? undefined : uri,
        };
      }
    }),

  addEmptyLegibleDescription: () =>
    set((state) => {
      if (state.profile?.functionalProfile) {
        if (!state.profile.functionalProfile.legibleDescription) {
          state.profile.functionalProfile.legibleDescription = [];
        }
        // Check maxOccurs="4" constraint
        if (state.profile.functionalProfile.legibleDescription.length < 4) {
          state.profile.functionalProfile.legibleDescription.push(
            createEmptyLegibleDescription()
          );
        }
      }
    }),
});
