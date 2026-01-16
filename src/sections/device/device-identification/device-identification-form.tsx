"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField, useHasDevice } from "@/hooks/use-store-field";

export function DeviceIdentificationForm() {
  // Granular field selectors - only re-render when specific field changes
  const hasDevice = useHasDevice();
  const deviceName = useDeviceField((d) => d?.deviceName);
  const manufacturerName = useDeviceField((d) => d?.manufacturerName);
  const specificationOwnerIdentification = useDeviceField((d) => d?.specificationOwnerIdentification);

  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  if (!hasDevice) {
    return null;
  }

  return (
    <FormSection title="Device Identification" description="Basic identification data of the device" required={true}>
      <FormGroup>
        <InputField
          label="Device Name"
          name="deviceName"
          required={true}
          type="text"
          value={deviceName ?? ""}
          onChange={(value) => store.updateDeviceName(value)}
          error={getError("deviceName")}
        />
        <InputField
          label="Manufacturer Name"
          name="manufacturerName"
          required={false}
          type="text"
          value={manufacturerName ?? ""}
          onChange={(value) => store.updateManufacturerName(value || undefined)}
          error={getError("manufacturerName")}
        />
      </FormGroup>

      <FormGroup>
        <InputField
          label="Specification Owner Identification"
          name="specificationOwnerIdentification"
          required={true}
          type="text"
          value={specificationOwnerIdentification ?? ""}
          onChange={(value) => store.updateSpecificationOwnerIdentification(value)}
          error={getError("specificationOwnerIdentification")}
        />
      </FormGroup>
    </FormSection>
  );
}
