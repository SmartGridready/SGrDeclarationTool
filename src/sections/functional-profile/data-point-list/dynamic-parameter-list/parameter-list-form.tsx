"use client";

import { DynamicParameterListForm } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";
import { useShallow } from "zustand/react/shallow";

interface ParameterListFormProps {
  dataPointIndex: number;
}

export function ParameterListForm({ dataPointIndex }: ParameterListFormProps) {
  const profile = useProfileStore(useShallow((state) => state.profile));
  const store = useProfileStore.getState();
  const useStore = createProfileStoreAdapter(profile, store);
  const useValidation = useProfileValidation;

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
