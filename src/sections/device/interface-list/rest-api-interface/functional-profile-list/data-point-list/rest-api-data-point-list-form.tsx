"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";
import { RestApiDataPoint } from "@/models/product/rest-api-interface";
import { DataPointBaseForm } from "@/sections/shared/data-point-base/data-point-base-form";
import { DataPointBaseSlice } from "@/sections/shared/data-point-base/data-point-base-slice";
import { RestApiDataPointListSlice } from "./rest-api-data-point-list-slice";
import { RestApiDataPointConfigurationForm } from "./rest-api-data-point-configuration/rest-api-data-point-configuration-form";

interface RestApiDataPointListFormProps {
  /**
   * Index of the parent functional profile
   */
  functionalProfileIndex: number;
  /**
   * Data point list slice for this functional profile
   */
  dataPointListSlice: RestApiDataPointListSlice;
  /**
   * Field path prefix for validation errors
   */
  fieldPathPrefix: string;
}

export function RestApiDataPointListForm({
  functionalProfileIndex,
  dataPointListSlice,
  fieldPathPrefix,
}: RestApiDataPointListFormProps) {
  // Granular selectors
  const dataPoints = useDeviceField(
    (d) =>
      d?.interfaceList?.restApiInterface?.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
        ?.dataPointList?.dataPointListElement
  );

  const isAdded = useDeviceField(
    (d) =>
      !!d?.interfaceList?.restApiInterface?.functionalProfileList?.functionalProfileListElement?.[
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
      <ArrayField<RestApiDataPoint>
        label="Data Point"
        items={dataPoints}
        onAdd={dataPointListSlice.addEmptyDataPoint}
        onRemove={dataPointListSlice.removeDataPoint}
        emptyMessage="No data points added"
        noWrapper={true}
        renderItem={(item, index) => (
          <RestApiDataPointItemForm
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

interface RestApiDataPointItemFormProps {
  dataPointIndex: number;
  functionalProfileIndex: number;
  dataPointSlice: DataPointBaseSlice;
  dataPointListSlice: RestApiDataPointListSlice;
  fieldPathPrefix: string;
}

function RestApiDataPointItemForm({
  dataPointIndex,
  functionalProfileIndex,
  dataPointSlice,
  dataPointListSlice,
  fieldPathPrefix,
}: RestApiDataPointItemFormProps) {
  // Granular selector for this specific data point
  const dataPointData = useDeviceField(
    (d) =>
      d?.interfaceList?.restApiInterface?.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
        ?.dataPointList?.dataPointListElement?.[dataPointIndex]
  );

  const dataPointName = dataPointData?.dataPoint?.dataPointName || `Data Point ${dataPointIndex + 1}`;

  const handleRemove = () => {
    dataPointListSlice.removeDataPoint(dataPointIndex);
  };

  return (
    <FormSection
      title={dataPointName}
      description="Configure the data point and REST API configuration"
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

        {/* REST API Data Point Configuration Form */}
        <RestApiDataPointConfigurationForm
          config={dataPointData?.restApiDataPointConfiguration}
          actions={dataPointListSlice.getDataPointConfigurationSlice(dataPointIndex)}
          useValidation={useDeviceValidation}
          fieldPathPrefix={`${fieldPathPrefix}.restApiDataPointConfiguration`}
        />
      </div>
    </FormSection>
  );
}
