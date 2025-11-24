import {
  FunctionalProfileFrame,
  FunctionalProfileCategory,
  LevelOfOperation,
  SpecificationOwnerIdentification,
} from "@/models";

export interface FunctionalProfileIdentificationSlice {
  // Field-specific updates
  updateSpecificationOwnerIdentification: (
    specificationOwnerIdentification: SpecificationOwnerIdentification
  ) => void;
  updateFunctionalProfileCategory: (
    functionalProfileCategory: FunctionalProfileCategory
  ) => void;
  updateFunctionalProfileType: (functionalProfileType: string) => void;
  updateLevelOfOperation: (levelOfOperation: LevelOfOperation) => void;
  updatePrimaryVersionNumber: (primaryVersionNumber: number) => void;
  updateSecondaryVersionNumber: (secondaryVersionNumber: number) => void;
  updateSubReleaseVersionNumber: (subReleaseVersionNumber: number) => void;
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
