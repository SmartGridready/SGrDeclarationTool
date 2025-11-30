import { FunctionalProfileFrame } from "@/models";
import {
  createLegibleDescriptionSlice,
  LegibleDescriptionSlice,
} from "@/sections/shared/sections/legible-description/legible-description-slice";

// Re-export the interface for convenience
export type { LegibleDescriptionSlice } from "@/sections/shared/sections/legible-description/legible-description-slice";

/**
 * Creates a legible description slice specifically for functional profile stores
 * This is a convenience function that sets up the getter/setter for profile.functionalProfile.legibleDescription
 */
export function createLegibleDescriptionSliceForProfile<
  TState extends { profile?: FunctionalProfileFrame },
>(set: (fn: (state: TState) => void) => void): LegibleDescriptionSlice {
  return createLegibleDescriptionSlice(
    set,
    (state) => state.profile?.functionalProfile.legibleDescription,
    (state, legibleDescriptions) => {
      if (state.profile) {
        state.profile.functionalProfile.legibleDescription = legibleDescriptions;
      }
    },
    4, // maxItems - legibleDescription has maxOccurs="4"
    true // isOptional - legibleDescription is optional in FunctionalProfile
  );
}
