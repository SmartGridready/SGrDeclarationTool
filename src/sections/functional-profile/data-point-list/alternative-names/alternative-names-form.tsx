"use client";

import { AlternativeNamesForm } from "@/sections/shared/alternative-names/alternative-names-form";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";
import { AlternativeNamesSlice } from "@/sections/shared/alternative-names/alternative-names-slice";
import { FunctionalProfileFrame } from "@/models";

interface DataPointAlternativeNamesFormProps {
  dataPointIndex: number;
}

function useDataPointStoreAdapter(dataPointIndex: number) {
  const { useProfileState, dataPointListActions } = useFunctionalProfileFormContext();

  return <TSelected,>(
    selector: (store: { profile?: FunctionalProfileFrame } & AlternativeNamesSlice) => TSelected
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const profile = useProfileState((p) => p);

    const adaptedStore: { profile?: FunctionalProfileFrame } & AlternativeNamesSlice = {
      profile,
      addAlternativeNames: () => dataPointListActions.addDataPointAlternativeNames(dataPointIndex),
      removeAlternativeNames: () =>
        dataPointListActions.removeDataPointAlternativeNames(dataPointIndex),
      updateSLV1Name: (value) =>
        dataPointListActions.updateDataPointSLV1Name(dataPointIndex, value),
      updateWorkName: (value) =>
        dataPointListActions.updateDataPointWorkName(dataPointIndex, value),
      updateManufName: (value) =>
        dataPointListActions.updateDataPointManufName(dataPointIndex, value),
      updateIec61850Name: (value) =>
        dataPointListActions.updateDataPointIec61850Name(dataPointIndex, value),
      updateSarefName: (value) =>
        dataPointListActions.updateDataPointSarefName(dataPointIndex, value),
      updateEebusName: (value) =>
        dataPointListActions.updateDataPointEebusName(dataPointIndex, value),
      updateSunSpecName: (value) =>
        dataPointListActions.updateDataPointSunSpecName(dataPointIndex, value),
      updateHpBwpName: (value) =>
        dataPointListActions.updateDataPointHpBwpName(dataPointIndex, value),
      updateEn17609Name: (value) =>
        dataPointListActions.updateDataPointEn17609Name(dataPointIndex, value),
    };

    return selector(adaptedStore);
  };
}

export function DataPointAlternativeNamesForm({
  dataPointIndex,
}: DataPointAlternativeNamesFormProps) {
  const { useValidation, pathPrefix } = useFunctionalProfileFormContext();
  const useAdaptedStore = useDataPointStoreAdapter(dataPointIndex);

  const fullPathPrefix = pathPrefix
    ? `${pathPrefix}.dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.alternativeNames`
    : `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.alternativeNames`;

  return (
    <AlternativeNamesForm
      useStore={useAdaptedStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        alternativeNames:
          store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint
            ?.alternativeNames,
      })}
      isAddedSelector={(store) =>
        !!store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint
          ?.alternativeNames
      }
      fieldPathPrefix={fullPathPrefix}
      required={false}
      title="Alternative Names"
      description="Alternative naming conventions for this data point"
      nested={true}
    />
  );
}
