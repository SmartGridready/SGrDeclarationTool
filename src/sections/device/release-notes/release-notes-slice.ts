import { DeviceFrame } from "@/models";
import { createReleaseNotesSlice, ReleaseNotesSlice } from "@/sections/shared/release-notes/release-notes-slice";

// Re-export the interface for convenience
export type { ReleaseNotesSlice } from "@/sections/shared/release-notes/release-notes-slice";

/**
 * Creates a release notes slice specifically for device stores
 * This is a convenience function that sets up the getter/setter for device.releaseNotes
 */
export function createReleaseNotesSliceForDevice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ReleaseNotesSlice {
  return createReleaseNotesSlice(
    set,
    (state) => state.device?.releaseNotes,
    (state, releaseNotes) => {
      if (state.device && releaseNotes) {
        state.device.releaseNotes = releaseNotes;
      }
    },
    false // isOptional - releaseNotes is required in DeviceFrame
  );
}
