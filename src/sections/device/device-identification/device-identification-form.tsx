"use client";

import { FormSection } from "@/sections/shared/components/forms/form-section";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { useFormSection } from "@/sections/shared/hooks/use-form-section";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/sections/shared/hooks/use-device-validation";

export function DeviceIdentificationForm() {
  const { state, actions, getError } = useFormSection({
    useStore: useDeviceStore,
    useValidation: useDeviceValidation,
    stateSelector: (store) => ({
      deviceName: store.device?.deviceName,
      manufacturerName: store.device?.manufacturerName,
      specificationOwnerIdentification: store.device?.specificationOwnerIdentification,
    }),
    actionsSelector: (store) => ({
      updateDeviceName: store.updateDeviceName,
      updateManufacturerName: store.updateManufacturerName,
      updateSpecificationOwnerIdentification: store.updateSpecificationOwnerIdentification,
    }),
  });

  if (!state.deviceName && !state.specificationOwnerIdentification) {
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
          value={state.deviceName}
          onChange={(value) => actions.updateDeviceName(value)}
          error={getError("deviceName")}
        />
        <InputField
          label="Manufacturer Name"
          name="manufacturerName"
          required={false}
          type="text"
          value={state.manufacturerName || ""}
          onChange={(value) => actions.updateManufacturerName(value || undefined)}
          error={getError("manufacturerName")}
        />
      </FormGroup>

      <FormGroup>
        <InputField
          label="Specification Owner Identification"
          name="specificationOwnerIdentification"
          required={true}
          type="text"
          value={state.specificationOwnerIdentification}
          onChange={(value) => actions.updateSpecificationOwnerIdentification(value)}
          error={getError("specificationOwnerIdentification")}
        />
      </FormGroup>
    </FormSection>
  );
}
