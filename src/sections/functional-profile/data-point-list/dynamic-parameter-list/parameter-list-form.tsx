"use client";

import { DynamicParameterListForm } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-form";
import {
  useFunctionalProfileFormContext,
  buildProfileFieldPath,
} from "@/context/functional-profile-form-context";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";

interface ParameterListFormProps {
  dataPointIndex: number;
}

export function ParameterListForm({ dataPointIndex }: ParameterListFormProps) {
  const { useProfileState, useValidation, dataPointListActions, pathPrefix } =
    useFunctionalProfileFormContext();

  const profile = useProfileState((p) => p);
  const useStore = createProfileStoreAdapter(profile, dataPointListActions);

  const fieldPathPrefix = buildProfileFieldPath(
    pathPrefix,
    `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList`
  );

  return (
    <DynamicParameterListForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        parameterList:
          store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint
            ?.parameterList,
      })}
      isAddedSelector={(store) =>
        !!store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint
          ?.parameterList
      }
      fieldPathPrefix={fieldPathPrefix}
      listIndex={dataPointIndex}
      required={false}
      title="Parameter List"
      description="Dynamic parameters that must be provided to execute read/write operations for this data point"
      nested={true}
    />
  );
}
