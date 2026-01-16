"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";
import { MessagingFunctionalProfile } from "@/models/product/messaging-interface";
import { FunctionalProfileBaseForm } from "@/sections/shared/functional-profile-base/functional-profile-base-form";
import { FunctionalProfileBaseSlice } from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import { MessagingDataPointListForm } from "./data-point-list/messaging-data-point-list-form";
import { MessagingDataPointListSlice } from "./data-point-list/messaging-data-point-list-slice";

export function MessagingFunctionalProfileListForm() {
  const store = useDeviceStore.getState();

  const fieldPathPrefix = "interfaceList.messagingInterface.functionalProfileList";

  // Granular selectors
  const functionalProfiles = useDeviceField(
    (d) => d?.interfaceList?.messagingInterface?.functionalProfileList?.functionalProfileListElement
  );
  const isAdded = useDeviceField((d) => !!d?.interfaceList?.messagingInterface?.functionalProfileList);

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

  // Granular selector for this specific functional profile
  const functionalProfileData = useDeviceField(
    (d) =>
      d?.interfaceList?.messagingInterface?.functionalProfileList?.functionalProfileListElement?.[
        functionalProfileIndex
      ]
  );

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
