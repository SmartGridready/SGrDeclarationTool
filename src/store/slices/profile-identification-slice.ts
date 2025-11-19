import {
  FunctionalProfileFrame,
  FunctionalProfileIdentification,
} from "@/lib/models";

export interface FunctionalProfileIdentificationSlice {
  setFunctionalProfileIdentification: (
    functionalProfileIdentification: FunctionalProfileIdentification
  ) => void;
  updateSpecificationOwnerIdentification: (
    specificationOwnerIdentification: string | undefined
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
      if (state.profile) {
        state.profile.functionalProfile.functionalProfileIdentification =
          functionalProfileIdentification;
      }
    });
  },

  updateSpecificationOwnerIdentification: (specificationOwnerIdentification) =>
    set((state) => {
      if (state.profile) {
        state.profile.functionalProfile.functionalProfileIdentification.specificationOwnerIdentification =
          specificationOwnerIdentification as string;
      }
    }),
});
