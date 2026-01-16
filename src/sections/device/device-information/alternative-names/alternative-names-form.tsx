"use client";

import { AlternativeNamesForm as SharedAlternativeNamesForm } from "@/sections/shared/alternative-names/alternative-names-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";
import { useHasDevice, useDeviceField } from "@/hooks/use-store-field";

/**
 * Device specific alternative names form.
 * Uses the device store directly.
 */
export function AlternativeNamesForm() {
  const hasDevice = useHasDevice();
  // Subscribe only to alternativeNames section for targeted re-renders
  const alternativeNames = useDeviceField((d) => d?.deviceInformation?.alternativeNames);
  const store = useDeviceStore.getState();
  const useStore = createDeviceStoreAdapter(store.device, store);
  const useValidation = useDeviceValidation;

  void alternativeNames;

  if (!hasDevice) {
    return null;
  }

  return (
    <SharedAlternativeNamesForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        alternativeNames: store.device?.deviceInformation?.alternativeNames,
      })}
      isAddedSelector={(store) => !!store.device?.deviceInformation?.alternativeNames}
      fieldPathPrefix="deviceInformation.alternativeNames"
      required={false}
      title="Alternative Names"
      description="Alternative naming conventions for the device"
      nested={true}
    />
  );
}
