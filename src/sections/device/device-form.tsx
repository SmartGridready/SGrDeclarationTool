"use client";

import { DeviceIdentificationForm } from "@/sections/device/device-identification/device-identification-form";
import { ReleaseNotesForm } from "@/sections/device/release-notes/release-notes-form";
import { DeviceInformationForm } from "@/sections/device/device-information/device-information-form";
import { ConfigurationListForm } from "@/sections/device/configuration-list/configuration-list-form";
import { GenericAttributeListForm } from "@/sections/device/generic-attribute-list/generic-attribute-list-form";
import { InterfaceListForm } from "@/sections/device/interface-list/interface-list-form";
import { useHasDevice } from "@/hooks/use-store-field";

/**
 * Standalone Device Form
 * Uses the device store directly.
 */
export function DeviceForm() {
  const hasDevice = useHasDevice();

  if (!hasDevice) {
    return null;
  }
  return (
    <>
      <DeviceIdentificationForm />
      <ReleaseNotesForm />
      <DeviceInformationForm />
      <ConfigurationListForm />
      <GenericAttributeListForm />
      <InterfaceListForm />
    </>
  );
}
