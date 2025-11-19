import {
  FunctionalProfileFrame,
  FunctionalProfileIdentification,
  FunctionalProfileCategory,
  LevelOfOperation,
} from "@/lib/models";

export interface FunctionalProfileIdentificationSlice {
  setFunctionalProfileIdentification: (
    functionalProfileIdentification: FunctionalProfileIdentification
  ) => void;
  updateSpecificationOwnerIdentification: (
    specificationOwnerIdentification: string | undefined
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
  setFunctionalProfileIdentification: (functionalProfileIdentification) => {
    set((state) => {
      if (state.profile?.functionalProfile) {
        state.profile.functionalProfile.functionalProfileIdentification =
          functionalProfileIdentification;
      }
    });
  },

  updateSpecificationOwnerIdentification: (specificationOwnerIdentification) =>
    set((state) => {
      if (state.profile?.functionalProfile?.functionalProfileIdentification) {
        state.profile.functionalProfile.functionalProfileIdentification.specificationOwnerIdentification =
          specificationOwnerIdentification as string;
      }
    }),

  updateFunctionalProfileCategory: (functionalProfileCategory) =>
    set((state) => {
      if (state.profile?.functionalProfile?.functionalProfileIdentification) {
        state.profile.functionalProfile.functionalProfileIdentification.functionalProfileCategory =
          functionalProfileCategory as FunctionalProfileCategory;
      }
    }),

  updateFunctionalProfileType: (functionalProfileType) =>
    set((state) => {
      if (state.profile?.functionalProfile?.functionalProfileIdentification) {
        state.profile.functionalProfile.functionalProfileIdentification.functionalProfileType =
          functionalProfileType as string;
      }
    }),

  updateLevelOfOperation: (levelOfOperation) =>
    set((state) => {
      if (state.profile?.functionalProfile?.functionalProfileIdentification) {
        state.profile.functionalProfile.functionalProfileIdentification.levelOfOperation =
          levelOfOperation as LevelOfOperation;
      }
    }),

  updatePrimaryVersionNumber: (primaryVersionNumber) =>
    set((state) => {
      const identification =
        state.profile?.functionalProfile?.functionalProfileIdentification;
      if (identification) {
        identification.versionNumber.primaryVersionNumber =
          primaryVersionNumber as number;
      }
    }),

  updateSecondaryVersionNumber: (secondaryVersionNumber) =>
    set((state) => {
      const identification =
        state.profile?.functionalProfile?.functionalProfileIdentification;
      if (identification) {
        identification.versionNumber.secondaryVersionNumber =
          secondaryVersionNumber as number;
      }
    }),

  updateSubReleaseVersionNumber: (subReleaseVersionNumber) =>
    set((state) => {
      const identification =
        state.profile?.functionalProfile?.functionalProfileIdentification;
      if (identification) {
        identification.versionNumber.subReleaseVersionNumber =
          subReleaseVersionNumber as number;
      }
    }),
});
