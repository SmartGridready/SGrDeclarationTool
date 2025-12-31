"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceFormContext } from "@/context/device-form-context";
import { InterfaceList, DataPointBase } from "@/models";
import { ContactInterface } from "@/models/product/contact-interface";
import { DataPointBaseForm } from "@/sections/shared/data-point-base/data-point-base-form";
import { DataPointBaseSlice } from "@/sections/shared/data-point-base/data-point-base-slice";
import { ContactDataPointListSlice } from "./contact-data-point-list-slice";

/**
 * Type guard to check if interface list is Contact interface
 */
function isContactInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { contactInterface: ContactInterface } {
  return interfaceList !== undefined && "contactInterface" in interfaceList;
}

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
  const { useDeviceState } = useDeviceFormContext();

  // Get state from context
  const dataPoints = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isContactInterface(interfaceList)
      ? interfaceList.contactInterface.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
          ?.dataPointList?.dataPointListElement
      : undefined;
  });

  const isAdded = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isContactInterface(interfaceList)
      ? !!interfaceList.contactInterface.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
          ?.dataPointList
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
  const { useDeviceState, useValidation } = useDeviceFormContext();

  const dataPointData = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isContactInterface(interfaceList)
      ? interfaceList.contactInterface.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
          ?.dataPointList?.dataPointListElement?.[dataPointIndex]
      : undefined;
  });

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
          useValidation={useValidation}
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
