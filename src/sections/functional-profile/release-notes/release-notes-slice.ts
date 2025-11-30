import { FunctionalProfileFrame } from "@/models";
import {
  createReleaseNotesSlice,
  ReleaseNotesSlice,
} from "@/sections/shared/sections/release-notes/release-notes-slice";

// Re-export the interface for convenience
export type { ReleaseNotesSlice } from "@/sections/shared/sections/release-notes/release-notes-slice";

/**
 * Creates a release notes slice specifically for functional profile stores
 * This is a convenience function that sets up the getter/setter for profile.releaseNotes
 */
export function createReleaseNotesSliceForProfile<
  TState extends { profile?: FunctionalProfileFrame },
>(set: (fn: (state: TState) => void) => void): ReleaseNotesSlice {
  return createReleaseNotesSlice(
    set,
    (state) => state.profile?.releaseNotes,
    (state, releaseNotes) => {
      if (state.profile) {
        state.profile.releaseNotes = releaseNotes;
      }
    },
    true // isOptional - releaseNotes is optional in FunctionalProfileFrame
  );
}
