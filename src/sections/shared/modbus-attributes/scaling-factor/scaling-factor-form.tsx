"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { ScalingFactorSlice } from "./scaling-factor-slice";

interface ScalingFactorFormProps {
  scalingFactor: { multiplicator: number; powerof10: number } | undefined;
  actions: ScalingFactorSlice;
  fieldPathPrefix: string;
  getError: (fieldPath: string) => string | undefined;
  onAdd: () => void;
  onRemove: () => void;
}

export function ScalingFactorForm({
  scalingFactor,
  actions,
  fieldPathPrefix,
  getError,
  onAdd,
  onRemove,
}: ScalingFactorFormProps) {
  const fieldPath = (field: string) => `${fieldPathPrefix}.scalingFactor.${field}`;

  return (
    <FormSection
      title="Scaling Factor"
      description="Configure the scaling factor for Modbus attributes"
      required={false}
      isAdded={!!scalingFactor}
      onAdd={onAdd}
      onRemove={onRemove}
      nested={true}
    >
      {scalingFactor && (
        <FormGroup>
          <InputField
            label="Multiplicator"
            name="scalingFactorMultiplicator"
            required={true}
            type="number"
            value={scalingFactor.multiplicator.toString()}
            onChange={(value) => actions.updateMultiplicator(value ? parseFloat(value) : 0)}
            placeholder="Enter multiplicator"
            error={getError(fieldPath("multiplicator"))}
          />
          <InputField
            label="Power of 10"
            name="scalingFactorPowerOf10"
            required={true}
            type="number"
            value={scalingFactor.powerof10.toString()}
            onChange={(value) => actions.updatePowerOf10(value ? parseFloat(value) : 0)}
            placeholder="Enter power of 10"
            error={getError(fieldPath("powerof10"))}
          />
        </FormGroup>
      )}
    </FormSection>
  );
}
