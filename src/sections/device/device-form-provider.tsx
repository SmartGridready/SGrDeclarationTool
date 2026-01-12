"use client";

import { ReactNode, useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { DeviceFormProvider, DeviceFormContextValue } from "@/context/device-form-context";
import { useDeviceStore, DeviceStoreState } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";

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
  // Get the store instance once and cache it in a ref.
  // Actions are stable function references in Zustand, so we only need to get them once.
  // Using getState() doesn't subscribe to changes, preventing re-renders on state updates.
  const storeRef = useRef<DeviceStoreState | null>(null);
  if (!storeRef.current) {
    storeRef.current = useDeviceStore.getState();
  }
  const store = storeRef.current;

  // Create the context value - pass store slices directly instead of explicit action mapping
  // Store actions are stable, so this memo will only recreate if the store reference changes (which it won't)
  const contextValue = useMemo<DeviceFormContextValue>(() => {
    return {
      // State selector hook - stable reference defined at module level
      useDeviceState: useStandaloneDeviceState,

      // Validation hook
      useValidation: useDeviceValidation,

      // No prefix for standalone device
      pathPrefix: "",

      // Pass store slices directly - store already implements these interfaces
      // Actions are stable function references, so passing the store object is safe
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
      functionalProfileListActions: store,
      timeSyncBlockNotificationActions: store,
      restApiInterfaceActions: store,
      restApiFunctionalProfileListActions: store,
      restApiInterfaceDescriptionActions: store,
      messagingFunctionalProfileListActions: store,
      messagingInterfaceDescriptionActions: store,
      messageBrokerAuthenticationBasicActions: store,
      messageBrokerAuthenticationClientCertificateActions: store,
      contactInterfaceActions: store,
      contactFunctionalProfileListActions: store,
      contactInterfaceDescriptionActions: store,
      genericInterfaceActions: store,
      genericFunctionalProfileListActions: store,
    };
  }, [store]);

  return <DeviceFormProvider value={contextValue}>{children}</DeviceFormProvider>;
}
