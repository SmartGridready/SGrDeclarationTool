import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { FunctionalProfileFrame } from "@/lib/models";
import { createEmptyFunctionalProfile } from "@/lib/utils/factory";
import {
  createReleaseNotesSlice,
  ReleaseNotesSlice,
} from "./slices/release-notes-slice";

interface ProfileStore {
  profile?: FunctionalProfileFrame;
  setProfile: (profile: FunctionalProfileFrame | undefined) => void;
  createNew: () => void;
  clear: () => void;
}

type StoreState = ProfileStore & ReleaseNotesSlice;

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
          state.profile = createEmptyFunctionalProfile();
        }),

      clear: () =>
        set((state) => {
          state.profile = undefined;
        }),

      ...createReleaseNotesSlice(set),
    })),
    {
      name: "sgr-profile-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
