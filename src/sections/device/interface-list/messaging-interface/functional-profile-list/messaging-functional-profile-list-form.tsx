"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useShallow } from "zustand/react/shallow";
import { InterfaceList } from "@/models";
import { MessagingFunctionalProfile, MessagingInterface } from "@/models/product/messaging-interface";
import { FunctionalProfileBaseForm } from "@/sections/shared/functional-profile-base/functional-profile-base-form";
import { FunctionalProfileBaseSlice } from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import { MessagingDataPointListForm } from "./data-point-list/messaging-data-point-list-form";
import { MessagingDataPointListSlice } from "./data-point-list/messaging-data-point-list-slice";

/**
 * Type guard to check if interface list is Messaging interface
 */
function isMessagingInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { messagingInterface: MessagingInterface } {
  return interfaceList !== undefined && "messagingInterface" in interfaceList;
}

export function MessagingFunctionalProfileListForm() {
  const store = useDeviceStore.getState();

  const fieldPathPrefix = "interfaceList.messagingInterface.functionalProfileList";

  // Get state from store
  const interfaceList = useDeviceStore(useShallow((state) => state.device?.interfaceList));
  const functionalProfiles = isMessagingInterface(interfaceList)
    ? interfaceList.messagingInterface.functionalProfileList?.functionalProfileListElement
    : undefined;

  const isAdded = isMessagingInterface(interfaceList)
    ? !!interfaceList.messagingInterface.functionalProfileList
    : false;

  const handleAdd = () => store.addEmptyMessagingFunctionalProfile();
  const handleRemove = () => store.removeAllMessagingFunctionalProfiles();

  return (
    <FormSection
      title="Functional Profile List"
      description="Define the functional profiles for this Messaging interface"
      required={true}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      <ArrayField<MessagingFunctionalProfile>
        label="Functional Profile"
        items={functionalProfiles}
        onAdd={store.addEmptyMessagingFunctionalProfile}
        onRemove={store.removeMessagingFunctionalProfile}
        emptyMessage="No functional profiles added"
        noWrapper={true}
        renderItem={(item, index) => (
          <MessagingFunctionalProfileItemForm
            key={index}
            functionalProfileIndex={index}
            functionalProfileSlice={store.getMessagingFunctionalProfileSlice(index)}
            dataPointListSlice={store.getMessagingDataPointListSlice(index)}
            fieldPathPrefix={`${fieldPathPrefix}.functionalProfileListElement[${index}]`}
          />
        )}
      />
    </FormSection>
  );
}

interface MessagingFunctionalProfileItemFormProps {
  functionalProfileIndex: number;
  functionalProfileSlice: FunctionalProfileBaseSlice;
  dataPointListSlice: MessagingDataPointListSlice;
  fieldPathPrefix: string;
}

function MessagingFunctionalProfileItemForm({
  functionalProfileIndex,
  functionalProfileSlice,
  dataPointListSlice,
  fieldPathPrefix,
}: MessagingFunctionalProfileItemFormProps) {
  const store = useDeviceStore.getState();

  const interfaceList = useDeviceStore(useShallow((state) => state.device?.interfaceList));
  const functionalProfileData = isMessagingInterface(interfaceList)
    ? interfaceList.messagingInterface.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
    : undefined;

  const functionalProfileName =
    functionalProfileData?.functionalProfile?.functionalProfileName ||
    `Functional Profile ${functionalProfileIndex + 1}`;

  const handleRemove = () => {
    store.removeMessagingFunctionalProfile(functionalProfileIndex);
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

        <MessagingDataPointListForm
          functionalProfileIndex={functionalProfileIndex}
          dataPointListSlice={dataPointListSlice}
          fieldPathPrefix={`${fieldPathPrefix}.dataPointList`}
        />
      </div>
    </FormSection>
  );
}
