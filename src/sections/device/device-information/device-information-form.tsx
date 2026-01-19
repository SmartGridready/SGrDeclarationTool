"use client";

import { FormSection } from "@/components/forms/form-section";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { AlternativeNamesForm } from "@/sections/device/device-information/alternative-names/alternative-names-form";
import { LegibleDescriptionForm } from "@/sections/device/device-information/legible-description/legible-description-form";
import { ProgrammerHintsForm } from "@/sections/device/device-information/programmer-hints/programmer-hints-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";
import {
  DeviceCategory,
  LevelOfOperation,
  PowerSource,
  DEVICE_CATEGORY_VALUES,
  POWER_SOURCE_VALUES,
  LEVEL_OF_OPERATION_VALUES,
} from "@/models";
import { TestState, TEST_STATE_VALUES } from "@/models/product/product";
import { createFormOptions } from "@/utils/form-options-utils";

import { BOOLEAN_OPTIONS } from "@/models/generic";

const DEVICE_CATEGORY_OPTIONS = createFormOptions(DEVICE_CATEGORY_VALUES);
const POWER_SOURCE_OPTIONS = createFormOptions(POWER_SOURCE_VALUES);
const TEST_STATE_OPTIONS = createFormOptions(TEST_STATE_VALUES);
const LEVEL_OF_OPERATION_OPTIONS = createFormOptions(LEVEL_OF_OPERATION_VALUES);

export function DeviceInformationForm() {
  // Granular field selectors - only re-render when specific field changes
  const hasDeviceInformation = useDeviceField((d) => !!d?.deviceInformation);
  const deviceCategory = useDeviceField((d) => d?.deviceInformation?.deviceCategory);
  const levelOfOperation = useDeviceField((d) => d?.deviceInformation?.levelOfOperation);
  const isLocalControl = useDeviceField((d) => d?.deviceInformation?.isLocalControl);
  const testState = useDeviceField((d) => d?.deviceInformation?.testState);
  const brandName = useDeviceField((d) => d?.deviceInformation?.brandName);
  const manufacturerLabel = useDeviceField((d) => d?.deviceInformation?.manufacturerLabel);
  const manufacturerSpecificationIdentification = useDeviceField(
    (d) => d?.deviceInformation?.manufacturerSpecificationIdentification
  );
  const softwareRevision = useDeviceField((d) => d?.deviceInformation?.softwareRevision);
  const hardwareRevision = useDeviceField((d) => d?.deviceInformation?.hardwareRevision);
  const primaryVersionNumber = useDeviceField((d) => d?.deviceInformation?.versionNumber?.primaryVersionNumber);
  const secondaryVersionNumber = useDeviceField((d) => d?.deviceInformation?.versionNumber?.secondaryVersionNumber);
  const subReleaseVersionNumber = useDeviceField((d) => d?.deviceInformation?.versionNumber?.subReleaseVersionNumber);
  const powerSource = useDeviceField((d) => d?.deviceInformation?.powerSource);
  const nominalPower = useDeviceField((d) => d?.deviceInformation?.nominalPower);
  const generalRemarks = useDeviceField((d) => d?.deviceInformation?.generalRemarks);

  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  if (!hasDeviceInformation) {
    return null;
  }

  const fieldPath = (field: string) => `deviceInformation.${field}`;

  return (
    <FormSection
      title="Device Information"
      description="Technical details and specifications of the device"
      required={true}
    >
      {/* Alternative Names (collapsible) */}
      <AlternativeNamesForm />

      {/* Legible Description (collapsible) */}
      <LegibleDescriptionForm />

      {/* === Classification === */}
      <FormGroup>
        <SelectField
          label="Device Category"
          name="deviceCategory"
          required={true}
          options={DEVICE_CATEGORY_OPTIONS}
          value={deviceCategory ?? ""}
          onChange={(value) => store.updateDeviceCategory(value as DeviceCategory)}
          error={getError(fieldPath("deviceCategory"))}
        />
        <SelectField
          label="Level of Operation"
          name="levelOfOperation"
          required={false}
          options={LEVEL_OF_OPERATION_OPTIONS}
          placeholder="Select level"
          value={levelOfOperation ?? ""}
          onChange={(value) => store.updateLevelOfOperation((value as LevelOfOperation) || undefined)}
          error={getError(fieldPath("levelOfOperation"))}
        />
      </FormGroup>

      <FormGroup>
        <SelectField
          label="Is Local Control"
          name="isLocalControl"
          required={true}
          options={BOOLEAN_OPTIONS}
          value={isLocalControl?.toString() ?? "false"}
          onChange={(value) => store.updateIsLocalControl(value === "true")}
          error={getError(fieldPath("isLocalControl"))}
        />
        <SelectField
          label="Test State"
          name="testState"
          required={false}
          options={TEST_STATE_OPTIONS}
          placeholder="Select test state"
          value={testState ?? ""}
          onChange={(value) => store.updateTestState((value as TestState) || undefined)}
          error={getError(fieldPath("testState"))}
        />
      </FormGroup>

      {/* === Brand & Manufacturer === */}
      <FormGroup>
        <InputField
          label="Brand Name"
          name="brandName"
          required={false}
          type="text"
          value={brandName ?? ""}
          onChange={(value) => store.updateBrandName(value || undefined)}
          error={getError(fieldPath("brandName"))}
        />
        <InputField
          label="Manufacturer Label"
          name="manufacturerLabel"
          required={false}
          type="text"
          value={manufacturerLabel ?? ""}
          onChange={(value) => store.updateManufacturerLabel(value || undefined)}
          error={getError(fieldPath("manufacturerLabel"))}
        />
      </FormGroup>

      <FormGroup>
        <InputField
          label="Manufacturer Specification ID"
          name="manufacturerSpecificationIdentification"
          required={false}
          type="text"
          value={manufacturerSpecificationIdentification ?? ""}
          onChange={(value) => store.updateManufacturerSpecificationIdentification(value || undefined)}
          error={getError(fieldPath("manufacturerSpecificationIdentification"))}
        />
      </FormGroup>

      {/* === Version & Revisions === */}
      <FormGroup>
        <InputField
          label="Software Revision"
          name="softwareRevision"
          required={false}
          type="text"
          value={softwareRevision ?? ""}
          onChange={(value) => store.updateSoftwareRevision(value || undefined)}
          error={getError(fieldPath("softwareRevision"))}
        />
        <InputField
          label="Hardware Revision"
          name="hardwareRevision"
          required={false}
          type="text"
          value={hardwareRevision ?? ""}
          onChange={(value) => store.updateHardwareRevision(value || undefined)}
          error={getError(fieldPath("hardwareRevision"))}
        />
      </FormGroup>

      <FormGroup columns={3}>
        <InputField
          label="Primary Version"
          name="primaryVersionNumber"
          required={false}
          type="number"
          value={primaryVersionNumber?.toString() ?? ""}
          onChange={(value) => store.updatePrimaryVersionNumber(value ? parseInt(value, 10) : undefined)}
          error={getError(fieldPath("versionNumber.primaryVersionNumber"))}
        />
        <InputField
          label="Secondary Version"
          name="secondaryVersionNumber"
          required={false}
          type="number"
          value={secondaryVersionNumber?.toString() ?? ""}
          onChange={(value) => store.updateSecondaryVersionNumber(value ? parseInt(value, 10) : undefined)}
          error={getError(fieldPath("versionNumber.secondaryVersionNumber"))}
        />
        <InputField
          label="Sub-Release Version"
          name="subReleaseVersionNumber"
          required={false}
          type="number"
          value={subReleaseVersionNumber?.toString() ?? ""}
          onChange={(value) => store.updateSubReleaseVersionNumber(value ? parseInt(value, 10) : undefined)}
          error={getError(fieldPath("versionNumber.subReleaseVersionNumber"))}
        />
      </FormGroup>

      {/* === Power === */}
      <FormGroup>
        <SelectField
          label="Power Source"
          name="powerSource"
          required={false}
          options={POWER_SOURCE_OPTIONS}
          placeholder="Select power source"
          value={powerSource ?? ""}
          onChange={(value) => store.updatePowerSource((value as PowerSource) || undefined)}
          error={getError(fieldPath("powerSource"))}
        />
        <InputField
          label="Nominal Power"
          name="nominalPower"
          required={false}
          type="text"
          value={nominalPower ?? ""}
          onChange={(value) => store.updateNominalPower(value || undefined)}
          error={getError(fieldPath("nominalPower"))}
        />
      </FormGroup>

      {/* === General === */}
      <FormGroup>
        <InputField
          label="General Remarks"
          name="generalRemarks"
          required={false}
          type="text"
          value={generalRemarks ?? ""}
          onChange={(value) => store.updateGeneralRemarks(value || undefined)}
          error={getError(fieldPath("generalRemarks"))}
        />
      </FormGroup>

      {/* Programmer Hints (collapsible) */}
      <ProgrammerHintsForm />
    </FormSection>
  );
}
