"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { useDeviceStore } from "@/sections/device/device-store";
import { ModbusFunctionalProfile } from "@/models/product/modbus-interface";
import { FunctionalProfileBaseForm } from "@/sections/shared/functional-profile-base/functional-profile-base-form";
import { FunctionalProfileBaseSlice } from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import { ModbusDataPointListForm } from "./data-point-list/modbus-data-point-list-form";
import { ModbusDataPointListSlice } from "./data-point-list/modbus-data-point-list-slice";

export function ModbusFunctionalProfileListForm() {
  const { useDeviceState, pathPrefix } = useDeviceFormContext();

  // Get actions directly from the store to ensure we have the actual slice with methods
  const functionalProfileListActions = useDeviceStore(
    (state) => state.functionalProfileListActions
  );

  const fieldPathPrefix = pathPrefix
    ? buildDeviceFieldPath(pathPrefix, "interfaceList.modbusInterface.functionalProfileList")
    : "interfaceList.modbusInterface.functionalProfileList";

  // Get state from context
  const functionalProfiles = useDeviceState(
    (d) => d?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement
  );

  const isAdded = useDeviceState((d) => !!d?.interfaceList?.modbusInterface?.functionalProfileList);

  const handleAdd = () => functionalProfileListActions.addEmptyFunctionalProfile();
  const handleRemove = () => functionalProfileListActions.removeAllFunctionalProfiles();

  return (
    <FormSection
      title="Functional Profile List"
      description="Define the functional profiles for this Modbus interface"
      required={true}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      <ArrayField<ModbusFunctionalProfile>
        label="Functional Profile"
        items={functionalProfiles}
        onAdd={functionalProfileListActions.addEmptyFunctionalProfile}
        onRemove={functionalProfileListActions.removeFunctionalProfile}
        emptyMessage="No functional profiles added"
        renderItem={(item, index) => (
          <ModbusFunctionalProfileItemForm
            key={index}
            functionalProfileIndex={index}
            functionalProfileSlice={functionalProfileListActions.getFunctionalProfileSlice(index)}
            dataPointListSlice={functionalProfileListActions.getDataPointListSlice(index)}
            fieldPathPrefix={`${fieldPathPrefix}.functionalProfileListElement[${index}]`}
          />
        )}
      />
    </FormSection>
  );
}

interface ModbusFunctionalProfileItemFormProps {
  functionalProfileIndex: number;
  functionalProfileSlice: FunctionalProfileBaseSlice;
  dataPointListSlice: ModbusDataPointListSlice;
  fieldPathPrefix: string;
}

function ModbusFunctionalProfileItemForm({
  functionalProfileIndex,
  functionalProfileSlice,
  dataPointListSlice,
  fieldPathPrefix,
}: ModbusFunctionalProfileItemFormProps) {
  const { useDeviceState, useValidation } = useDeviceFormContext();

  const functionalProfileData = useDeviceState(
    (d) =>
      d?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement?.[
        functionalProfileIndex
      ]
  );

  return (
    <div className="space-y-6">
      <FunctionalProfileBaseForm
        useStore={createSliceAdapter(functionalProfileSlice)}
        useValidation={useValidation}
        stateSelector={() => functionalProfileData ?? {}}
        fieldPathPrefix={fieldPathPrefix}
        title={`Functional Profile ${functionalProfileIndex + 1}`}
        description="Configure the functional profile settings"
        nested={true}
      />

      <ModbusDataPointListForm
        functionalProfileIndex={functionalProfileIndex}
        dataPointListSlice={dataPointListSlice}
        fieldPathPrefix={`${fieldPathPrefix}.dataPointList`}
      />
    </div>
  );
}
