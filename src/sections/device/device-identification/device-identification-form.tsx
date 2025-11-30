"use client";

import { FormSection } from "@/sections/shared/components/forms/form-section";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { useDeviceStore } from "@/sections/device/device-store";

export function DeviceIdentificationForm() {
  const {
    device,
    updateDeviceName,
    updateManufacturerName,
    updateSpecificationOwnerIdentification,
  } = useDeviceStore();

  if (!device) {
    return null;
  }

  return (
    <FormSection
      title="Device Identification"
      description="Basic identification data of the device"
      required={true}
      defaultOpen={true}
    >
      <FormGroup>
        <InputField
          label="Device Name"
          name="deviceName"
          required={true}
          type="text"
          value={device.deviceName}
          onChange={(value) => updateDeviceName(value)}
        />
        <InputField
          label="Manufacturer Name"
          name="manufacturerName"
          required={false}
          type="text"
          value={device.manufacturerName || ""}
          onChange={(value) => updateManufacturerName(value || undefined)}
        />
      </FormGroup>

      <FormGroup>
        <InputField
          label="Specification Owner Identification"
          name="specificationOwnerIdentification"
          required={true}
          type="text"
          value={device.specificationOwnerIdentification}
          onChange={(value) => updateSpecificationOwnerIdentification(value)}
        />
      </FormGroup>
    </FormSection>
  );
}
