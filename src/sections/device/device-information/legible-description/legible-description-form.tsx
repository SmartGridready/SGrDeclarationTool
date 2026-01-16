"use client";

import { LegibleDescriptionForm as SharedLegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";
import { useHasDevice, useDeviceField } from "@/hooks/use-store-field";

/**
 * Device specific legible description form.
 * Uses the device store directly.
 */
export function LegibleDescriptionForm() {
  const hasDevice = useHasDevice();
  // Subscribe only to legibleDescription section for targeted re-renders
  const legibleDescription = useDeviceField((d) => d?.deviceInformation?.legibleDescription);
  const store = useDeviceStore.getState();
  const useStore = createDeviceStoreAdapter(store.device, store);
  const useValidation = useDeviceValidation;

  void legibleDescription;

  if (!hasDevice) {
    return null;
  }

  return (
    <SharedLegibleDescriptionForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        legibleDescriptions: store.device?.deviceInformation?.legibleDescription,
      })}
      isAddedSelector={(store) => !!store.device?.deviceInformation?.legibleDescription}
      fieldPathPrefix="deviceInformation.legibleDescription"
      required={false}
      title="Legible Description"
      description="Human-readable descriptions for the device (max 4)"
      nested={true}
      maxItems={4}
    />
  );
}
