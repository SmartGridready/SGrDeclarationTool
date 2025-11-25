import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { FunctionalProfileFrame } from "@/models";
import {
  createSampleFunctionalProfile,
  createEmpty as createEmptyProfile,
} from "@/sections/shared/factory";
import {
  createReleaseNotesSlice,
  ReleaseNotesSlice,
} from "@/sections/functional-profile/release-notes/release-notes-slice";
import {
  createFunctionalProfileIdentificationSlice,
  FunctionalProfileIdentificationSlice,
} from "@/sections/functional-profile/profile-identification/profile-identification-slice";
import {
  createAlternativeNamesSlice,
  AlternativeNamesSlice,
} from "@/sections/functional-profile/alternative-names/alternative-names-slice";
import {
  createLegibleDescriptionSlice,
  LegibleDescriptionSlice,
} from "@/sections/functional-profile/legible-description/legible-description-slice";

interface ProfileStore {
  profile?: FunctionalProfileFrame;
  setProfile: (profile: FunctionalProfileFrame | undefined) => void;
  createNew: () => void;
  createEmpty: () => void;
  clear: () => void;
}

type StoreState = ProfileStore &
  ReleaseNotesSlice &
  FunctionalProfileIdentificationSlice &
  AlternativeNamesSlice &
  LegibleDescriptionSlice;

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

      ...createReleaseNotesSlice(set),
      ...createFunctionalProfileIdentificationSlice(set),
      ...createAlternativeNamesSlice(set),
      ...createLegibleDescriptionSlice(set),
    })),
    {
      name: "sgr-profile-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
