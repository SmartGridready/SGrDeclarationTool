"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceFormContext } from "@/context/device-form-context";
import { InterfaceList } from "@/models";
import { MessagingDataPoint, MessagingInterface } from "@/models/product/messaging-interface";
import { DataPointBaseForm } from "@/sections/shared/data-point-base/data-point-base-form";
import { DataPointBaseSlice } from "@/sections/shared/data-point-base/data-point-base-slice";
import { MessagingDataPointListSlice } from "./messaging-data-point-list-slice";
import { MessagingDataPointConfigurationForm } from "./messaging-data-point-configuration/messaging-data-point-configuration-form";

/**
 * Type guard to check if interface list is Messaging interface
 */
function isMessagingInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { messagingInterface: MessagingInterface } {
  return interfaceList !== undefined && "messagingInterface" in interfaceList;
}

interface MessagingDataPointListFormProps {
  /**
   * Index of the parent functional profile
   */
  functionalProfileIndex: number;
  /**
   * Data point list slice for this functional profile
   */
  dataPointListSlice: MessagingDataPointListSlice;
  /**
   * Field path prefix for validation errors
   */
  fieldPathPrefix: string;
}

export function MessagingDataPointListForm({
  functionalProfileIndex,
  dataPointListSlice,
  fieldPathPrefix,
}: MessagingDataPointListFormProps) {
  const { useDeviceState } = useDeviceFormContext();

  // Get state from context
  const dataPoints = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isMessagingInterface(interfaceList)
      ? interfaceList.messagingInterface.functionalProfileList?.functionalProfileListElement?.[
          functionalProfileIndex
        ]?.dataPointList?.dataPointListElement
      : undefined;
  });

  const isAdded = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isMessagingInterface(interfaceList)
      ? !!interfaceList.messagingInterface.functionalProfileList?.functionalProfileListElement?.[
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
      <ArrayField<MessagingDataPoint>
        label="Data Point"
        items={dataPoints}
        onAdd={dataPointListSlice.addEmptyDataPoint}
        onRemove={dataPointListSlice.removeDataPoint}
        emptyMessage="No data points added"
        noWrapper={true}
        renderItem={(item, index) => (
          <MessagingDataPointItemForm
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

interface MessagingDataPointItemFormProps {
  dataPointIndex: number;
  functionalProfileIndex: number;
  dataPointSlice: DataPointBaseSlice;
  dataPointListSlice: MessagingDataPointListSlice;
  fieldPathPrefix: string;
}

function MessagingDataPointItemForm({
  dataPointIndex,
  functionalProfileIndex,
  dataPointSlice,
  dataPointListSlice,
  fieldPathPrefix,
}: MessagingDataPointItemFormProps) {
  const { useDeviceState, useValidation } = useDeviceFormContext();
  const { getError } = useValidation();

  const dataPointData = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isMessagingInterface(interfaceList)
      ? interfaceList.messagingInterface.functionalProfileList?.functionalProfileListElement?.[
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
      description="Configure the data point"
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

        <MessagingDataPointConfigurationForm
          configuration={dataPointData?.messagingDataPointConfiguration}
          actions={dataPointListSlice.getMessagingDataPointConfigurationSlice(dataPointIndex)}
          fieldPathPrefix={`${fieldPathPrefix}.messagingDataPointConfiguration`}
          getError={getError}
        />
      </div>
    </FormSection>
  );
}
