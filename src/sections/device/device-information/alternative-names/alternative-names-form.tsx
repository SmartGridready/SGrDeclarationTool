"use client";

import { AlternativeNamesForm as SharedAlternativeNamesForm } from "@/sections/shared/alternative-names/alternative-names-form";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { DeviceStoreState } from "@/sections/device/device-store";

/**
 * Device specific alternative names form.
 * Uses the DeviceFormContext to connect to the store.
 */
export function AlternativeNamesForm() {
  const { useDeviceState, useValidation, deviceInformationActions, pathPrefix } =
    useDeviceFormContext();

  // Create a store hook adapter
  const useStore = <TSelected,>(selector: (store: DeviceStoreState) => TSelected): TSelected => {
    const device = useDeviceState((d) => d);
    const adaptedStore = {
      device,
      ...deviceInformationActions,
    } as DeviceStoreState;
    return selector(adaptedStore);
  };

  const fullPathPrefix = pathPrefix
    ? buildDeviceFieldPath(pathPrefix, "deviceInformation.alternativeNames")
    : "deviceInformation.alternativeNames";

  return (
    <SharedAlternativeNamesForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        alternativeNames: store.device?.deviceInformation?.alternativeNames,
      })}
      isAddedSelector={(store) => !!store.device?.deviceInformation?.alternativeNames}
      fieldPathPrefix={fullPathPrefix}
      required={false}
      title="Alternative Names"
      description="Alternative naming conventions for the device"
      nested={true}
    />
  );
}
