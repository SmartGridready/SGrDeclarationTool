import { DeviceFrame } from "@/models";
import {
  createAlternativeNamesSlice,
  AlternativeNamesSlice,
} from "@/sections/shared/alternative-names/alternative-names-slice";

// Re-export the interface for convenience
export type { AlternativeNamesSlice } from "@/sections/shared/alternative-names/alternative-names-slice";

/**
 * Creates an alternative names slice specifically for device stores
 * This is a convenience function that sets up the getter/setter for device.deviceInformation.alternativeNames
 */
export function createAlternativeNamesSliceForDevice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): AlternativeNamesSlice {
  return createAlternativeNamesSlice(
    set,
    (state) => state.device?.deviceInformation?.alternativeNames,
    (state, alternativeNames) => {
      if (state.device?.deviceInformation) {
        state.device.deviceInformation.alternativeNames = alternativeNames;
      }
    },
    true // isOptional - alternativeNames is optional in DeviceInformation
  );
}
