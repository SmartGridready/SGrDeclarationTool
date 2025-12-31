"use client";

import { AlternativeNamesForm as SharedAlternativeNamesForm } from "@/sections/shared/alternative-names/alternative-names-form";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";

/**
 * Device specific alternative names form.
 * Uses the DeviceFormContext to connect to the store.
 */
export function AlternativeNamesForm() {
  const { useDeviceState, useValidation, deviceInformationActions, pathPrefix } = useDeviceFormContext();

  const device = useDeviceState((d) => d);
  const useStore = createDeviceStoreAdapter(device, deviceInformationActions);

  const fieldPathPrefix = buildDeviceFieldPath(pathPrefix, "deviceInformation.alternativeNames");

  return (
    <SharedAlternativeNamesForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        alternativeNames: store.device?.deviceInformation?.alternativeNames,
      })}
      isAddedSelector={(store) => !!store.device?.deviceInformation?.alternativeNames}
      fieldPathPrefix={fieldPathPrefix}
      required={false}
      title="Alternative Names"
      description="Alternative naming conventions for the device"
      nested={true}
    />
  );
}
