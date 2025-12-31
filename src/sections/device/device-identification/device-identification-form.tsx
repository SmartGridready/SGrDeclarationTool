"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";

export function DeviceIdentificationForm() {
  const { useDeviceState, useValidation, pathPrefix, deviceIdentificationActions } = useDeviceFormContext();

  const device = useDeviceState((d) => d);
  const { getError } = useValidation();

  if (!device) {
    return null;
  }

  const fieldPath = (field: string) => buildDeviceFieldPath(pathPrefix, field);

  return (
    <FormSection title="Device Identification" description="Basic identification data of the device" required={true}>
      <FormGroup>
        <InputField
          label="Device Name"
          name="deviceName"
          required={true}
          type="text"
          value={device.deviceName}
          onChange={(value) => deviceIdentificationActions.updateDeviceName(value)}
          error={getError(fieldPath("deviceName"))}
        />
        <InputField
          label="Manufacturer Name"
          name="manufacturerName"
          required={false}
          type="text"
          value={device.manufacturerName || ""}
          onChange={(value) => deviceIdentificationActions.updateManufacturerName(value || undefined)}
          error={getError(fieldPath("manufacturerName"))}
        />
      </FormGroup>

      <FormGroup>
        <InputField
          label="Specification Owner Identification"
          name="specificationOwnerIdentification"
          required={true}
          type="text"
          value={device.specificationOwnerIdentification}
          onChange={(value) => deviceIdentificationActions.updateSpecificationOwnerIdentification(value)}
          error={getError(fieldPath("specificationOwnerIdentification"))}
        />
      </FormGroup>
    </FormSection>
  );
}
