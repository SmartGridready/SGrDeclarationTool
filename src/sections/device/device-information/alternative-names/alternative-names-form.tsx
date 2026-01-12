"use client";

import { AlternativeNamesForm as SharedAlternativeNamesForm } from "@/sections/shared/alternative-names/alternative-names-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";
import { useShallow } from "zustand/react/shallow";

/**
 * Device specific alternative names form.
 * Uses the device store directly.
 */
export function AlternativeNamesForm() {
  const device = useDeviceStore(useShallow((state) => state.device));
  const store = useDeviceStore.getState();
  const useStore = createDeviceStoreAdapter(device, store);
  const useValidation = useDeviceValidation;

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
