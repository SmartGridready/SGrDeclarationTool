"use client";

import { AlternativeNamesForm as SharedAlternativeNamesForm } from "@/sections/shared/sections/alternative-names/alternative-names-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/sections/shared/hooks/use-device-validation";

export function AlternativeNamesForm() {
  return (
    <SharedAlternativeNamesForm
      useStore={useDeviceStore}
      useValidation={useDeviceValidation}
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
