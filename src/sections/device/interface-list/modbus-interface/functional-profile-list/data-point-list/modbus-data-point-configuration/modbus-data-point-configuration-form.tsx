"use client";

import { FormSection } from "@/components/forms/form-section";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { useDeviceFormContext } from "@/context/device-form-context";
import {
  ModbusDataPointConfiguration,
  RegisterType,
  REGISTER_TYPE_VALUES,
} from "@/models/product/modbus-types";
import { createFormOptions } from "@/models/form-options-helper";
import {
  getModbusDataTypeStringValue,
  createModbusDataTypeFromString,
  isModbusBooleanDataType,
  isModbusEnumDataType,
  isModbusBitmapDataType,
  MODBUS_DATA_TYPE_OPTIONS,
} from "./modbus-data-type-utils";
import { ModbusDataPointConfigurationSlice } from "./modbus-data-point-configuration-slice";
import { ModbusDataPointEnumForm } from "./data-types/enum/enum-form";
import { ModbusDataPointBitmapForm } from "./data-types/bitmap/bitmap-form";
import { ModbusDataPointBooleanForm } from "./data-types/boolean/boolean-form";

interface ModbusDataPointConfigurationFormProps {
  functionalProfileIndex: number;
  dataPointIndex: number;
  configuration: ModbusDataPointConfiguration | undefined;
  actions: ModbusDataPointConfigurationSlice;
  fieldPathPrefix: string;
}

const REGISTER_TYPE_OPTIONS = createFormOptions(REGISTER_TYPE_VALUES);

export function ModbusDataPointConfigurationForm({
  functionalProfileIndex,
  dataPointIndex,
  configuration,
  actions,
  fieldPathPrefix,
}: ModbusDataPointConfigurationFormProps) {
  const { useValidation } = useDeviceFormContext();
  const { getError } = useValidation();

  const isAdded = !!configuration;
  const modbusDataType = configuration?.modbusDataType;

  const handleAdd = () => {
    actions.addModbusDataPointConfiguration(functionalProfileIndex, dataPointIndex);
  };

  const handleRemove = () => {
    actions.removeModbusDataPointConfiguration(functionalProfileIndex, dataPointIndex);
  };

  if (!isAdded) {
    return (
      <FormSection
        title="Modbus Data Point Configuration"
        description="Configure the Modbus-specific settings for this data point"
        required={false}
        isAdded={isAdded}
        onAdd={handleAdd}
        nested={true}
      >
        <></>
      </FormSection>
    );
  }

  return (
    <FormSection
      title="Modbus Data Point Configuration"
      description="Configure the Modbus-specific settings for this data point"
      required={false}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      <FormGroup columns={2}>
        <SelectField
          label="Data Type"
          name={`${fieldPathPrefix}-modbusDataType`}
          options={MODBUS_DATA_TYPE_OPTIONS as unknown as { value: string; label: string }[]}
          value={modbusDataType ? getModbusDataTypeStringValue(modbusDataType) : ""}
          onChange={(value) => {
            if (value) {
              const newDataType = createModbusDataTypeFromString(value);
              if (value === "enum" && modbusDataType && !isModbusEnumDataType(modbusDataType)) {
                actions.setModbusDataPointEnumDataType(functionalProfileIndex, dataPointIndex, {
                  enumEntry: [],
                });
              } else if (
                value === "bitmap" &&
                modbusDataType &&
                !isModbusBitmapDataType(modbusDataType)
              ) {
                actions.setModbusDataPointBitmapDataType(functionalProfileIndex, dataPointIndex, {
                  bitmapEntry: [],
                });
              } else if (
                value === "boolean" &&
                modbusDataType &&
                !isModbusBooleanDataType(modbusDataType)
              ) {
                actions.setModbusDataPointBooleanDataType(
                  functionalProfileIndex,
                  dataPointIndex,
                  {}
                );
              } else {
                actions.updateModbusDataType(functionalProfileIndex, dataPointIndex, newDataType);
              }
            }
          }}
          required={true}
          error={getError(`${fieldPathPrefix}.modbusDataType`)}
        />
        <InputField
          label="Address"
          name={`${fieldPathPrefix}-address`}
          type="number"
          value={configuration.address?.toString() || ""}
          onChange={(value) =>
            actions.updateAddress(
              functionalProfileIndex,
              dataPointIndex,
              value ? parseInt(value, 10) : 0
            )
          }
          placeholder="Enter register address"
          required={true}
          error={getError(`${fieldPathPrefix}.address`)}
        />
      </FormGroup>

      <FormGroup columns={2}>
        <SelectField
          label="Register Type"
          name={`${fieldPathPrefix}-registerType`}
          options={REGISTER_TYPE_OPTIONS}
          value={configuration.registerType || ""}
          onChange={(value) =>
            actions.updateRegisterType(
              functionalProfileIndex,
              dataPointIndex,
              value as RegisterType
            )
          }
          placeholder="Select register type"
          required={true}
          error={getError(`${fieldPathPrefix}.registerType`)}
        />
        <InputField
          label="Number of Registers"
          name={`${fieldPathPrefix}-numberOfRegisters`}
          type="number"
          value={configuration.numberOfRegisters?.toString() || ""}
          onChange={(value) =>
            actions.updateNumberOfRegisters(
              functionalProfileIndex,
              dataPointIndex,
              value ? parseInt(value, 10) : 1
            )
          }
          placeholder="Enter number of registers"
          required={true}
          error={getError(`${fieldPathPrefix}.numberOfRegisters`)}
        />
      </FormGroup>

      <InputField
        label="Bit Rank"
        name={`${fieldPathPrefix}-bitRank`}
        type="number"
        value={configuration.bitRank?.toString() || ""}
        onChange={(value) =>
          actions.updateBitRank(
            functionalProfileIndex,
            dataPointIndex,
            value ? parseInt(value, 10) : undefined
          )
        }
        placeholder="Enter bit rank (0-15)"
        required={false}
        error={getError(`${fieldPathPrefix}.bitRank`)}
      />

      {/* Conditionally render data type-specific forms */}
      {modbusDataType && isModbusBooleanDataType(modbusDataType) && (
        <ModbusDataPointBooleanForm
          functionalProfileIndex={functionalProfileIndex}
          dataPointIndex={dataPointIndex}
          boolean={modbusDataType.boolean}
          actions={actions}
          fieldPathPrefix={`${fieldPathPrefix}.modbusDataType.boolean`}
        />
      )}

      {modbusDataType && isModbusEnumDataType(modbusDataType) && (
        <ModbusDataPointEnumForm
          functionalProfileIndex={functionalProfileIndex}
          dataPointIndex={dataPointIndex}
          enumMap={modbusDataType.enum}
          actions={actions}
          fieldPathPrefix={`${fieldPathPrefix}.modbusDataType.enum`}
        />
      )}

      {modbusDataType && isModbusBitmapDataType(modbusDataType) && (
        <ModbusDataPointBitmapForm
          functionalProfileIndex={functionalProfileIndex}
          dataPointIndex={dataPointIndex}
          bitmap={modbusDataType.bitmap}
          actions={actions}
          fieldPathPrefix={`${fieldPathPrefix}.modbusDataType.bitmap`}
        />
      )}
    </FormSection>
  );
}
