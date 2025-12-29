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
export type { ModbusAttributesSlice } from "@/sections/shared/modbus-attributes/modbus-attributes-slice";
export type { ScalingFactorSlice } from "@/sections/shared/modbus-attributes/scaling-factor/scaling-factor-slice";
export type { AccessProtectionSlice } from "@/sections/shared/modbus-attributes/access-protection/access-protection-slice";
export type { ModbusInterfaceSlice } from "@/sections/device/interface-list/modbus-interface/modbus-interface-slice";
export type { ModbusFunctionalProfileListSlice } from "@/sections/device/interface-list/modbus-interface/functional-profile-list/modbus-functional-profile-list-slice";
export type { TimeSyncBlockNotificationSlice } from "@/sections/device/interface-list/modbus-interface/time-sync-block-notification/time-sync-block-notification-slice";
export type { RestApiInterfaceSlice } from "@/sections/device/interface-list/rest-api-interface/rest-api-interface-slice";
export type { RestApiFunctionalProfileListSlice } from "@/sections/device/interface-list/rest-api-interface/functional-profile-list/rest-api-functional-profile-list-slice";
export type { RestApiInterfaceDescriptionSlice } from "@/sections/device/interface-list/rest-api-interface/interface-description/interface-description-slice";

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
import type { ModbusAttributesSlice } from "@/sections/shared/modbus-attributes/modbus-attributes-slice";
import type { ScalingFactorSlice } from "@/sections/shared/modbus-attributes/scaling-factor/scaling-factor-slice";
import type { AccessProtectionSlice } from "@/sections/shared/modbus-attributes/access-protection/access-protection-slice";
import type { ModbusInterfaceSlice } from "@/sections/device/interface-list/modbus-interface/modbus-interface-slice";
import type { ModbusFunctionalProfileListSlice } from "@/sections/device/interface-list/modbus-interface/functional-profile-list/modbus-functional-profile-list-slice";
import type { TimeSyncBlockNotificationSlice } from "@/sections/device/interface-list/modbus-interface/time-sync-block-notification/time-sync-block-notification-slice";
import type { RestApiInterfaceSlice } from "@/sections/device/interface-list/rest-api-interface/rest-api-interface-slice";
import type { RestApiFunctionalProfileListSlice } from "@/sections/device/interface-list/rest-api-interface/functional-profile-list/rest-api-functional-profile-list-slice";
import type { RestApiInterfaceDescriptionSlice } from "@/sections/device/interface-list/rest-api-interface/interface-description/interface-description-slice";

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

  /**
   * Modbus attributes actions, already bound to the correct path.
   */
  modbusAttributesActions: ModbusAttributesSlice;

  /**
   * Scaling factor actions, already bound to the correct path.
   */
  scalingFactorActions: ScalingFactorSlice;

  /**
   * Access protection actions, already bound to the correct path.
   */
  accessProtectionActions: AccessProtectionSlice;

  /**
   * Modbus interface actions (includes functional profile list and data point list).
   */
  modbusInterfaceActions: ModbusInterfaceSlice;

  /**
   * Functional profile list actions for modbus interface.
   */
  functionalProfileListActions: ModbusFunctionalProfileListSlice;

  /**
   * Time sync block notification actions for modbus interface.
   */
  timeSyncBlockNotificationActions: TimeSyncBlockNotificationSlice;

  /**
   * REST API interface actions (includes functional profile list and interface description).
   */
  restApiInterfaceActions: RestApiInterfaceSlice;

  /**
   * Functional profile list actions for REST API interface.
   */
  restApiFunctionalProfileListActions: RestApiFunctionalProfileListSlice;

  /**
   * REST API interface description actions.
   */
  restApiInterfaceDescriptionActions: RestApiInterfaceDescriptionSlice;
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
