import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { DeviceFrame } from "@/models/product/product";
import { createSampleDevice, createEmptyDevice } from "@/sections/shared/factory";

interface DeviceStore {
  device?: DeviceFrame;
  setDevice: (device: DeviceFrame | undefined) => void;
  createNew: () => void;
  createEmpty: () => void;
  clear: () => void;
}

export type DeviceStoreState = DeviceStore;

export const useDeviceStore = create<DeviceStoreState>()(
  persist(
    immer((set) => ({
      device: undefined,

      setDevice: (device) =>
        set((state) => {
          state.device = device;
        }),

      createNew: () =>
        set((state) => {
          state.device = createSampleDevice();
        }),

      createEmpty: () =>
        set((state) => {
          state.device = createEmptyDevice();
        }),

      clear: () =>
        set((state) => {
          state.device = undefined;
        }),
    })),
    {
      name: "sgr-device-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
