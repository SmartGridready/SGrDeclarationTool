import {
  FunctionalProfileFrame,
  FunctionalProfileCategory,
  LevelOfOperation,
  SpecificationOwnerIdentification,
} from "@/lib/models";

export interface FunctionalProfileIdentificationSlice {
  // Field-specific updates
  updateSpecificationOwnerIdentification: (
    specificationOwnerIdentification:
      | SpecificationOwnerIdentification
      | undefined
  ) => void;
  updateFunctionalProfileCategory: (
    functionalProfileCategory: FunctionalProfileCategory | undefined
  ) => void;
  updateFunctionalProfileType: (
    functionalProfileType: string | undefined
  ) => void;
  updateLevelOfOperation: (
    levelOfOperation: LevelOfOperation | undefined
  ) => void;
  updatePrimaryVersionNumber: (
    primaryVersionNumber: number | undefined
  ) => void;
  updateSecondaryVersionNumber: (
    secondaryVersionNumber: number | undefined
  ) => void;
  updateSubReleaseVersionNumber: (
    subReleaseVersionNumber: number | undefined
  ) => void;
}

type StoreState = {
  profile?: FunctionalProfileFrame;
};

type SetState = (fn: (state: StoreState) => void) => void;

export const createFunctionalProfileIdentificationSlice = (
  set: SetState
): FunctionalProfileIdentificationSlice => ({
  updateSpecificationOwnerIdentification: (specificationOwnerIdentification) =>
    set((state) => {
      if (state.profile && specificationOwnerIdentification !== undefined) {
        state.profile.functionalProfile.functionalProfileIdentification.specificationOwnerIdentification =
          specificationOwnerIdentification;
      }
    }),

  updateFunctionalProfileCategory: (functionalProfileCategory) =>
    set((state) => {
      if (state.profile && functionalProfileCategory !== undefined) {
        state.profile.functionalProfile.functionalProfileIdentification.functionalProfileCategory =
          functionalProfileCategory;
      }
    }),

  updateFunctionalProfileType: (functionalProfileType) =>
    set((state) => {
      if (state.profile && functionalProfileType !== undefined) {
        state.profile.functionalProfile.functionalProfileIdentification.functionalProfileType =
          functionalProfileType;
      }
    }),

  updateLevelOfOperation: (levelOfOperation) =>
    set((state) => {
      if (state.profile && levelOfOperation !== undefined) {
        state.profile.functionalProfile.functionalProfileIdentification.levelOfOperation =
          levelOfOperation;
      }
    }),

  updatePrimaryVersionNumber: (primaryVersionNumber) =>
    set((state) => {
      if (state.profile && primaryVersionNumber !== undefined) {
        state.profile.functionalProfile.functionalProfileIdentification.versionNumber.primaryVersionNumber =
          primaryVersionNumber;
      }
    }),

  updateSecondaryVersionNumber: (secondaryVersionNumber) =>
    set((state) => {
      if (state.profile && secondaryVersionNumber !== undefined) {
        state.profile.functionalProfile.functionalProfileIdentification.versionNumber.secondaryVersionNumber =
          secondaryVersionNumber;
      }
    }),

  updateSubReleaseVersionNumber: (subReleaseVersionNumber) =>
    set((state) => {
      if (state.profile && subReleaseVersionNumber !== undefined) {
        state.profile.functionalProfile.functionalProfileIdentification.versionNumber.subReleaseVersionNumber =
          subReleaseVersionNumber;
      }
    }),
});
