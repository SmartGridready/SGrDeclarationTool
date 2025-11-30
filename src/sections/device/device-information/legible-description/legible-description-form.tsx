"use client";

import { LegibleDescriptionForm as SharedLegibleDescriptionForm } from "@/sections/shared/sections/legible-description/legible-description-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/sections/shared/hooks/use-device-validation";

export function LegibleDescriptionForm() {
  return (
    <SharedLegibleDescriptionForm
      useStore={useDeviceStore}
      useValidation={useDeviceValidation}
      stateSelector={(store) => ({
        legibleDescriptions: store.device?.deviceInformation?.legibleDescription,
      })}
      fieldPathPrefix="deviceInformation.legibleDescription"
      required={false}
      title="Legible Description"
      description="Human-readable descriptions for the device (max 4)"
      nested={true}
      maxItems={4}
    />
  );
}
