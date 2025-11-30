"use client";

import { FormSection } from "@/sections/shared/components/forms/form-section";
import { AlternativeNamesForm } from "@/sections/device/device-information/alternative-names/alternative-names-form";
import { useDeviceStore } from "@/sections/device/device-store";

export function DeviceInformationForm() {
  const { device } = useDeviceStore();

  if (!device) {
    return null;
  }

  return (
    <FormSection
      title="Device Information"
      description="Additional information about the device"
      required={false}
      isAdded={true}
      defaultOpen={true}
    >
      <AlternativeNamesForm />
    </FormSection>
  );
}
