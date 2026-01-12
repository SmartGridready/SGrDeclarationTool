"use client";

import { AlternativeNamesForm } from "@/sections/shared/alternative-names/alternative-names-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { AlternativeNamesSlice } from "@/sections/shared/alternative-names/alternative-names-slice";
import { FunctionalProfileFrame } from "@/models";
import { useShallow } from "zustand/react/shallow";

interface DataPointAlternativeNamesFormProps {
  dataPointIndex: number;
}

function createDataPointStoreAdapter(
  dataPointIndex: number,
  profile: FunctionalProfileFrame | undefined,
  store: ReturnType<typeof useProfileStore.getState>
) {
  return <TSelected,>(selector: (store: { profile?: FunctionalProfileFrame } & AlternativeNamesSlice) => TSelected) => {
    const adaptedStore: { profile?: FunctionalProfileFrame } & AlternativeNamesSlice = {
      profile,
      addAlternativeNames: () => store.addDataPointAlternativeNames(dataPointIndex),
      removeAlternativeNames: () => store.removeDataPointAlternativeNames(dataPointIndex),
      updateSLV1Name: (value) => store.updateDataPointSLV1Name(dataPointIndex, value),
      updateWorkName: (value) => store.updateDataPointWorkName(dataPointIndex, value),
      updateManufName: (value) => store.updateDataPointManufName(dataPointIndex, value),
      updateIec61850Name: (value) => store.updateDataPointIec61850Name(dataPointIndex, value),
      updateSarefName: (value) => store.updateDataPointSarefName(dataPointIndex, value),
      updateEebusName: (value) => store.updateDataPointEebusName(dataPointIndex, value),
      updateSunSpecName: (value) => store.updateDataPointSunSpecName(dataPointIndex, value),
      updateHpBwpName: (value) => store.updateDataPointHpBwpName(dataPointIndex, value),
      updateEn17609Name: (value) => store.updateDataPointEn17609Name(dataPointIndex, value),
    };

    return selector(adaptedStore);
  };
}

export function DataPointAlternativeNamesForm({ dataPointIndex }: DataPointAlternativeNamesFormProps) {
  const profile = useProfileStore(useShallow((state) => state.profile));
  const store = useProfileStore.getState();
  const useValidation = useProfileValidation;
  const useAdaptedStore = createDataPointStoreAdapter(dataPointIndex, profile, store);

  const fieldPathPrefix = `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.alternativeNames`;

  return (
    <AlternativeNamesForm
      useStore={useAdaptedStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        alternativeNames:
          store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint?.alternativeNames,
      })}
      isAddedSelector={(store) =>
        !!store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint?.alternativeNames
      }
      fieldPathPrefix={fieldPathPrefix}
      required={false}
      title="Alternative Names"
      description="Alternative naming conventions for this data point"
      nested={true}
    />
  );
}
