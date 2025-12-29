"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceFormContext } from "@/context/device-form-context";
import { InterfaceList } from "@/models";
import { RestApiDataPoint, RestApiInterface } from "@/models/product/rest-api-interface";
import { DataPointBaseForm } from "@/sections/shared/data-point-base/data-point-base-form";
import { DataPointBaseSlice } from "@/sections/shared/data-point-base/data-point-base-slice";
import { RestApiDataPointListSlice } from "./rest-api-data-point-list-slice";

/**
 * Type guard to check if interface list is REST API interface
 */
function isRestApiInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { restApiInterface: RestApiInterface } {
  return interfaceList !== undefined && "restApiInterface" in interfaceList;
}

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
  const { useDeviceState, useValidation } = useDeviceFormContext();

  // Get state from context
  const dataPoints = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isRestApiInterface(interfaceList)
      ? interfaceList.restApiInterface.functionalProfileList?.functionalProfileListElement?.[
          functionalProfileIndex
        ]?.dataPointList?.dataPointListElement
      : undefined;
  });

  const isAdded = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isRestApiInterface(interfaceList)
      ? !!interfaceList.restApiInterface.functionalProfileList?.functionalProfileListElement?.[
          functionalProfileIndex
        ]?.dataPointList
      : false;
  });

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
  const { useDeviceState, useValidation } = useDeviceFormContext();

  const dataPointData = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isRestApiInterface(interfaceList)
      ? interfaceList.restApiInterface.functionalProfileList?.functionalProfileListElement?.[
          functionalProfileIndex
        ]?.dataPointList?.dataPointListElement?.[dataPointIndex]
      : undefined;
  });

  const dataPointName =
    dataPointData?.dataPoint?.dataPointName || `Data Point ${dataPointIndex + 1}`;

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
          useValidation={useValidation}
          stateSelector={() => dataPointData ?? {}}
          fieldPathPrefix={fieldPathPrefix}
          title={`Data Point ${dataPointIndex + 1}`}
          description="Configure the data point settings"
          nested={true}
        />

        {/* TODO: Add REST API Data Point Configuration Form when implemented */}
        {dataPointData?.restApiDataPointConfiguration && (
          <FormSection
            title="REST API Data Point Configuration"
            description="REST API configuration for this data point"
            required={false}
            nested={true}
            isAdded={true}
          >
            <p className="text-sm text-muted-foreground">
              REST API data point configuration form will be implemented here.
            </p>
          </FormSection>
        )}
      </div>
    </FormSection>
  );
}
