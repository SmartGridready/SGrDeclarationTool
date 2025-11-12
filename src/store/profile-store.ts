import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  createReleaseNotesSlice,
  ReleaseNotesSlice,
} from "./functional-profile";

export type ProfileSlice = ReleaseNotesSlice;

export const useProfileStore = create<ProfileSlice>()(
  persist(
    immer((set, get, api) => ({
      ...createReleaseNotesSlice(set, get, api),
    })),
    {
      name: "sgr-profile-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
