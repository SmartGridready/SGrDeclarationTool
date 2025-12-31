"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { createSliceAdapter } from "@/hooks/use-form-section";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { InterfaceList } from "@/models";
import { RestApiFunctionalProfile, RestApiInterface } from "@/models/product/rest-api-interface";
import { FunctionalProfileBaseForm } from "@/sections/shared/functional-profile-base/functional-profile-base-form";
import { FunctionalProfileBaseSlice } from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import { RestApiDataPointListForm } from "./data-point-list/rest-api-data-point-list-form";
import { RestApiDataPointListSlice } from "./data-point-list/rest-api-data-point-list-slice";

/**
 * Type guard to check if interface list is REST API interface
 */
function isRestApiInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { restApiInterface: RestApiInterface } {
  return interfaceList !== undefined && "restApiInterface" in interfaceList;
}

export function RestApiFunctionalProfileListForm() {
  const { useDeviceState, pathPrefix, restApiFunctionalProfileListActions } = useDeviceFormContext();

  const fieldPathPrefix = pathPrefix
    ? buildDeviceFieldPath(pathPrefix, "interfaceList.restApiInterface.functionalProfileList")
    : "interfaceList.restApiInterface.functionalProfileList";

  // Get state from context
  const functionalProfiles = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isRestApiInterface(interfaceList)
      ? interfaceList.restApiInterface.functionalProfileList?.functionalProfileListElement
      : undefined;
  });

  const isAdded = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isRestApiInterface(interfaceList) ? !!interfaceList.restApiInterface.functionalProfileList : false;
  });

  const handleAdd = () => restApiFunctionalProfileListActions.addEmptyRestApiFunctionalProfile();
  const handleRemove = () => restApiFunctionalProfileListActions.removeAllRestApiFunctionalProfiles();

  return (
    <FormSection
      title="Functional Profile List"
      description="Define the functional profiles for this REST API interface"
      required={true}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      <ArrayField<RestApiFunctionalProfile>
        label="Functional Profile"
        items={functionalProfiles}
        onAdd={restApiFunctionalProfileListActions.addEmptyRestApiFunctionalProfile}
        onRemove={restApiFunctionalProfileListActions.removeRestApiFunctionalProfile}
        emptyMessage="No functional profiles added"
        noWrapper={true}
        renderItem={(item, index) => (
          <RestApiFunctionalProfileItemForm
            key={index}
            functionalProfileIndex={index}
            functionalProfileSlice={restApiFunctionalProfileListActions.getRestApiFunctionalProfileSlice(index)}
            dataPointListSlice={restApiFunctionalProfileListActions.getRestApiDataPointListSlice(index)}
            fieldPathPrefix={`${fieldPathPrefix}.functionalProfileListElement[${index}]`}
          />
        )}
      />
    </FormSection>
  );
}

interface RestApiFunctionalProfileItemFormProps {
  functionalProfileIndex: number;
  functionalProfileSlice: FunctionalProfileBaseSlice;
  dataPointListSlice: RestApiDataPointListSlice;
  fieldPathPrefix: string;
}

function RestApiFunctionalProfileItemForm({
  functionalProfileIndex,
  functionalProfileSlice,
  dataPointListSlice,
  fieldPathPrefix,
}: RestApiFunctionalProfileItemFormProps) {
  const { useDeviceState, useValidation, restApiFunctionalProfileListActions } = useDeviceFormContext();

  const functionalProfileData = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isRestApiInterface(interfaceList)
      ? interfaceList.restApiInterface.functionalProfileList?.functionalProfileListElement?.[functionalProfileIndex]
      : undefined;
  });

  const functionalProfileName =
    functionalProfileData?.functionalProfile?.functionalProfileName ||
    `Functional Profile ${functionalProfileIndex + 1}`;

  const handleRemove = () => {
    restApiFunctionalProfileListActions.removeRestApiFunctionalProfile(functionalProfileIndex);
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

        <RestApiDataPointListForm
          functionalProfileIndex={functionalProfileIndex}
          dataPointListSlice={dataPointListSlice}
          fieldPathPrefix={`${fieldPathPrefix}.dataPointList`}
        />
      </div>
    </FormSection>
  );
}
