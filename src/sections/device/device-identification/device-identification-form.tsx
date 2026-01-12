"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useShallow } from "zustand/react/shallow";

export function DeviceIdentificationForm() {
  const device = useDeviceStore(useShallow((state) => state.device));
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  if (!device) {
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
          value={device.deviceName}
          onChange={(value) => store.updateDeviceName(value)}
          error={getError("deviceName")}
        />
        <InputField
          label="Manufacturer Name"
          name="manufacturerName"
          required={false}
          type="text"
          value={device.manufacturerName || ""}
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
          value={device.specificationOwnerIdentification}
          onChange={(value) => store.updateSpecificationOwnerIdentification(value)}
          error={getError("specificationOwnerIdentification")}
        />
      </FormGroup>
    </FormSection>
  );
}
