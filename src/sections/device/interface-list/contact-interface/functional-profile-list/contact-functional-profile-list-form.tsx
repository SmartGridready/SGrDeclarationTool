"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { InterfaceList } from "@/models";
import { ContactFunctionalProfile, ContactInterface } from "@/models/product/contact-interface";
import { FunctionalProfileBaseForm } from "@/sections/shared/functional-profile-base/functional-profile-base-form";
import { FunctionalProfileBaseSlice } from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import { ContactDataPointListForm } from "./data-point-list/contact-data-point-list-form";
import { ContactDataPointListSlice } from "./data-point-list/contact-data-point-list-slice";

/**
 * Type guard to check if interface list is Contact interface
 */
function isContactInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { contactInterface: ContactInterface } {
  return interfaceList !== undefined && "contactInterface" in interfaceList;
}

export function ContactFunctionalProfileListForm() {
  const { useDeviceState, pathPrefix, contactFunctionalProfileListActions } = useDeviceFormContext();

  const fieldPathPrefix = pathPrefix
    ? buildDeviceFieldPath(pathPrefix, "interfaceList.contactInterface.functionalProfileList")
    : "interfaceList.contactInterface.functionalProfileList";

  // Get state from context
  const functionalProfiles = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isContactInterface(interfaceList)
      ? interfaceList.contactInterface.functionalProfileList?.functionalProfileListElement
      : undefined;
  });

  const isAdded = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isContactInterface(interfaceList) ? !!interfaceList.contactInterface.functionalProfileList : false;
  });

  const handleAdd = () => contactFunctionalProfileListActions.addEmptyContactFunctionalProfile();
  const handleRemove = () => contactFunctionalProfileListActions.removeAllContactFunctionalProfiles();

  return (
    <FormSection
      title="Functional Profile List"
      description="Define the functional profiles for this Contact interface"
      required={true}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      <ArrayField<ContactFunctionalProfile>
        label="Functional Profile"
        items={functionalProfiles}
        onAdd={contactFunctionalProfileListActions.addEmptyContactFunctionalProfile}
        onRemove={contactFunctionalProfileListActions.removeContactFunctionalProfile}
        emptyMessage="No functional profiles added"
        noWrapper={true}
        renderItem={(item, index) => (
          <ContactFunctionalProfileItemForm
            key={index}
            functionalProfileIndex={index}
            functionalProfileSlice={contactFunctionalProfileListActions.getContactFunctionalProfileSlice(index)}
            dataPointListSlice={contactFunctionalProfileListActions.getContactDataPointListSlice(index)}
            fieldPathPrefix={`${fieldPathPrefix}.functionalProfileListElement[${index}]`}
          />
        )}
      />
    </FormSection>
  );
}

interface ContactFunctionalProfileItemFormProps {
  functionalProfileIndex: number;
  functionalProfileSlice: FunctionalProfileBaseSlice;
  dataPointListSlice: ContactDataPointListSlice;
  fieldPathPrefix: string;
}

function ContactFunctionalProfileItemForm({
  functionalProfileIndex,
  functionalProfileSlice,
  dataPointListSlice,
  fieldPathPrefix,
}: ContactFunctionalProfileItemFormProps) {
  const { useDeviceState, useValidation, contactFunctionalProfileListActions } = useDeviceFormContext();

  const functionalProfileData = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isContactInterface(interfaceList)
      ? interfaceList.contactInterface.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
      : undefined;
  });

  const functionalProfileName =
    functionalProfileData?.functionalProfile?.functionalProfileName ||
    `Functional Profile ${functionalProfileIndex + 1}`;

  const handleRemove = () => {
    contactFunctionalProfileListActions.removeContactFunctionalProfile(functionalProfileIndex);
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

        <ContactDataPointListForm
          functionalProfileIndex={functionalProfileIndex}
          dataPointListSlice={dataPointListSlice}
          fieldPathPrefix={`${fieldPathPrefix}.dataPointList`}
        />
      </div>
    </FormSection>
  );
}
