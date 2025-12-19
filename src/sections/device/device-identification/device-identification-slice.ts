import { DeviceFrame, SpecificationOwnerIdentification } from "@/models";

export interface DeviceIdentificationSlice {
  updateDeviceName: (deviceName: string) => void;
  updateManufacturerName: (manufacturerName: string | undefined) => void;
  updateSpecificationOwnerIdentification: (
    specificationOwnerIdentification: SpecificationOwnerIdentification
  ) => void;
}

/**
 * Creates a device identification slice specifically for device stores
 * This is a convenience function that pre-configures the getters/setters
 */
export function createDeviceIdentificationSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): DeviceIdentificationSlice {
  const getDevice = (state: TState) => state.device;

  return {
    updateDeviceName: (value) =>
      set((state) => {
        const device = getDevice(state);
        if (device) device.deviceName = value;
      }),

    updateManufacturerName: (value) =>
      set((state) => {
        const device = getDevice(state);
        if (device) device.manufacturerName = value;
      }),

    updateSpecificationOwnerIdentification: (value) =>
      set((state) => {
        const device = getDevice(state);
        if (device) device.specificationOwnerIdentification = value;
      }),
  };
}
