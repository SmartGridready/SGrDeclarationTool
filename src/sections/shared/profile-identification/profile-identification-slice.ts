import {
  FunctionalProfileIdentification,
  FunctionalProfileCategory,
  LevelOfOperation,
  SpecificationOwnerIdentification,
} from "@/models";

/**
 * Represents the functional profile portion of a frame
 * This is the nested structure inside FunctionalProfileFrame.functionalProfile
 */
export interface FunctionalProfileContainer {
  functionalProfileIdentification: FunctionalProfileIdentification;
}

export interface FunctionalProfileIdentificationSlice {
  // Field-specific updates
  updateSpecificationOwnerIdentification: (
    specificationOwnerIdentification: SpecificationOwnerIdentification
  ) => void;
  updateFunctionalProfileCategory: (functionalProfileCategory: FunctionalProfileCategory) => void;
  updateFunctionalProfileType: (functionalProfileType: string) => void;
  updateLevelOfOperation: (levelOfOperation: LevelOfOperation) => void;
  updatePrimaryVersionNumber: (primaryVersionNumber: number) => void;
  updateSecondaryVersionNumber: (secondaryVersionNumber: number) => void;
  updateSubReleaseVersionNumber: (subReleaseVersionNumber: number) => void;
}

/**
 * Creates a generic functional profile identification slice that works with any store state
 * @param set - The Zustand set function
 * @param getFunctionalProfile - Function to get the functionalProfile container from the store state
 */
export function createFunctionalProfileIdentificationSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getFunctionalProfile: (state: TState) => FunctionalProfileContainer | undefined
): FunctionalProfileIdentificationSlice {
  return {
    updateSpecificationOwnerIdentification: (value) =>
      set((state) => {
        const fp = getFunctionalProfile(state);
        if (fp) {
          fp.functionalProfileIdentification.specificationOwnerIdentification = value;
        }
      }),

    updateFunctionalProfileCategory: (value) =>
      set((state) => {
        const fp = getFunctionalProfile(state);
        if (fp) {
          fp.functionalProfileIdentification.functionalProfileCategory = value;
        }
      }),

    updateFunctionalProfileType: (value) =>
      set((state) => {
        const fp = getFunctionalProfile(state);
        if (fp) {
          fp.functionalProfileIdentification.functionalProfileType = value;
        }
      }),

    updateLevelOfOperation: (value) =>
      set((state) => {
        const fp = getFunctionalProfile(state);
        if (fp) {
          fp.functionalProfileIdentification.levelOfOperation = value;
        }
      }),

    updatePrimaryVersionNumber: (value) =>
      set((state) => {
        const fp = getFunctionalProfile(state);
        if (fp) {
          fp.functionalProfileIdentification.versionNumber.primaryVersionNumber = value;
        }
      }),

    updateSecondaryVersionNumber: (value) =>
      set((state) => {
        const fp = getFunctionalProfile(state);
        if (fp) {
          fp.functionalProfileIdentification.versionNumber.secondaryVersionNumber = value;
        }
      }),

    updateSubReleaseVersionNumber: (value) =>
      set((state) => {
        const fp = getFunctionalProfile(state);
        if (fp) {
          fp.functionalProfileIdentification.versionNumber.subReleaseVersionNumber = value;
        }
      }),
  };
}
