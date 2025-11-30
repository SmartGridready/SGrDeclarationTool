import { DeviceFrame } from "@/models/product/product";
import { AlternativeNamesSlice } from "@/sections/shared/sections/alternative-names/alternative-names-slice";
import { LegibleDescriptionSlice } from "@/sections/shared/sections/legible-description/legible-description-slice";
import { createAlternativeNamesSliceForDevice } from "@/sections/device/device-information/alternative-names/alternative-names-slice";
import { createLegibleDescriptionSliceForDevice } from "@/sections/device/device-information/legible-description/legible-description-slice";

type DeviceSliceStoreState = {
  device?: DeviceFrame;
};

type SetState = (fn: (state: DeviceSliceStoreState) => void) => void;

export type DeviceInformationSlice = AlternativeNamesSlice & LegibleDescriptionSlice;

/**
 * Creates a device information slice that includes alternative names and legible descriptions
 */
export const createDeviceInformationSlice = (set: SetState): DeviceInformationSlice => {
  // Create the alternative names slice
  const alternativeNamesSlice = createAlternativeNamesSliceForDevice(set);
  // Create the legible description slice
  const legibleDescriptionSlice = createLegibleDescriptionSliceForDevice(set);

  // Return the combined slice
  return {
    ...alternativeNamesSlice,
    ...legibleDescriptionSlice,
    // Add other device information methods here as needed
  };
};
