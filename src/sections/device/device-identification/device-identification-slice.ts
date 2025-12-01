import { SpecificationOwnerIdentification, DeviceFrame } from "@/models";

type DeviceSliceStoreState = {
  device?: DeviceFrame;
};

type SetState = (fn: (state: DeviceSliceStoreState) => void) => void;

export interface DeviceIdentificationSlice {
  updateDeviceName: (deviceName: string) => void;
  updateManufacturerName: (manufacturerName: string | undefined) => void;
  updateSpecificationOwnerIdentification: (
    specificationOwnerIdentification: SpecificationOwnerIdentification
  ) => void;
}

export const createDeviceIdentificationSlice = (set: SetState): DeviceIdentificationSlice => ({
  updateDeviceName: (value) =>
    set((state) => {
      if (state.device) {
        state.device.deviceName = value;
      }
    }),

  updateManufacturerName: (value) =>
    set((state) => {
      if (state.device) {
        state.device.manufacturerName = value;
      }
    }),

  updateSpecificationOwnerIdentification: (value) =>
    set((state) => {
      if (state.device) {
        state.device.specificationOwnerIdentification = value;
      }
    }),
});
