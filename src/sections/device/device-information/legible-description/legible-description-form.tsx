"use client";

import { LegibleDescriptionForm as SharedLegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";
import { useShallow } from "zustand/react/shallow";

/**
 * Device specific legible description form.
 * Uses the device store directly.
 */
export function LegibleDescriptionForm() {
  const device = useDeviceStore(useShallow((state) => state.device));
  const store = useDeviceStore.getState();
  const useStore = createDeviceStoreAdapter(device, store);
  const useValidation = useDeviceValidation;

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
