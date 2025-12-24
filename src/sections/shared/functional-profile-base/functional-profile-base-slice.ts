import { FunctionalProfileDescription, GenericAttributeListProduct } from "@/models";
import { createFunctionalProfileIdentificationSlice } from "@/sections/shared/profile-identification/profile-identification-slice";
import { createAlternativeNamesSlice } from "@/sections/shared/alternative-names/alternative-names-slice";
import { createLegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { createGenericAttributeListProductSlice } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";
import { FunctionalProfileIdentificationSlice } from "@/sections/shared/profile-identification/profile-identification-slice";
import { AlternativeNamesSlice } from "@/sections/shared/alternative-names/alternative-names-slice";
import { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { GenericAttributeListProductSlice } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";

export interface FunctionalProfileBaseSlice
  extends FunctionalProfileIdentificationSlice,
    AlternativeNamesSlice,
    LegibleDescriptionSlice,
    GenericAttributeListProductSlice {
  // Functional Profile Description fields
  updateFunctionalProfileName: (functionalProfileName: string) => void;
  // Programmer hints (also uses LegibleDescriptionSlice but needs separate slice instance)
  addProgrammerHint: () => void;
  removeProgrammerHint: (index: number) => void;
  removeAllProgrammerHints: () => void;
  updateProgrammerHintTextElement: (index: number, textElement: string) => void;
  updateProgrammerHintLanguage: (index: number, language: string) => void;
  updateProgrammerHintUri: (index: number, uri: string | undefined) => void;
}

/**
 * Represents the functional profile base portion of a frame
 * This is the nested structure inside FunctionalProfileBase
 */
export interface FunctionalProfileBaseContainer {
  functionalProfile: FunctionalProfileDescription;
  genericAttributeList?: GenericAttributeListProduct;
}

/**
 * Creates a functional profile base slice that works with any store state
 * @param set - The Zustand set function
 * @param getFunctionalProfileBase - Function to get the functionalProfileBase container from the store state
 */
export function createFunctionalProfileBaseSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getFunctionalProfileBase: (state: TState) => FunctionalProfileBaseContainer | undefined
): FunctionalProfileBaseSlice {
  // Helper to get functionalProfileDescription
  const getFunctionalProfileDescription = (
    state: TState
  ): FunctionalProfileDescription | undefined => getFunctionalProfileBase(state)?.functionalProfile;

  // Create nested slices
  const profileIdentificationSlice = createFunctionalProfileIdentificationSlice(set, (state) => {
    const fp = getFunctionalProfileDescription(state);
    if (!fp) return undefined;
    return {
      functionalProfileIdentification: fp.functionalProfileIdentification,
    };
  });

  const alternativeNamesSlice = createAlternativeNamesSlice(
    set,
    (state) => getFunctionalProfileDescription(state)?.alternativeNames,
    (state, value) => {
      const fp = getFunctionalProfileDescription(state);
      if (fp) {
        fp.alternativeNames = value;
      }
    },
    true // isOptional
  );

  const legibleDescriptionSlice = createLegibleDescriptionSlice(
    set,
    (state) => getFunctionalProfileDescription(state)?.legibleDescription,
    (state, value) => {
      const fp = getFunctionalProfileDescription(state);
      if (fp) {
        fp.legibleDescription = value;
      }
    },
    4, // maxItems
    true // isOptional
  );

  const genericAttributeListSlice = createGenericAttributeListProductSlice(
    set,
    (state) => getFunctionalProfileBase(state)?.genericAttributeList,
    (state, value) => {
      const fpBase = getFunctionalProfileBase(state);
      if (fpBase) {
        fpBase.genericAttributeList = value;
      }
    }
  );

  // Programmer hints slice (separate instance for programmerHints array)
  const programmerHintsSlice = createLegibleDescriptionSlice(
    set,
    (state) => getFunctionalProfileDescription(state)?.programmerHints,
    (state, value) => {
      const fp = getFunctionalProfileDescription(state);
      if (fp) {
        fp.programmerHints = value;
      }
    },
    4, // maxItems
    true // isOptional
  );

  return {
    ...profileIdentificationSlice,
    ...alternativeNamesSlice,
    ...legibleDescriptionSlice,
    ...genericAttributeListSlice,

    // Functional Profile Description fields
    updateFunctionalProfileName: (value) =>
      set((state) => {
        const fp = getFunctionalProfileDescription(state);
        if (fp) {
          fp.functionalProfileName = value;
        }
      }),

    // Programmer hints (delegate to programmerHintsSlice)
    addProgrammerHint: () => programmerHintsSlice.addEmptyLegibleDescription(),
    removeProgrammerHint: (index) => programmerHintsSlice.removeLegibleDescription(index),
    removeAllProgrammerHints: () => programmerHintsSlice.removeAllLegibleDescriptions(),
    updateProgrammerHintTextElement: (index, textElement) =>
      programmerHintsSlice.updateTextElement(index, textElement),
    updateProgrammerHintLanguage: (index, language) =>
      programmerHintsSlice.updateLanguage(index, language as "de" | "en" | "fr" | "it"),
    updateProgrammerHintUri: (index, uri) => programmerHintsSlice.updateUri(index, uri),
  };
}
