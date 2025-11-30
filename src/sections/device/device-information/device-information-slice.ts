import { DeviceFrame } from "@/models/product/product";
import { AlternativeNamesSlice } from "@/sections/shared/sections/alternative-names/alternative-names-slice";
import { createAlternativeNamesSliceForDevice } from "@/sections/device/device-information/alternative-names/alternative-names-slice";

type DeviceSliceStoreState = {
  device?: DeviceFrame;
};

type SetState = (fn: (state: DeviceSliceStoreState) => void) => void;

export type DeviceInformationSlice = AlternativeNamesSlice;

/**
 * Creates a device information slice that includes alternative names
 */
export const createDeviceInformationSlice = (set: SetState): DeviceInformationSlice => {
  // Create the alternative names slice
  const alternativeNamesSlice = createAlternativeNamesSliceForDevice(set);

  // Return the combined slice
  return {
    ...alternativeNamesSlice,
    // Add other device information methods here as needed
  };
};
