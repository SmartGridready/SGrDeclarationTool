import { DeviceFrame } from "@/models/product/product";
import {
  createLegibleDescriptionSlice,
  LegibleDescriptionSlice,
} from "@/sections/shared/sections/legible-description/legible-description-slice";

// Re-export the interface for convenience
export type { LegibleDescriptionSlice } from "@/sections/shared/sections/legible-description/legible-description-slice";

/**
 * Creates a legible description slice specifically for device stores
 * This is a convenience function that sets up the getter/setter for device.deviceInformation.legibleDescription
 */
export function createLegibleDescriptionSliceForDevice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): LegibleDescriptionSlice {
  return createLegibleDescriptionSlice(
    set,
    (state) => state.device?.deviceInformation.legibleDescription,
    (state, legibleDescriptions) => {
      if (state.device) {
        state.device.deviceInformation.legibleDescription = legibleDescriptions;
      }
    },
    4, // maxItems - legibleDescription has maxOccurs="4"
    true // isOptional - legibleDescription is optional in DeviceInformation
  );
}
