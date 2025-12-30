"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { InterfaceList } from "@/models";
import {
  MessagingFunctionalProfile,
  MessagingInterface,
} from "@/models/product/messaging-interface";
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
  const { useDeviceState, pathPrefix, messagingFunctionalProfileListActions } =
    useDeviceFormContext();

  const fieldPathPrefix = pathPrefix
    ? buildDeviceFieldPath(pathPrefix, "interfaceList.messagingInterface.functionalProfileList")
    : "interfaceList.messagingInterface.functionalProfileList";

  // Get state from context
  const functionalProfiles = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isMessagingInterface(interfaceList)
      ? interfaceList.messagingInterface.functionalProfileList?.functionalProfileListElement
      : undefined;
  });

  const isAdded = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isMessagingInterface(interfaceList)
      ? !!interfaceList.messagingInterface.functionalProfileList
      : false;
  });

  const handleAdd = () => messagingFunctionalProfileListActions.addEmptyFunctionalProfile();
  const handleRemove = () => messagingFunctionalProfileListActions.removeAllFunctionalProfiles();

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
        onAdd={messagingFunctionalProfileListActions.addEmptyFunctionalProfile}
        onRemove={messagingFunctionalProfileListActions.removeFunctionalProfile}
        emptyMessage="No functional profiles added"
        noWrapper={true}
        renderItem={(item, index) => (
          <MessagingFunctionalProfileItemForm
            key={index}
            functionalProfileIndex={index}
            functionalProfileSlice={messagingFunctionalProfileListActions.getFunctionalProfileSlice(
              index
            )}
            dataPointListSlice={messagingFunctionalProfileListActions.getMessagingDataPointListSlice(
              index
            )}
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
  const { useDeviceState, useValidation, messagingFunctionalProfileListActions } =
    useDeviceFormContext();

  const functionalProfileData = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isMessagingInterface(interfaceList)
      ? interfaceList.messagingInterface.functionalProfileList?.functionalProfileListElement?.[
          functionalProfileIndex
        ]
      : undefined;
  });

  const functionalProfileName =
    functionalProfileData?.functionalProfile?.functionalProfileName ||
    `Functional Profile ${functionalProfileIndex + 1}`;

  const handleRemove = () => {
    messagingFunctionalProfileListActions.removeFunctionalProfile(functionalProfileIndex);
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
          useValidation={useValidation}
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
