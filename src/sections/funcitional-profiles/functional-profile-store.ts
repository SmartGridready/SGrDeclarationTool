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
} from "@/sections/funcitional-profiles/release-notes/release-notes-slice";
import {
  createFunctionalProfileIdentificationSlice,
  FunctionalProfileIdentificationSlice,
} from "@/sections/funcitional-profiles/profile-identification/profile-identification-slice";
import {
  createAlternativeNamesSlice,
  AlternativeNamesSlice,
} from "@/sections/funcitional-profiles/alternative-names/alternative-names-slice";

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
  AlternativeNamesSlice;

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
    })),
    {
      name: "sgr-profile-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
