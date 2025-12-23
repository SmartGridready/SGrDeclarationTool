"use client";

import { DynamicParameterListForm } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-form";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";
import { DynamicParameterListSlice } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-slice";
import { FunctionalProfileFrame } from "@/models";

interface ParameterListFormProps {
  dataPointIndex: number;
}

function useDataPointStoreAdapter() {
  const { useProfileState, dataPointListActions } = useFunctionalProfileFormContext();

  return <TSelected,>(
    selector: (store: { profile?: FunctionalProfileFrame } & DynamicParameterListSlice) => TSelected
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const profile = useProfileState((p) => p);

    const adaptedStore: { profile?: FunctionalProfileFrame } & DynamicParameterListSlice = {
      profile,
      ...dataPointListActions,
    };

    return selector(adaptedStore);
  };
}

export function ParameterListForm({ dataPointIndex }: ParameterListFormProps) {
  const { useValidation, pathPrefix } = useFunctionalProfileFormContext();
  const useAdaptedStore = useDataPointStoreAdapter();

  const fullPathPrefix = pathPrefix
    ? `${pathPrefix}.dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList`
    : `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList`;

  return (
    <DynamicParameterListForm
      useStore={useAdaptedStore}
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
      fieldPathPrefix={fullPathPrefix}
      listIndex={dataPointIndex}
      required={false}
      title="Parameter List"
      description="Dynamic parameters that must be provided to execute read/write operations for this data point"
      nested={true}
    />
  );
}
