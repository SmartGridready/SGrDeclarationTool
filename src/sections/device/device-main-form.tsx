"use client";

import { DeviceIdentificationForm } from "@/sections/device/device-identification/device-identification-form";
import { ReleaseNotesForm } from "@/sections/device/release-notes/release-notes-form";
import { DeviceInformationForm } from "@/sections/device/device-information/device-information-form";
import { useDeviceFormContext } from "@/context/device-form-context";
import { ConfigurationListForm } from "@/sections/device/configuration-list/configuration-list-form";
import { GenericAttributeListForm } from "@/sections/device/generic-attribute-list/generic-attribute-list-form";
import { InterfaceListForm } from "@/sections/device/interface-list/interface-list-form";

/**
 * Shared Device Form
 * This form can be used in different contexts.
 *
 * It requires a DeviceFormContext to be provided by a parent component.
 */
export function DeviceForm() {
  const { useDeviceState } = useDeviceFormContext();
  const device = useDeviceState((d) => d);

  if (!device) {
    return null;
  }

  return (
    <div className="space-y-6">
      <DeviceIdentificationForm />
      <ReleaseNotesForm />
      <DeviceInformationForm />
      <ConfigurationListForm />
      <GenericAttributeListForm />
      <InterfaceListForm />
    </div>
  );
}
