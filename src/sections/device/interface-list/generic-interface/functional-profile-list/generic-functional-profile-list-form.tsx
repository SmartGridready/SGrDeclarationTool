"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useShallow } from "zustand/react/shallow";
import { InterfaceList } from "@/models";
import { GenericFunctionalProfile, GenericInterface } from "@/models/product/generic-interface";
import { FunctionalProfileBaseForm } from "@/sections/shared/functional-profile-base/functional-profile-base-form";
import { FunctionalProfileBaseSlice } from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import { GenericDataPointListForm } from "./data-point-list/generic-data-point-list-form";
import { GenericDataPointListSlice } from "./data-point-list/generic-data-point-list-slice";

/**
 * Type guard to check if interface list is Generic interface
 */
function isGenericInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { genericInterface: GenericInterface } {
  return interfaceList !== undefined && "genericInterface" in interfaceList;
}

export function GenericFunctionalProfileListForm() {
  const store = useDeviceStore.getState();

  const fieldPathPrefix = "interfaceList.genericInterface.functionalProfileList";

  // Get state from store
  const interfaceList = useDeviceStore(useShallow((state) => state.device?.interfaceList));
  const functionalProfiles = isGenericInterface(interfaceList)
    ? interfaceList.genericInterface.functionalProfileList?.functionalProfileListElement
    : undefined;

  const isAdded = isGenericInterface(interfaceList) ? !!interfaceList.genericInterface.functionalProfileList : false;

  const handleAdd = () => store.addEmptyGenericFunctionalProfile();
  const handleRemove = () => store.removeAllGenericFunctionalProfiles();

  return (
    <FormSection
      title="Functional Profile List"
      description="Define the functional profiles for this Generic interface"
      required={true}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      <ArrayField<GenericFunctionalProfile>
        label="Functional Profile"
        items={functionalProfiles}
        onAdd={store.addEmptyGenericFunctionalProfile}
        onRemove={store.removeGenericFunctionalProfile}
        emptyMessage="No functional profiles added"
        noWrapper={true}
        renderItem={(item, index) => (
          <GenericFunctionalProfileItemForm
            key={index}
            functionalProfileIndex={index}
            functionalProfileSlice={store.getGenericFunctionalProfileSlice(index)}
            dataPointListSlice={store.getGenericDataPointListSlice(index)}
            fieldPathPrefix={`${fieldPathPrefix}.functionalProfileListElement[${index}]`}
          />
        )}
      />
    </FormSection>
  );
}

interface GenericFunctionalProfileItemFormProps {
  functionalProfileIndex: number;
  functionalProfileSlice: FunctionalProfileBaseSlice;
  dataPointListSlice: GenericDataPointListSlice;
  fieldPathPrefix: string;
}

function GenericFunctionalProfileItemForm({
  functionalProfileIndex,
  functionalProfileSlice,
  dataPointListSlice,
  fieldPathPrefix,
}: GenericFunctionalProfileItemFormProps) {
  const store = useDeviceStore.getState();

  const interfaceList = useDeviceStore(useShallow((state) => state.device?.interfaceList));
  const functionalProfileData = isGenericInterface(interfaceList)
    ? interfaceList.genericInterface.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
    : undefined;

  const functionalProfileName =
    functionalProfileData?.functionalProfile?.functionalProfileName ||
    `Functional Profile ${functionalProfileIndex + 1}`;

  const handleRemove = () => {
    store.removeGenericFunctionalProfile(functionalProfileIndex);
  };

  return (
    <FormSection
      title={functionalProfileName}
      description="Configure the functional profile and data points"
      required={false}
      isAdded={true}
      onRemove={handleRemove}
      nested={true}
    >
      <div className="space-y-6">
        <FunctionalProfileBaseForm
          useStore={createSliceAdapter(functionalProfileSlice)}
          useValidation={useDeviceValidation}
          stateSelector={() => functionalProfileData ?? {}}
          fieldPathPrefix={fieldPathPrefix}
          title={`Functional Profile ${functionalProfileIndex + 1}`}
          description="Configure the functional profile settings"
          nested={true}
        />

        <GenericDataPointListForm
          functionalProfileIndex={functionalProfileIndex}
          dataPointListSlice={dataPointListSlice}
          fieldPathPrefix={`${fieldPathPrefix}.dataPointList`}
        />
      </div>
    </FormSection>
  );
}
