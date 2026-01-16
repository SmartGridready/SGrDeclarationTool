"use client";

import { LegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { FunctionalProfileFrame } from "@/models";
import { useHasProfile, useProfileField } from "@/hooks/use-store-field";

interface DataPointLegibleDescriptionFormProps {
  dataPointIndex: number;
}

function createDataPointStoreAdapter(dataPointIndex: number, store: ReturnType<typeof useProfileStore.getState>) {
  return <TSelected,>(
    selector: (store: { profile?: FunctionalProfileFrame } & LegibleDescriptionSlice) => TSelected
  ) => {
    const adaptedStore: { profile?: FunctionalProfileFrame } & LegibleDescriptionSlice = {
      profile: store.profile,
      addLegibleDescription: () => {
        store.addDataPointLegibleDescription(dataPointIndex);
      },
      removeLegibleDescription: (index) => store.removeDataPointLegibleDescription(dataPointIndex, index),
      removeAllLegibleDescriptions: () => store.removeAllDataPointLegibleDescriptions(dataPointIndex),
      updateTextElement: (index, textElement) =>
        store.updateDataPointLegibleDescriptionText(dataPointIndex, index, textElement),
      updateLanguage: (index, language) =>
        store.updateDataPointLegibleDescriptionLanguage(dataPointIndex, index, language),
      updateUri: (index, uri) => store.updateDataPointLegibleDescriptionUri(dataPointIndex, index, uri),
      addEmptyLegibleDescription: () => store.addDataPointLegibleDescription(dataPointIndex),
    };

    return selector(adaptedStore);
  };
}

export function DataPointLegibleDescriptionForm({ dataPointIndex }: DataPointLegibleDescriptionFormProps) {
  const hasProfile = useHasProfile();
  // Subscribe only to this data point's legibleDescription for targeted re-renders
  const legibleDescription = useProfileField(
    (p) => p?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint?.legibleDescription
  );
  const store = useProfileStore.getState();
  const useValidation = useProfileValidation;
  const useAdaptedStore = createDataPointStoreAdapter(dataPointIndex, store);

  void legibleDescription;

  if (!hasProfile) {
    return null;
  }

  const fieldPathPrefix = `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.legibleDescription`;

  return (
    <LegibleDescriptionForm
      useStore={useAdaptedStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        legibleDescriptions:
          store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint?.legibleDescription,
      })}
      isAddedSelector={(store) =>
        !!store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint?.legibleDescription
      }
      fieldPathPrefix={fieldPathPrefix}
      required={false}
      title="Legible Description"
      description="Human-readable descriptions for this data point (max 4)"
      nested={true}
      maxItems={4}
    />
  );
}
