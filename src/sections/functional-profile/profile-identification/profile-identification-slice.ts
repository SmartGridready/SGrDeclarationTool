import { FunctionalProfileFrame } from "@/models";
import {
  createFunctionalProfileIdentificationSlice as createGenericFunctionalProfileIdentificationSlice,
  FunctionalProfileIdentificationSlice,
} from "@/sections/shared/profile-identification/profile-identification-slice";

// Re-export the interface for convenience
export type { FunctionalProfileIdentificationSlice } from "@/sections/shared/profile-identification/profile-identification-slice";

/**
 * Creates a functional profile identification slice specifically for functional profile stores
 * This is a convenience function that pre-configures the getter
 */
export function createFunctionalProfileIdentificationSlice<TState extends { profile?: FunctionalProfileFrame }>(
  set: (fn: (state: TState) => void) => void
): FunctionalProfileIdentificationSlice {
  return createGenericFunctionalProfileIdentificationSlice(set, (state) => state.profile?.functionalProfile);
}
