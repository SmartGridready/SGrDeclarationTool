"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useShallow } from "zustand/react/shallow";
import { InterfaceList, DataPointBase } from "@/models";
import { GenericInterface } from "@/models/product/generic-interface";
import { DataPointBaseForm } from "@/sections/shared/data-point-base/data-point-base-form";
import { DataPointBaseSlice } from "@/sections/shared/data-point-base/data-point-base-slice";
import { GenericDataPointListSlice } from "./generic-data-point-list-slice";

/**
 * Type guard to check if interface list is Generic interface
 */
function isGenericInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { genericInterface: GenericInterface } {
  return interfaceList !== undefined && "genericInterface" in interfaceList;
}

interface GenericDataPointListFormProps {
  /**
   * Index of the parent functional profile
   */
  functionalProfileIndex: number;
  /**
   * Data point list slice for this functional profile
   */
  dataPointListSlice: GenericDataPointListSlice;
  /**
   * Field path prefix for validation errors
   */
  fieldPathPrefix: string;
}

export function GenericDataPointListForm({
  functionalProfileIndex,
  dataPointListSlice,
  fieldPathPrefix,
}: GenericDataPointListFormProps) {
  // Get state from store
  const interfaceList = useDeviceStore(useShallow((state) => state.device?.interfaceList));
  const dataPoints = isGenericInterface(interfaceList)
    ? interfaceList.genericInterface.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
        ?.dataPointList?.dataPointListElement
    : undefined;

  const isAdded = isGenericInterface(interfaceList)
    ? !!interfaceList.genericInterface.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
        ?.dataPointList
    : false;

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
      <ArrayField<DataPointBase>
        label="Data Point"
        items={dataPoints}
        onAdd={dataPointListSlice.addEmptyDataPoint}
        onRemove={dataPointListSlice.removeDataPoint}
        emptyMessage="No data points added"
        noWrapper={true}
        renderItem={(item, index) => (
          <GenericDataPointItemForm
            key={index}
            dataPointIndex={index}
            functionalProfileIndex={functionalProfileIndex}
            dataPointSlice={dataPointListSlice.getDataPointSlice(index)}
            dataPointListSlice={dataPointListSlice}
            fieldPathPrefix={`${fieldPathPrefix}.dataPointListElement[${index}]`}
          />
        )}
      />
    </FormSection>
  );
}

interface GenericDataPointItemFormProps {
  dataPointIndex: number;
  functionalProfileIndex: number;
  dataPointSlice: DataPointBaseSlice;
  dataPointListSlice: GenericDataPointListSlice;
  fieldPathPrefix: string;
}

function GenericDataPointItemForm({
  dataPointIndex,
  functionalProfileIndex,
  dataPointSlice,
  dataPointListSlice,
  fieldPathPrefix,
}: GenericDataPointItemFormProps) {
  const interfaceList = useDeviceStore(useShallow((state) => state.device?.interfaceList));
  const dataPointData = isGenericInterface(interfaceList)
    ? interfaceList.genericInterface.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
        ?.dataPointList?.dataPointListElement?.[dataPointIndex]
    : undefined;

  const dataPointName = dataPointData?.dataPoint?.dataPointName || `Data Point ${dataPointIndex + 1}`;

  const handleRemove = () => {
    dataPointListSlice.removeDataPoint(dataPointIndex);
  };

  return (
    <FormSection
      title={dataPointName}
      description="Configure the data point"
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
      </div>
    </FormSection>
  );
}
