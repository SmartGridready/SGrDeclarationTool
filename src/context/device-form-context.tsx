"use client";

import { createContext, useContext, ReactNode } from "react";
import { DeviceFrame } from "@/models";

// Re-export slice types for consumers
export type { DeviceIdentificationSlice } from "@/sections/device/device-identification/device-identification-slice";
export type { DeviceInformationSlice } from "@/sections/device/device-information/device-information-slice";
export type { ReleaseNotesSlice } from "@/sections/shared/release-notes/release-notes-slice";
export type { ConfigurationListSlice } from "@/sections/device/configuration-list/configuration-list-slice";
export type { GenericAttributeListProductSlice } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";
export type { InterfaceListSlice } from "@/sections/device/interface-list/interface-list-slice";
export type { ModbusInterfaceDescriptionSlice } from "@/sections/device/interface-list/modbus-interface/interface-description/interface-description-slice";
export type { ModbusTcpSlice } from "@/sections/device/interface-list/modbus-interface/interface-description/modbus-tcp/modbus-tcp-slice";
export type { ModbusRtuSlice } from "@/sections/device/interface-list/modbus-interface/interface-description/modbus-rtu/modbus-rtu-slice";
export type { MasterFunctionsSupportedListSlice } from "@/sections/device/interface-list/modbus-interface/interface-description/master-functions-supported-list/master-functions-supported-list-slice";
export type { SerialInterfaceCapabilitySlice } from "@/sections/device/interface-list/modbus-interface/interface-description/modbus-rtu/serial-interface-capability/serial-interface-capability-slice";

import type { DeviceIdentificationSlice } from "@/sections/device/device-identification/device-identification-slice";
import type { DeviceInformationSlice } from "@/sections/device/device-information/device-information-slice";
import type { ReleaseNotesSlice } from "@/sections/shared/release-notes/release-notes-slice";
import type { ConfigurationListSlice } from "@/sections/device/configuration-list/configuration-list-slice";
import type { GenericAttributeListProductSlice } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";
import type { InterfaceListSlice } from "@/sections/device/interface-list/interface-list-slice";
import type { ModbusInterfaceDescriptionSlice } from "@/sections/device/interface-list/modbus-interface/interface-description/interface-description-slice";
import type { ModbusTcpSlice } from "@/sections/device/interface-list/modbus-interface/interface-description/modbus-tcp/modbus-tcp-slice";
import type { ModbusRtuSlice } from "@/sections/device/interface-list/modbus-interface/interface-description/modbus-rtu/modbus-rtu-slice";
import type { MasterFunctionsSupportedListSlice } from "@/sections/device/interface-list/modbus-interface/interface-description/master-functions-supported-list/master-functions-supported-list-slice";
import type { SerialInterfaceCapabilitySlice } from "@/sections/device/interface-list/modbus-interface/interface-description/modbus-rtu/serial-interface-capability/serial-interface-capability-slice";

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

  /**
   * Generic attribute list actions, already bound to the correct path.
   */
  genericAttributeListActions: GenericAttributeListProductSlice;

  /**
   * Interface list actions, already bound to the correct path.
   */
  interfaceListActions: InterfaceListSlice;

  /**
   * Modbus interface description actions, already bound to the correct path.
   */
  modbusInterfaceDescriptionActions: ModbusInterfaceDescriptionSlice;

  /**
   * Modbus TCP actions, already bound to the correct path.
   */
  modbusTcpActions: ModbusTcpSlice;

  /**
   * Modbus RTU actions, already bound to the correct path.
   */
  modbusRtuActions: ModbusRtuSlice;

  /**
   * Master functions supported list actions, already bound to the correct path.
   */
  masterFunctionsSupportedListActions: MasterFunctionsSupportedListSlice;

  /**
   * Serial interface capability actions, already bound to the correct path.
   */
  serialInterfaceCapabilityActions: SerialInterfaceCapabilitySlice;
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
