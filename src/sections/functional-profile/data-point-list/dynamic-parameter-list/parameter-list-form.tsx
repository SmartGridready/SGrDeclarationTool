"use client";

import { DynamicParameterListForm } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";
import { useHasProfile, useProfileField } from "@/hooks/use-store-field";

interface ParameterListFormProps {
  dataPointIndex: number;
}

export function ParameterListForm({ dataPointIndex }: ParameterListFormProps) {
  const hasProfile = useHasProfile();
  // Subscribe only to this data point's parameterList for targeted re-renders
  const parameterList = useProfileField(
    (p) => p?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint?.parameterList
  );
  const store = useProfileStore.getState();
  const useStore = createProfileStoreAdapter(store.profile, store);
  const useValidation = useProfileValidation;

  void parameterList;

  if (!hasProfile) {
    return null;
  }

  const fieldPathPrefix = `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList`;

  return (
    <DynamicParameterListForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        parameterList: store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint?.parameterList,
      })}
      isAddedSelector={(store) =>
        !!store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint?.parameterList
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
