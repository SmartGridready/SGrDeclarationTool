import { useShallow } from "zustand/react/shallow";
import { useDeviceStore, DeviceStoreState } from "@/sections/device/device-store";
import { useProfileStore, ProfileStoreState } from "@/sections/functional-profile/functional-profile-store";
import { DeviceFrame } from "@/models";
import { FunctionalProfileFrame } from "@/models";

/**
 * Helper hook for granular field selection from the device store.
 * Uses shallow comparison to prevent unnecessary re-renders when the selected
 * value is an object or array that hasn't actually changed.
 */
export function useDeviceField<T>(selector: (device: DeviceFrame | undefined) => T): T {
  return useDeviceStore(useShallow((state) => selector(state.device)));
}

/**
 * Helper hook for granular field selection from the profile store.
 * Uses shallow comparison to prevent unnecessary re-renders when the selected
 * value is an object or array that hasn't actually changed.
 */
export function useProfileField<T>(selector: (profile: FunctionalProfileFrame | undefined) => T): T {
  return useProfileStore(useShallow((state) => selector(state.profile)));
}

/**
 * Helper hook to check if a device exists in the store.
 * Useful for conditional rendering.
 */
export function useHasDevice(): boolean {
  return useDeviceStore((state) => !!state.device);
}

/**
 * Helper hook to check if a profile exists in the store.
 * Useful for conditional rendering.
 */
export function useHasProfile(): boolean {
  return useProfileStore((state) => !!state.profile);
}

/**
 * Helper hook for selecting a specific action from the device store.
 * Actions are stable references and won't cause re-renders.
 */
export function useDeviceAction<T>(selector: (state: DeviceStoreState) => T): T {
  return useDeviceStore(selector);
}

/**
 * Helper hook for selecting a specific action from the profile store.
 * Actions are stable references and won't cause re-renders.
 */
export function useProfileAction<T>(selector: (state: ProfileStoreState) => T): T {
  return useProfileStore(selector);
}
