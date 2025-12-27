"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceFormContext } from "@/context/device-form-context";
import { ModbusDataPoint } from "@/models/product/modbus-interface";
import { DataPointBaseForm } from "@/sections/shared/data-point-base/data-point-base-form";
import { DataPointBaseSlice } from "@/sections/shared/data-point-base/data-point-base-slice";
import { ModbusDataPointListSlice } from "./modbus-data-point-list-slice";
import { DataPointModbusAttributesForm } from "./modbus-attributes/modbus-attributes-form";
import { ModbusAttributesSlice } from "./modbus-attributes/modbus-attributes-slice";
import { ModbusDataPointConfigurationForm } from "./modbus-data-point-configuration/modbus-data-point-configuration-form";

interface ModbusDataPointListFormProps {
  /**
   * Index of the parent functional profile
   */
  functionalProfileIndex: number;
  /**
   * Data point list slice for this functional profile
   */
  dataPointListSlice: ModbusDataPointListSlice;
  /**
   * Field path prefix for validation errors
   */
  fieldPathPrefix: string;
}

export function ModbusDataPointListForm({
  functionalProfileIndex,
  dataPointListSlice,
  fieldPathPrefix,
}: ModbusDataPointListFormProps) {
  const { useDeviceState, useValidation } = useDeviceFormContext();

  // Get state from context
  const dataPoints = useDeviceState(
    (d) =>
      d?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement?.[
        functionalProfileIndex
      ]?.dataPointList?.dataPointListElement
  );

  const isAdded = useDeviceState(
    (d) =>
      !!d?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement?.[
        functionalProfileIndex
      ]?.dataPointList
  );

  const handleAdd = () => dataPointListSlice.addEmptyDataPoint();
  const handleRemove = () => dataPointListSlice.removeAllDataPoints();

  return (
    <FormSection
      title="Data Point List"
      description="Define the data points for this functional profile"
      required={true}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      <ArrayField<ModbusDataPoint>
        label="Data Point"
        items={dataPoints}
        onAdd={dataPointListSlice.addEmptyDataPoint}
        onRemove={dataPointListSlice.removeDataPoint}
        emptyMessage="No data points added"
        renderItem={(item, index) => (
          <ModbusDataPointItemForm
            key={index}
            dataPointIndex={index}
            functionalProfileIndex={functionalProfileIndex}
            dataPointSlice={dataPointListSlice.getDataPointSlice(index)}
            modbusAttributesSlice={dataPointListSlice.getModbusAttributesSlice(index)}
            dataPointListSlice={dataPointListSlice}
            fieldPathPrefix={`${fieldPathPrefix}.dataPointListElement[${index}]`}
          />
        )}
      />
    </FormSection>
  );
}

interface ModbusDataPointItemFormProps {
  dataPointIndex: number;
  functionalProfileIndex: number;
  dataPointSlice: DataPointBaseSlice;
  modbusAttributesSlice: ModbusAttributesSlice;
  dataPointListSlice: ModbusDataPointListSlice;
  fieldPathPrefix: string;
}

function ModbusDataPointItemForm({
  dataPointIndex,
  functionalProfileIndex,
  dataPointSlice,
  modbusAttributesSlice,
  dataPointListSlice,
  fieldPathPrefix,
}: ModbusDataPointItemFormProps) {
  const { useDeviceState, useValidation } = useDeviceFormContext();

  const dataPointData = useDeviceState(
    (d) =>
      d?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement?.[
        functionalProfileIndex
      ]?.dataPointList?.dataPointListElement?.[dataPointIndex]
  );

  const { getError } = useValidation();

  const configurationSlice = dataPointListSlice.getModbusDataPointConfigurationSlice(
    functionalProfileIndex,
    dataPointIndex
  );

  return (
    <div className="space-y-6">
      <DataPointBaseForm
        useStore={createSliceAdapter(dataPointSlice)}
        useValidation={useValidation}
        stateSelector={() => dataPointData ?? {}}
        fieldPathPrefix={fieldPathPrefix}
        title={`Data Point ${dataPointIndex + 1}`}
        description="Configure the data point settings"
        nested={true}
      />

      <ModbusDataPointConfigurationForm
        functionalProfileIndex={functionalProfileIndex}
        dataPointIndex={dataPointIndex}
        configuration={dataPointData?.modbusDataPointConfiguration}
        actions={configurationSlice}
        fieldPathPrefix={`${fieldPathPrefix}.modbusDataPointConfiguration`}
        getDataPoint={() => dataPointData}
      />

      <FormSection
        title="Block Cache Identification"
        description="Reference to TimeSyncBlockNotification.blockCacheIdentification"
        required={false}
        nested={true}
        isAdded={dataPointData?.blockCacheIdentification !== undefined}
        onAdd={() => dataPointListSlice.updateBlockCacheIdentification(dataPointIndex, "")}
        onRemove={() =>
          dataPointListSlice.updateBlockCacheIdentification(dataPointIndex, undefined)
        }
      >
        <FormGroup>
          <InputField
            label="Block Cache Identification"
            name={`${fieldPathPrefix}-blockCacheIdentification`}
            required={false}
            type="text"
            value={dataPointData?.blockCacheIdentification || ""}
            onChange={(value) =>
              dataPointListSlice.updateBlockCacheIdentification(dataPointIndex, value || undefined)
            }
            placeholder="Enter block cache identification"
            error={getError(`${fieldPathPrefix}.blockCacheIdentification`)}
          />
        </FormGroup>
      </FormSection>

      <DataPointModbusAttributesForm
        dataPointIndex={dataPointIndex}
        modbusAttributesSlice={modbusAttributesSlice}
        fieldPathPrefix={fieldPathPrefix}
        getDataPoint={() => dataPointData}
      />
    </div>
  );
}
