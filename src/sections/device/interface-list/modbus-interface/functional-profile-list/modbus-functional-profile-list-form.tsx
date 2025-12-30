"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { ModbusFunctionalProfile } from "@/models/product/modbus-interface";
import { FunctionalProfileBaseForm } from "@/sections/shared/functional-profile-base/functional-profile-base-form";
import { FunctionalProfileBaseSlice } from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import { ModbusDataPointListForm } from "./data-point-list/modbus-data-point-list-form";
import { ModbusDataPointListSlice } from "./data-point-list/modbus-data-point-list-slice";
import { FunctionalProfileModbusAttributesForm } from "./modbus-attributes/modbus-attributes-form";
import { ModbusAttributesSlice } from "./modbus-attributes/modbus-attributes-slice";

export function ModbusFunctionalProfileListForm() {
  const { useDeviceState, pathPrefix, functionalProfileListActions } = useDeviceFormContext();

  const fieldPathPrefix = pathPrefix
    ? buildDeviceFieldPath(pathPrefix, "interfaceList.modbusInterface.functionalProfileList")
    : "interfaceList.modbusInterface.functionalProfileList";

  // Get state from context
  const functionalProfiles = useDeviceState(
    (d) => d?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement
  );

  const isAdded = useDeviceState((d) => !!d?.interfaceList?.modbusInterface?.functionalProfileList);

  const handleAdd = () => functionalProfileListActions.addEmptyModbusFunctionalProfile();
  const handleRemove = () => functionalProfileListActions.removeAllModbusFunctionalProfiles();

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
        onAdd={functionalProfileListActions.addEmptyModbusFunctionalProfile}
        onRemove={functionalProfileListActions.removeModbusFunctionalProfile}
        emptyMessage="No functional profiles added"
        noWrapper={true}
        renderItem={(item, index) => (
          <ModbusFunctionalProfileItemForm
            key={index}
            functionalProfileIndex={index}
            functionalProfileSlice={functionalProfileListActions.getModbusFunctionalProfileSlice(
              index
            )}
            dataPointListSlice={functionalProfileListActions.getModbusDataPointListSlice(index)}
            modbusAttributesSlice={functionalProfileListActions.getModbusAttributesSlice(index)}
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
  modbusAttributesSlice: ModbusAttributesSlice;
  fieldPathPrefix: string;
}

function ModbusFunctionalProfileItemForm({
  functionalProfileIndex,
  functionalProfileSlice,
  dataPointListSlice,
  modbusAttributesSlice,
  fieldPathPrefix,
}: ModbusFunctionalProfileItemFormProps) {
  const { useDeviceState, useValidation, functionalProfileListActions } = useDeviceFormContext();

  const functionalProfileData = useDeviceState(
    (d) =>
      d?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement?.[
        functionalProfileIndex
      ]
  );

  const functionalProfileName =
    functionalProfileData?.functionalProfile?.functionalProfileName ||
    `Functional Profile ${functionalProfileIndex + 1}`;

  const handleRemove = () => {
    functionalProfileListActions.removeModbusFunctionalProfile(functionalProfileIndex);
  };

  return (
    <FormSection
      title={functionalProfileName}
      description="Configure the functional profile, Modbus attributes, and data points"
      required={false}
      isAdded={true}
      onRemove={handleRemove}
      nested={true}
    >
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

        <FunctionalProfileModbusAttributesForm
          modbusAttributesSlice={modbusAttributesSlice}
          fieldPathPrefix={fieldPathPrefix}
          getFunctionalProfile={() => functionalProfileData}
        />

        <ModbusDataPointListForm
          functionalProfileIndex={functionalProfileIndex}
          dataPointListSlice={dataPointListSlice}
          fieldPathPrefix={`${fieldPathPrefix}.dataPointList`}
        />
      </div>
    </FormSection>
  );
}
