import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { DeviceFrame } from "@/models";
import { createEmptyDevice } from "@/utils/factory-utils";
import {
  createDeviceIdentificationSlice,
  DeviceIdentificationSlice,
} from "@/sections/device/device-identification/device-identification-slice";
import {
  createReleaseNotesSliceForDevice,
  ReleaseNotesSlice,
} from "@/sections/device/release-notes/release-notes-slice";
import {
  createDeviceInformationSlice,
  DeviceInformationSlice,
} from "@/sections/device/device-information/device-information-slice";
import {
  createConfigurationListSlice,
  ConfigurationListSlice,
} from "@/sections/device/configuration-list/configuration-list-slice";
import { createGenericAttributeListSlice } from "@/sections/device/generic-attribute-list/generic-attribute-list-slice";
import { GenericAttributeListProductSlice } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";
import { createInterfaceListSlice, InterfaceListSlice } from "@/sections/device/interface-list/interface-list-slice";

interface DeviceStore {
  device?: DeviceFrame;
  setDevice: (device: DeviceFrame | undefined) => void;
  createEmpty: () => void;
  clear: () => void;
}

export type DeviceStoreState = DeviceStore &
  DeviceIdentificationSlice &
  ReleaseNotesSlice &
  DeviceInformationSlice &
  ConfigurationListSlice &
  GenericAttributeListProductSlice &
  InterfaceListSlice;

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
      ...createReleaseNotesSliceForDevice(set),
      ...createDeviceInformationSlice(set),
      ...createConfigurationListSlice(set),
      ...createGenericAttributeListSlice(set),
      ...createInterfaceListSlice(set),
    })),
    {
      name: "sgr-device-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist the device state, not the action objects with functions
      partialize: (state) => ({ device: state.device }),
    }
  )
);
