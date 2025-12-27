"use client";

import { LegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import {
  useFunctionalProfileFormContext,
  buildProfileFieldPath,
} from "@/context/functional-profile-form-context";
import { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { FunctionalProfileFrame } from "@/models";

interface DataPointLegibleDescriptionFormProps {
  dataPointIndex: number;
}

function useDataPointStoreAdapter(dataPointIndex: number) {
  const { useProfileState, dataPointListActions } = useFunctionalProfileFormContext();

  return <TSelected,>(
    selector: (store: { profile?: FunctionalProfileFrame } & LegibleDescriptionSlice) => TSelected
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const profile = useProfileState((p) => p);

    const adaptedStore: { profile?: FunctionalProfileFrame } & LegibleDescriptionSlice = {
      profile,
      addLegibleDescription: () => {
        dataPointListActions.addDataPointLegibleDescription(dataPointIndex);
      },
      removeLegibleDescription: (index) =>
        dataPointListActions.removeDataPointLegibleDescription(dataPointIndex, index),
      removeAllLegibleDescriptions: () =>
        dataPointListActions.removeAllDataPointLegibleDescriptions(dataPointIndex),
      updateTextElement: (index, textElement) =>
        dataPointListActions.updateDataPointLegibleDescriptionText(
          dataPointIndex,
          index,
          textElement
        ),
      updateLanguage: (index, language) =>
        dataPointListActions.updateDataPointLegibleDescriptionLanguage(
          dataPointIndex,
          index,
          language
        ),
      updateUri: (index, uri) =>
        dataPointListActions.updateDataPointLegibleDescriptionUri(dataPointIndex, index, uri),
      addEmptyLegibleDescription: () =>
        dataPointListActions.addDataPointLegibleDescription(dataPointIndex),
    };

    return selector(adaptedStore);
  };
}

export function DataPointLegibleDescriptionForm({
  dataPointIndex,
}: DataPointLegibleDescriptionFormProps) {
  const { useValidation, pathPrefix } = useFunctionalProfileFormContext();
  const useAdaptedStore = useDataPointStoreAdapter(dataPointIndex);

  const fieldPathPrefix = buildProfileFieldPath(
    pathPrefix,
    `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.legibleDescription`
  );

  return (
    <LegibleDescriptionForm
      useStore={useAdaptedStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        legibleDescriptions:
          store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint
            ?.legibleDescription,
      })}
      isAddedSelector={(store) =>
        !!store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint
          ?.legibleDescription
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
