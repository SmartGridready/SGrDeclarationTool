"use client";

import { createContext, useContext, ReactNode } from "react";
import { DeviceFrame } from "@/models";

// Re-export slice types for consumers
export type { DeviceIdentificationSlice } from "@/sections/device/device-identification/device-identification-slice";
export type { DeviceInformationSlice } from "@/sections/device/device-information/device-information-slice";
export type { ReleaseNotesSlice } from "@/sections/shared/release-notes/release-notes-slice";
export type { ConfigurationListSlice } from "@/sections/device/configuration-list/configuration-list-slice";

import type { DeviceIdentificationSlice } from "@/sections/device/device-identification/device-identification-slice";
import type { DeviceInformationSlice } from "@/sections/device/device-information/device-information-slice";
import type { ReleaseNotesSlice } from "@/sections/shared/release-notes/release-notes-slice";
import type { ConfigurationListSlice } from "@/sections/device/configuration-list/configuration-list-slice";

/**
 * Context value for device forms.
 * This allows the same form components to work in different contexts.
 */
export interface DeviceFormContextValue {
  /**
   * Hook to select state from the device.
   * The selector receives the DeviceFrame (or undefined if not loaded).
   */
  useDeviceState: <T>(selector: (device: DeviceFrame | undefined) => T) => T;

  /**
   * Hook to get validation errors.
   * Returns an object with getError method that accepts a field path.
   */
  useValidation: () => { getError: (fieldPath: string) => string | undefined };

  /**
   * Path prefix for validation error field paths.
   * Usually empty string for standalone device editor.
   */
  pathPrefix: string;

  /**
   * Device identification actions, already bound to the correct path.
   */
  deviceIdentificationActions: DeviceIdentificationSlice;

  /**
   * Device information actions (includes alternative names, legible description, and programmer hints).
   */
  deviceInformationActions: DeviceInformationSlice;

  /**
   * Release notes actions, already bound to the correct path.
   */
  releaseNotesActions: ReleaseNotesSlice;

  /**
   * Configuration list actions, already bound to the correct path.
   */
  configurationListActions: ConfigurationListSlice;
}

const DeviceFormContext = createContext<DeviceFormContextValue | null>(null);

/**
 * Hook to access the device form context.
 * Must be used within a DeviceFormProvider.
 */
export function useDeviceFormContext(): DeviceFormContextValue {
  const context = useContext(DeviceFormContext);
  if (!context) {
    throw new Error("useDeviceFormContext must be used within a DeviceFormProvider");
  }
  return context;
}

/**
 * Provider props
 */
export interface DeviceFormProviderProps {
  children: ReactNode;
  value: DeviceFormContextValue;
}

/**
 * Provider component for device form context.
 */
export function DeviceFormProvider({ children, value }: DeviceFormProviderProps) {
  return <DeviceFormContext.Provider value={value}>{children}</DeviceFormContext.Provider>;
}

/**
 * Helper to build a prefixed field path for validation errors.
 */
export function buildDeviceFieldPath(prefix: string, fieldPath: string): string {
  if (!prefix) return fieldPath;
  if (!fieldPath) return prefix;
  return `${prefix}.${fieldPath}`;
}
