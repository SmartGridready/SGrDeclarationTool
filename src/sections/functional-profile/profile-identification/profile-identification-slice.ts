import {
  FunctionalProfileCategory,
  LevelOfOperation,
  SpecificationOwnerIdentification,
} from "@/models";
import { SetState } from "@/sections/shared/utils/slice-utils";

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

export const createFunctionalProfileIdentificationSlice = (
  set: SetState
): FunctionalProfileIdentificationSlice => ({
  updateSpecificationOwnerIdentification: (value) =>
    set((state) => {
      if (state.profile?.functionalProfile) {
        state.profile.functionalProfile.functionalProfileIdentification.specificationOwnerIdentification =
          value;
      }
    }),

  updateFunctionalProfileCategory: (value) =>
    set((state) => {
      if (state.profile?.functionalProfile) {
        state.profile.functionalProfile.functionalProfileIdentification.functionalProfileCategory =
          value;
      }
    }),

  updateFunctionalProfileType: (value) =>
    set((state) => {
      if (state.profile?.functionalProfile) {
        state.profile.functionalProfile.functionalProfileIdentification.functionalProfileType =
          value;
      }
    }),

  updateLevelOfOperation: (value) =>
    set((state) => {
      if (state.profile?.functionalProfile) {
        state.profile.functionalProfile.functionalProfileIdentification.levelOfOperation = value;
      }
    }),

  updatePrimaryVersionNumber: (value) =>
    set((state) => {
      if (state.profile?.functionalProfile) {
        state.profile.functionalProfile.functionalProfileIdentification.versionNumber.primaryVersionNumber =
          value;
      }
    }),

  updateSecondaryVersionNumber: (value) =>
    set((state) => {
      if (state.profile?.functionalProfile) {
        state.profile.functionalProfile.functionalProfileIdentification.versionNumber.secondaryVersionNumber =
          value;
      }
    }),

  updateSubReleaseVersionNumber: (value) =>
    set((state) => {
      if (state.profile?.functionalProfile) {
        state.profile.functionalProfile.functionalProfileIdentification.versionNumber.subReleaseVersionNumber =
          value;
      }
    }),
});
