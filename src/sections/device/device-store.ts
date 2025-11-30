import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { DeviceFrame } from "@/models/product/product";
import { createEmptyDevice } from "@/sections/shared/factory";
import {
  createDeviceIdentificationSlice,
  DeviceIdentificationSlice,
} from "@/sections/device/device-identification/device-identification-slice";

interface DeviceStore {
  device?: DeviceFrame;
  setDevice: (device: DeviceFrame | undefined) => void;
  createEmpty: () => void;
  clear: () => void;
}

export type DeviceStoreState = DeviceStore & DeviceIdentificationSlice;

export const useDeviceStore = create<DeviceStoreState>()(
  persist(
    immer((set) => ({
      device: undefined,

      setDevice: (device) =>
        set((state) => {
          state.device = device;
        }),

      createEmpty: () =>
        set((state) => {
          state.device = createEmptyDevice();
        }),

      clear: () =>
        set((state) => {
          state.device = undefined;
        }),

      ...createDeviceIdentificationSlice(set),
    })),
    {
      name: "sgr-device-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
