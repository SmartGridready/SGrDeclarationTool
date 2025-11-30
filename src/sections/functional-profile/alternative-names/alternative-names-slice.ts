import { FunctionalProfileFrame } from "@/models";
import {
  createAlternativeNamesSlice,
  AlternativeNamesSlice,
} from "@/sections/shared/sections/alternative-names/alternative-names-slice";

// Re-export the interface for convenience
export type { AlternativeNamesSlice } from "@/sections/shared/sections/alternative-names/alternative-names-slice";

// Re-export the helper function for convenience
export { updateAlternativeNamesField } from "@/sections/shared/sections/alternative-names/alternative-names-slice";

/**
 * Creates an alternative names slice specifically for functional profile stores
 * This is a convenience function that sets up the getter/setter for profile.functionalProfile.alternativeNames
 */
export function createAlternativeNamesSliceForProfile<
  TState extends { profile?: FunctionalProfileFrame },
>(set: (fn: (state: TState) => void) => void): AlternativeNamesSlice {
  return createAlternativeNamesSlice(
    set,
    (state) => state.profile?.functionalProfile.alternativeNames,
    (state, alternativeNames) => {
      if (state.profile) {
        state.profile.functionalProfile.alternativeNames = alternativeNames;
      }
    },
    true // isOptional - alternativeNames is optional in FunctionalProfile
  );
}
