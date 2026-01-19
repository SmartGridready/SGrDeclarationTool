"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";
import { DataPointBase } from "@/models";
import { DataPointBaseForm } from "@/sections/shared/data-point-base/data-point-base-form";
import { DataPointBaseSlice } from "@/sections/shared/data-point-base/data-point-base-slice";
import { ContactDataPointListSlice } from "./contact-data-point-list-slice";

interface ContactDataPointListFormProps {
  /**
   * Index of the parent functional profile
   */
  functionalProfileIndex: number;
  /**
   * Data point list slice for this functional profile
   */
  dataPointListSlice: ContactDataPointListSlice;
  /**
   * Field path prefix for validation errors
   */
  fieldPathPrefix: string;
}

export function ContactDataPointListForm({
  functionalProfileIndex,
  dataPointListSlice,
  fieldPathPrefix,
}: ContactDataPointListFormProps) {
  // Granular selectors
  const dataPoints = useDeviceField(
    (d) =>
      d?.interfaceList?.contactInterface?.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
        ?.dataPointList?.dataPointListElement
  );

  const isAdded = useDeviceField(
    (d) =>
      !!d?.interfaceList?.contactInterface?.functionalProfileList?.functionalProfileListElement?.[
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
      <ArrayField<DataPointBase>
        label="Data Point"
        items={dataPoints}
        onAdd={dataPointListSlice.addEmptyDataPoint}
        onRemove={dataPointListSlice.removeDataPoint}
        emptyMessage="No data points added"
        noWrapper={true}
        renderItem={(item, index) => (
          <ContactDataPointItemForm
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

interface ContactDataPointItemFormProps {
  dataPointIndex: number;
  functionalProfileIndex: number;
  dataPointSlice: DataPointBaseSlice;
  dataPointListSlice: ContactDataPointListSlice;
  fieldPathPrefix: string;
}

function ContactDataPointItemForm({
  dataPointIndex,
  functionalProfileIndex,
  dataPointSlice,
  dataPointListSlice,
  fieldPathPrefix,
}: ContactDataPointItemFormProps) {
  // Granular selector for this specific data point
  const dataPointData = useDeviceField(
    (d) =>
      d?.interfaceList?.contactInterface?.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
        ?.dataPointList?.dataPointListElement?.[dataPointIndex]
  );

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
