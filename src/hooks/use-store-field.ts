import { useShallow } from "zustand/react/shallow";
import { useDeviceStore, DeviceStoreState } from "@/sections/device/device-store";
import { useProfileStore, ProfileStoreState } from "@/sections/functional-profile/functional-profile-store";
import { DeviceFrame } from "@/models";
import { FunctionalProfileFrame } from "@/models";

/**
 * Hook for granular field selection from the device store with shallow comparison.
 */
export function useDeviceField<T>(selector: (device: DeviceFrame | undefined) => T): T {
  return useDeviceStore(useShallow((state) => selector(state.device)));
}

/**
 * Hook for granular field selection from the profile store with shallow comparison.
 */
export function useProfileField<T>(selector: (profile: FunctionalProfileFrame | undefined) => T): T {
  return useProfileStore(useShallow((state) => selector(state.profile)));
}

/**
 * Hook to check if a device exists in the store.
 */
export function useHasDevice(): boolean {
  return useDeviceStore((state) => !!state.device);
}

/**
 * Hook to check if a profile exists in the store.
 */
export function useHasProfile(): boolean {
  return useProfileStore((state) => !!state.profile);
}

/**
 * Hook for selecting an action from the device store.
 */
export function useDeviceAction<T>(selector: (state: DeviceStoreState) => T): T {
  return useDeviceStore(selector);
}

/**
 * Hook for selecting an action from the profile store.
 */
export function useProfileAction<T>(selector: (state: ProfileStoreState) => T): T {
  return useProfileStore(selector);
}
