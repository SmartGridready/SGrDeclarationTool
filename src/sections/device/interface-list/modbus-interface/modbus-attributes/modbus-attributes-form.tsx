"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import {
  ModbusLayer6Deviation,
  MODBUS_LAYER6_DEVIATION_VALUES,
} from "@/models/product/modbus-types";
import { createFormOptions } from "@/models/form-options-helper";
import { ScalingFactorForm } from "./scaling-factor/scaling-factor-form";
import { AccessProtectionForm } from "./access-protection/access-protection-form";

const MODBUS_LAYER6_DEVIATION_OPTIONS = createFormOptions(MODBUS_LAYER6_DEVIATION_VALUES);

export function ModbusAttributesForm() {
  const { useDeviceState, useValidation, modbusAttributesActions, pathPrefix } =
    useDeviceFormContext();

  const modbusAttributes = useDeviceState(
    (d) => d?.interfaceList?.modbusInterface?.modbusAttributes
  );
  const { getError } = useValidation();

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(pathPrefix, `interfaceList.modbusInterface.modbusAttributes.${field}`);

  const fieldPathPrefix = buildDeviceFieldPath(pathPrefix, "interfaceList.modbusInterface");

  return (
    <FormSection
      title="Modbus Attributes"
      description="Configure Modbus-specific attributes"
      required={false}
      isAdded={!!modbusAttributes}
      onAdd={() => modbusAttributesActions.addModbusAttributes()}
      onRemove={() => modbusAttributesActions.removeModbusAttributes()}
      nested={true}
    >
      {modbusAttributes && (
        <>
          <FormGroup>
            <InputField
              label="Step By Increment"
              name="modbusAttributesStepByIncrement"
              required={false}
              type="number"
              value={modbusAttributes.stepByIncrement?.toString() || ""}
              onChange={(value) =>
                modbusAttributesActions.updateStepByIncrement(value ? parseFloat(value) : undefined)
              }
              placeholder="Enter step by increment"
              error={getError(fieldPath("stepByIncrement"))}
            />
            <InputField
              label="SUNSSF"
              name="modbusAttributesSunssf"
              required={false}
              type="number"
              value={modbusAttributes.sunssf?.toString() || ""}
              onChange={(value) =>
                modbusAttributesActions.updateSunssf(value ? parseFloat(value) : undefined)
              }
              placeholder="Enter SUNSSF"
              error={getError(fieldPath("sunssf"))}
            />
          </FormGroup>

          <FormGroup>
            <InputField
              label="Polling Latency (ms)"
              name="modbusAttributesPollingLatencyMs"
              required={false}
              type="number"
              value={modbusAttributes.pollingLatencyMs?.toString() || ""}
              onChange={(value) =>
                modbusAttributesActions.updatePollingLatencyMs(
                  value ? parseFloat(value) : undefined
                )
              }
              placeholder="Enter polling latency in milliseconds"
              error={getError(fieldPath("pollingLatencyMs"))}
            />
            <SelectField
              label="Layer 6 Deviation"
              name="modbusAttributesLayer6Deviation"
              required={false}
              options={MODBUS_LAYER6_DEVIATION_OPTIONS}
              value={modbusAttributes.layer6Deviation || ""}
              onChange={(value) =>
                modbusAttributesActions.updateLayer6Deviation(
                  (value as ModbusLayer6Deviation) || undefined
                )
              }
              placeholder="Select layer 6 deviation"
              error={getError(fieldPath("layer6Deviation"))}
            />
          </FormGroup>

          <ScalingFactorForm
            scalingFactor={modbusAttributes.scalingFactor}
            fieldPathPrefix={fieldPathPrefix}
            onAdd={() => modbusAttributesActions.addScalingFactor()}
            onRemove={() => modbusAttributesActions.removeScalingFactor()}
          />

          <AccessProtectionForm
            accessProtection={modbusAttributes.accessProtection}
            fieldPathPrefix={fieldPathPrefix}
            onAdd={() => modbusAttributesActions.addAccessProtection()}
            onRemove={() => modbusAttributesActions.removeAccessProtection()}
          />
        </>
      )}
    </FormSection>
  );
}
