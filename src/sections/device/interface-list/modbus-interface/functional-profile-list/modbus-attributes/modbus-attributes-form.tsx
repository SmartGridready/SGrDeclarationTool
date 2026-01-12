"use client";

import { ModbusAttributesForm as SharedModbusAttributesForm } from "@/sections/shared/modbus-attributes/modbus-attributes-form";
import { useDeviceValidation } from "@/hooks/use-validation";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { ModbusAttributesSlice } from "./modbus-attributes-slice";
import { ModbusFunctionalProfile } from "@/models/product/modbus-interface";

interface FunctionalProfileModbusAttributesFormProps {
  /**
   * Modbus attributes slice for this functional profile
   */
  modbusAttributesSlice: ModbusAttributesSlice;
  /**
   * Field path prefix for validation errors
   */
  fieldPathPrefix: string;
  /**
   * Function to get the functional profile data
   */
  getFunctionalProfile: () => ModbusFunctionalProfile | undefined;
}

/**
 * Functional profile specific modbus attributes form.
 * Uses the DeviceFormContext to connect to the store.
 */
export function FunctionalProfileModbusAttributesForm({
  modbusAttributesSlice,
  fieldPathPrefix,
  getFunctionalProfile,
}: FunctionalProfileModbusAttributesFormProps) {
  const useValidation = useDeviceValidation;

  const useStore = createSliceAdapter(modbusAttributesSlice);

  return (
    <SharedModbusAttributesForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={() => ({
        modbusAttributes: getFunctionalProfile()?.modbusAttributes,
      })}
      isAddedSelector={() => !!getFunctionalProfile()?.modbusAttributes}
      fieldPathPrefix={`${fieldPathPrefix}.modbusAttributes`}
      required={false}
      title="Modbus Attributes"
      description="Configure Modbus-specific attributes for this functional profile"
      nested={true}
    />
  );
}
