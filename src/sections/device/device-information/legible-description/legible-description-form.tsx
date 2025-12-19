"use client";

import { LegibleDescriptionForm as SharedLegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { DeviceStoreState } from "@/sections/device/device-store";

/**
 * Device specific legible description form.
 * Uses the DeviceFormContext to connect to the store.
 */
export function LegibleDescriptionForm() {
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
    ? buildDeviceFieldPath(pathPrefix, "deviceInformation.legibleDescription")
    : "deviceInformation.legibleDescription";

  return (
    <SharedLegibleDescriptionForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        legibleDescriptions: store.device?.deviceInformation?.legibleDescription,
      })}
      isAddedSelector={(store) => !!store.device?.deviceInformation?.legibleDescription}
      fieldPathPrefix={fullPathPrefix}
      required={false}
      title="Legible Description"
      description="Human-readable descriptions for the device (max 4)"
      nested={true}
      maxItems={4}
    />
  );
}
