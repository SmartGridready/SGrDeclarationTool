"use client";

import { InputField } from "@/components/forms/input-field";
import { FormSection } from "@/components/forms/form-section";
import { ModbusBoolean } from "@/models/product/modbus-types";
import { ModbusDataPointBooleanSlice } from "./boolean-slice";

interface ModbusDataPointBooleanFormProps {
  functionalProfileIndex: number;
  dataPointIndex: number;
  boolean: ModbusBoolean;
  actions: ModbusDataPointBooleanSlice;
  fieldPathPrefix?: string;
  getError?: (fieldPath: string) => string | undefined;
  title?: string;
  description?: string;
  nested?: boolean;
}

export function ModbusDataPointBooleanForm({
  functionalProfileIndex,
  dataPointIndex,
  boolean,
  actions,
  fieldPathPrefix = "boolean",
  getError,
  title = "Boolean Configuration",
  description = "Configure boolean values for true and false states",
  nested = true,
}: ModbusDataPointBooleanFormProps) {
  // Check if boolean is an object with trueValue or falseValue
  const hasTrueValue = typeof boolean === "object" && "trueValue" in boolean;
  const hasFalseValue = typeof boolean === "object" && "falseValue" in boolean;
  const trueValue = hasTrueValue ? (boolean as { trueValue: number }).trueValue : undefined;
  const falseValue = hasFalseValue ? (boolean as { falseValue: number }).falseValue : undefined;

  return (
    <FormSection title={title} description={description} nested={nested} required>
      <InputField
        label="True Value"
        name={`${fieldPathPrefix}-trueValue`}
        type="number"
        value={trueValue?.toString() || ""}
        onChange={(value) => {
          const numValue = value ? parseInt(value, 10) : undefined;
          actions.updateModbusDataPointBooleanTrueValue(
            functionalProfileIndex,
            dataPointIndex,
            numValue !== undefined && !isNaN(numValue) ? numValue : undefined
          );
        }}
        placeholder="Enter numeric value for true state"
        error={getError ? getError(`${fieldPathPrefix}.trueValue`) : undefined}
      />
      <InputField
        label="False Value"
        name={`${fieldPathPrefix}-falseValue`}
        type="number"
        value={falseValue?.toString() || ""}
        onChange={(value) => {
          const numValue = value ? parseInt(value, 10) : undefined;
          actions.updateModbusDataPointBooleanFalseValue(
            functionalProfileIndex,
            dataPointIndex,
            numValue !== undefined && !isNaN(numValue) ? numValue : undefined
          );
        }}
        placeholder="Enter numeric value for false state"
        error={getError ? getError(`${fieldPathPrefix}.falseValue`) : undefined}
      />
    </FormSection>
  );
}
