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

  // Create the context value with memoization for actions only
  const contextValue = useMemo<DeviceFormContextValue>(() => {
    return {
      // State selector hook - stable reference defined at module level
      useDeviceState: useStandaloneDeviceState,

      // Validation hook
      useValidation: useDeviceValidation,

      // No prefix for standalone device
      pathPrefix: "",

      // Device identification actions
      deviceIdentificationActions: {
        updateDeviceName: store.updateDeviceName,
        updateManufacturerName: store.updateManufacturerName,
        updateSpecificationOwnerIdentification: store.updateSpecificationOwnerIdentification,
      },

      // Device information actions (includes all sub-slices)
      deviceInformationActions: {
        // Core device info
        updateDeviceCategory: store.updateDeviceCategory,
        updateIsLocalControl: store.updateIsLocalControl,
        updateSoftwareRevision: store.updateSoftwareRevision,
        updateHardwareRevision: store.updateHardwareRevision,
        updateBrandName: store.updateBrandName,
        updatePowerSource: store.updatePowerSource,
        updateNominalPower: store.updateNominalPower,
        updateManufacturerSpecificationIdentification:
          store.updateManufacturerSpecificationIdentification,
        updateManufacturerLabel: store.updateManufacturerLabel,
        updateGeneralRemarks: store.updateGeneralRemarks,
        updateLevelOfOperation: store.updateLevelOfOperation,
        updatePrimaryVersionNumber: store.updatePrimaryVersionNumber,
        updateSecondaryVersionNumber: store.updateSecondaryVersionNumber,
        updateSubReleaseVersionNumber: store.updateSubReleaseVersionNumber,
        updateTestState: store.updateTestState,
        // Alternative names (composed) - using shared interface
        addAlternativeNames: store.addAlternativeNames,
        removeAlternativeNames: store.removeAlternativeNames,
        updateSLV1Name: store.updateSLV1Name,
        updateWorkName: store.updateWorkName,
        updateManufName: store.updateManufName,
        updateIec61850Name: store.updateIec61850Name,
        updateSarefName: store.updateSarefName,
        updateEebusName: store.updateEebusName,
        updateSunSpecName: store.updateSunSpecName,
        updateHpBwpName: store.updateHpBwpName,
        updateEn17609Name: store.updateEn17609Name,
        // Legible description (composed) - using shared interface
        addLegibleDescription: store.addLegibleDescription,
        removeLegibleDescription: store.removeLegibleDescription,
        removeAllLegibleDescriptions: store.removeAllLegibleDescriptions,
        updateTextElement: store.updateTextElement,
        updateLanguage: store.updateLanguage,
        updateUri: store.updateUri,
        addEmptyLegibleDescription: store.addEmptyLegibleDescription,
        // Programmer hints (composed) - using shared pattern
        addProgrammerHint: store.addProgrammerHint,
        removeProgrammerHint: store.removeProgrammerHint,
        removeAllProgrammerHints: store.removeAllProgrammerHints,
        updateProgrammerHintTextElement: store.updateProgrammerHintTextElement,
        updateProgrammerHintLanguage: store.updateProgrammerHintLanguage,
        updateProgrammerHintUri: store.updateProgrammerHintUri,
        addEmptyProgrammerHint: store.addEmptyProgrammerHint,
      },

      // Release notes actions
      releaseNotesActions: {
        addReleaseNotes: store.addReleaseNotes,
        removeReleaseNotes: store.removeReleaseNotes,
        updateReleaseState: store.updateReleaseState,
        updateRemarks: store.updateRemarks,
        addChangeLog: store.addChangeLog,
        removeChangeLog: store.removeChangeLog,
        updateChangeLogField: store.updateChangeLogField,
        addEmptyChangeLog: store.addEmptyChangeLog,
      },
    };
  }, [store]);

  return <DeviceFormProvider value={contextValue}>{children}</DeviceFormProvider>;
}
