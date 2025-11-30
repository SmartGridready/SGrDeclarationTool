import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { FunctionalProfileFrame } from "@/models";
import {
  createSampleFunctionalProfile,
  createEmpty as createEmptyProfile,
} from "@/sections/shared/factory";
import {
  createReleaseNotesSliceForProfile,
  ReleaseNotesSlice,
} from "@/sections/functional-profile/release-notes/release-notes-slice";
import {
  createFunctionalProfileIdentificationSlice,
  FunctionalProfileIdentificationSlice,
} from "@/sections/functional-profile/profile-identification/profile-identification-slice";
import {
  createAlternativeNamesSliceForProfile,
  AlternativeNamesSlice,
} from "@/sections/functional-profile/alternative-names/alternative-names-slice";
import {
  createLegibleDescriptionSliceForProfile,
  LegibleDescriptionSlice,
} from "@/sections/functional-profile/legible-description/legible-description-slice";
import {
  createGenericAttributeListSlice,
  GenericAttributeListSlice,
} from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-slice";
import {
  createDataPointListSlice,
  DataPointListSlice,
} from "@/sections/functional-profile/data-point-list/data-point-list-slice";

interface ProfileStore {
  profile?: FunctionalProfileFrame;
  setProfile: (profile: FunctionalProfileFrame | undefined) => void;
  createNew: () => void;
  createEmpty: () => void;
  clear: () => void;
}

export type StoreState = ProfileStore &
  ReleaseNotesSlice &
  FunctionalProfileIdentificationSlice &
  AlternativeNamesSlice &
  LegibleDescriptionSlice &
  GenericAttributeListSlice &
  DataPointListSlice;

export const useProfileStore = create<StoreState>()(
  persist(
    immer((set) => ({
      profile: undefined,

      setProfile: (profile) =>
        set((state) => {
          state.profile = profile;
        }),

      createNew: () =>
        set((state) => {
          state.profile = createSampleFunctionalProfile();
        }),

      createEmpty: () =>
        set((state) => {
          state.profile = createEmptyProfile();
        }),

      clear: () =>
        set((state) => {
          state.profile = undefined;
        }),

      ...createReleaseNotesSliceForProfile(set),
      ...createFunctionalProfileIdentificationSlice(set),
      ...createAlternativeNamesSliceForProfile(set),
      ...createLegibleDescriptionSliceForProfile(set),
      ...createGenericAttributeListSlice(set),
      ...createDataPointListSlice(set),
    })),
    {
      name: "sgr-profile-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
