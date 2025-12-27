"use client";

import { ReactNode, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { DeviceFormProvider, DeviceFormContextValue } from "@/context/device-form-context";
import { useDeviceStore, DeviceStoreState } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-device-validation";

interface StandaloneDeviceFormProviderProps {
  children: ReactNode;
}

/**
 * Custom hook for standalone device state selection with shallow comparison.
 * Uses useShallow to prevent infinite loops when selectors return objects.
 * Defined at module level so it's a stable reference.
 */
function useStandaloneDeviceState<T>(selector: (device: DeviceStoreState["device"]) => T): T {
  // Use useShallow to do shallow comparison of returned objects
  return useDeviceStore(useShallow((state) => selector(state.device)));
}

/**
 * Provider for standalone Device editor.
 * Wraps the useDeviceStore to provide the DeviceFormContext.
 */
export function StandaloneDeviceFormProvider({ children }: StandaloneDeviceFormProviderProps) {
  // Get actions from the store (these are stable references)
  const store = useDeviceStore();

  // Create the context value - pass store slices directly instead of explicit action mapping
  const contextValue = useMemo<DeviceFormContextValue>(() => {
    return {
      // State selector hook - stable reference defined at module level
      useDeviceState: useStandaloneDeviceState,

      // Validation hook
      useValidation: useDeviceValidation,

      // No prefix for standalone device
      pathPrefix: "",

      // Pass store slices directly - store already implements these interfaces
      deviceIdentificationActions: store,
      deviceInformationActions: store,
      releaseNotesActions: store,
      configurationListActions: store,
      genericAttributeListActions: store,
      interfaceListActions: store,
      modbusInterfaceDescriptionActions: store,
      modbusTcpActions: store,
      modbusRtuActions: store,
      serialInterfaceCapabilityActions: store,
      masterFunctionsSupportedListActions: store,
      modbusAttributesActions: store,
      scalingFactorActions: store,
      accessProtectionActions: store,
      modbusInterfaceActions: store,
      functionalProfileListActions: store.functionalProfileListActions,
    };
  }, [store]);

  return <DeviceFormProvider value={contextValue}>{children}</DeviceFormProvider>;
}
