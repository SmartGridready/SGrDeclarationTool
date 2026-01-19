"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { FormGroup } from "@/components/forms/form-group";
import { ModbusLayer6Deviation, MODBUS_LAYER6_DEVIATION_VALUES, ModbusAttributes } from "@/models/product/modbus-types";
import { createFormOptions } from "@/utils/form-options-utils";
import { useFormSection } from "@/hooks/use-form-section";
import { ModbusAttributesSlice } from "./modbus-attributes-slice";
import { ScalingFactorForm } from "./scaling-factor/scaling-factor-form";
import { AccessProtectionForm } from "./access-protection/access-protection-form";

const MODBUS_LAYER6_DEVIATION_OPTIONS = createFormOptions(MODBUS_LAYER6_DEVIATION_VALUES);

interface ModbusAttributesFormProps<TStoreState extends ModbusAttributesSlice> {
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  stateSelector: (store: TStoreState) => {
    modbusAttributes?: ModbusAttributes;
  };
  isAddedSelector?: (store: TStoreState) => boolean;
  fieldPathPrefix?: string;
  required?: boolean;
  title?: string;
  description?: string;
  nested?: boolean;
}

export function ModbusAttributesForm<TStoreState extends ModbusAttributesSlice>({
  useStore,
  useValidation,
  stateSelector,
  isAddedSelector,
  fieldPathPrefix = "modbusAttributes",
  required = false,
  title = "Modbus Attributes",
  description = "Configure Modbus-specific attributes",
  nested = false,
}: ModbusAttributesFormProps<TStoreState>) {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } = useFormSection<
    TStoreState,
    {
      modbusAttributes?: ModbusAttributes;
    },
    ModbusAttributesSlice & Record<string, unknown>
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => ({
      addModbusAttributes: store.addModbusAttributes,
      removeModbusAttributes: store.removeModbusAttributes,
      updateStepByIncrement: store.updateStepByIncrement,
      updateSunssf: store.updateSunssf,
      updatePollingLatencyMs: store.updatePollingLatencyMs,
      updateLayer6Deviation: store.updateLayer6Deviation,
      addScalingFactor: store.addScalingFactor,
      removeScalingFactor: store.removeScalingFactor,
      updateMultiplicator: store.updateMultiplicator,
      updatePowerOf10: store.updatePowerOf10,
      addAccessProtection: store.addAccessProtection,
      removeAccessProtection: store.removeAccessProtection,
      updateIsEnabled: store.updateIsEnabled,
      addModbusExceptionCode: store.addModbusExceptionCode,
      removeModbusExceptionCode: store.removeModbusExceptionCode,
      updateModbusExceptionCode: store.updateModbusExceptionCode,
    }),
    // Only include add/remove functionality if not required
    isAddedSelector: required ? undefined : isAddedSelector,
    onAdd: required ? undefined : (actions) => actions.addModbusAttributes(),
    onRemove: required ? undefined : (actions) => actions.removeModbusAttributes(),
  });

  const modbusAttributes = state.modbusAttributes;
  const fieldPath = (field: string) => `${fieldPathPrefix}.${field}`;

  return (
    <FormSection
      title={title}
      description={description}
      required={required}
      isAdded={required ? true : isAdded}
      onAdd={required ? undefined : handleAdd}
      onRemove={required ? undefined : handleRemove}
      nested={nested}
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
              onChange={(value) => actions.updateStepByIncrement(value ? parseFloat(value) : undefined)}
              placeholder="Enter step by increment"
              error={getError(fieldPath("stepByIncrement"))}
            />
            <InputField
              label="SUNSSF"
              name="modbusAttributesSunssf"
              required={false}
              type="number"
              value={modbusAttributes.sunssf?.toString() || ""}
              onChange={(value) => actions.updateSunssf(value ? parseFloat(value) : undefined)}
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
              onChange={(value) => actions.updatePollingLatencyMs(value ? parseFloat(value) : undefined)}
              placeholder="Enter polling latency in milliseconds"
              error={getError(fieldPath("pollingLatencyMs"))}
            />
            <SelectField
              label="Layer 6 Deviation"
              name="modbusAttributesLayer6Deviation"
              required={false}
              options={MODBUS_LAYER6_DEVIATION_OPTIONS}
              value={modbusAttributes.layer6Deviation || ""}
              onChange={(value) => actions.updateLayer6Deviation((value as ModbusLayer6Deviation) || undefined)}
              placeholder="Select layer 6 deviation"
              error={getError(fieldPath("layer6Deviation"))}
            />
          </FormGroup>

          <ScalingFactorForm
            scalingFactor={modbusAttributes.scalingFactor}
            actions={actions}
            fieldPathPrefix={fieldPathPrefix}
            getError={getError}
            onAdd={() => actions.addScalingFactor()}
            onRemove={() => actions.removeScalingFactor()}
          />

          <AccessProtectionForm
            accessProtection={modbusAttributes.accessProtection}
            actions={actions}
            fieldPathPrefix={fieldPathPrefix}
            getError={getError}
            onAdd={() => actions.addAccessProtection()}
            onRemove={() => actions.removeAccessProtection()}
          />
        </>
      )}
    </FormSection>
  );
}
