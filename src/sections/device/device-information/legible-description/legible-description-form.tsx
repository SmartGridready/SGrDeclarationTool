"use client";

import { LegibleDescriptionForm as SharedLegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";

/**
 * Device specific legible description form.
 * Uses the DeviceFormContext to connect to the store.
 */
export function LegibleDescriptionForm() {
  const { useDeviceState, useValidation, deviceInformationActions, pathPrefix } = useDeviceFormContext();

  const device = useDeviceState((d) => d);
  const useStore = createDeviceStoreAdapter(device, deviceInformationActions);

  const fieldPathPrefix = buildDeviceFieldPath(pathPrefix, "deviceInformation.legibleDescription");

  return (
    <SharedLegibleDescriptionForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        legibleDescriptions: store.device?.deviceInformation?.legibleDescription,
      })}
      isAddedSelector={(store) => !!store.device?.deviceInformation?.legibleDescription}
      fieldPathPrefix={fieldPathPrefix}
      required={false}
      title="Legible Description"
      description="Human-readable descriptions for the device (max 4)"
      nested={true}
      maxItems={4}
    />
  );
}
