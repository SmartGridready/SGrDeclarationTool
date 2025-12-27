"use client";

import { ModbusAttributesForm as SharedModbusAttributesForm } from "@/sections/shared/modbus-attributes/modbus-attributes-form";
import { useDeviceFormContext } from "@/context/device-form-context";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { ModbusAttributesSlice } from "./modbus-attributes-slice";
import { ModbusDataPoint } from "@/models/product/modbus-interface";

interface DataPointModbusAttributesFormProps {
  /**
   * Index of the data point in the list
   */
  dataPointIndex: number;
  /**
   * Modbus attributes slice for this data point
   */
  modbusAttributesSlice: ModbusAttributesSlice;
  /**
   * Field path prefix for validation errors
   */
  fieldPathPrefix: string;
  /**
   * Function to get the data point data
   */
  getDataPoint: () => ModbusDataPoint | undefined;
}

/**
 * Data point specific modbus attributes form.
 * Uses the DeviceFormContext to connect to the store.
 */
export function DataPointModbusAttributesForm({
  dataPointIndex,
  modbusAttributesSlice,
  fieldPathPrefix,
  getDataPoint,
}: DataPointModbusAttributesFormProps) {
  const { useValidation } = useDeviceFormContext();

  const useStore = createSliceAdapter(modbusAttributesSlice);

  return (
    <SharedModbusAttributesForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={() => ({
        modbusAttributes: getDataPoint()?.modbusAttributes,
      })}
      isAddedSelector={() => !!getDataPoint()?.modbusAttributes}
      fieldPathPrefix={`${fieldPathPrefix}.modbusAttributes`}
      required={false}
      title="Modbus Attributes"
      description="Configure Modbus-specific attributes for this data point"
      nested={true}
    />
  );
}
