"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";
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
  // Granular selectors
  const dataPoints = useDeviceField(
    (d) =>
      d?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
        ?.dataPointList?.dataPointListElement
  );

  const isAdded = useDeviceField(
    (d) =>
      !!d?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
        ?.dataPointList
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
        noWrapper={true}
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
  const { getError } = useDeviceValidation();
  // Granular selector for this specific data point
  const dataPointData = useDeviceField(
    (d) =>
      d?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
        ?.dataPointList?.dataPointListElement?.[dataPointIndex]
  );

  const configurationSlice = dataPointListSlice.getModbusDataPointConfigurationSlice(
    functionalProfileIndex,
    dataPointIndex
  );

  const dataPointName = dataPointData?.dataPoint?.dataPointName || `Data Point ${dataPointIndex + 1}`;

  const handleRemove = () => {
    dataPointListSlice.removeDataPoint(dataPointIndex);
  };

  return (
    <FormSection
      title={dataPointName}
      description="Configure the data point, Modbus configuration, and attributes"
      required={false}
      isAdded={true}
      onRemove={handleRemove}
      nested={true}
    >
      <div className="space-y-6">
        <DataPointBaseForm
          useStore={createSliceAdapter(dataPointSlice)}
          useValidation={useDeviceValidation}
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
        />

        <FormSection
          title="Block Cache Identification"
          description="Reference to TimeSyncBlockNotification.blockCacheIdentification"
          required={false}
          nested={true}
          isAdded={dataPointData?.blockCacheIdentification !== undefined}
          onAdd={() => dataPointListSlice.updateBlockCacheIdentification(dataPointIndex, "")}
          onRemove={() => dataPointListSlice.updateBlockCacheIdentification(dataPointIndex, undefined)}
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
          modbusAttributesSlice={modbusAttributesSlice}
          fieldPathPrefix={fieldPathPrefix}
          getDataPoint={() => dataPointData}
        />
      </div>
    </FormSection>
  );
}
