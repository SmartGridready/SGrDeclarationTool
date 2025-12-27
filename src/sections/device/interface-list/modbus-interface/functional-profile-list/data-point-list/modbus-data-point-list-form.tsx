"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceFormContext } from "@/context/device-form-context";
import { ModbusDataPoint } from "@/models/product/modbus-interface";
import { DataPointBaseForm } from "@/sections/shared/data-point-base/data-point-base-form";
import { DataPointBaseSlice } from "@/sections/shared/data-point-base/data-point-base-slice";
import { ModbusDataPointListSlice } from "./modbus-data-point-list-slice";

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
  fieldPathPrefix: string;
}

function ModbusDataPointItemForm({
  dataPointIndex,
  functionalProfileIndex,
  dataPointSlice,
  fieldPathPrefix,
}: ModbusDataPointItemFormProps) {
  const { useDeviceState, useValidation } = useDeviceFormContext();

  const dataPointData = useDeviceState(
    (d) =>
      d?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement?.[
        functionalProfileIndex
      ]?.dataPointList?.dataPointListElement?.[dataPointIndex]
  );

  return (
    <DataPointBaseForm
      useStore={createSliceAdapter(dataPointSlice)}
      useValidation={useValidation}
      stateSelector={() => dataPointData ?? {}}
      fieldPathPrefix={fieldPathPrefix}
      title={`Data Point ${dataPointIndex + 1}`}
      description="Configure the data point settings"
      nested={true}
    />
  );
}
