import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { FunctionalProfileFrame } from "@/lib/models";
import {
  createSampleFunctionalProfile,
  createEmpty as createEmptyProfile,
} from "@/lib/utils/factory";
import {
  createReleaseNotesSlice,
  ReleaseNotesSlice,
} from "./slices/release-notes-slice";
import {
  createFunctionalProfileIdentificationSlice,
  FunctionalProfileIdentificationSlice,
} from "./slices/profile-identification-slice";

interface ProfileStore {
  profile?: FunctionalProfileFrame;
  setProfile: (profile: FunctionalProfileFrame | undefined) => void;
  createNew: () => void;
  createEmpty: () => void;
  clear: () => void;
}

type StoreState = ProfileStore &
  ReleaseNotesSlice &
  FunctionalProfileIdentificationSlice;

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
    })),
    {
      name: "sgr-profile-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
