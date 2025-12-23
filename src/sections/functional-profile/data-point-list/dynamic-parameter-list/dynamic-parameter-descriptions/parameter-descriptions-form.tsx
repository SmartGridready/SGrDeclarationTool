"use client";

import { LegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { DynamicParameterDescription } from "@/models";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";
import { useMemo } from "react";

interface ParameterDescriptionsFormProps {
  dataPointIndex: number;
  paramIndex: number;
  parameterDescriptions: DynamicParameterDescription[] | undefined;
}

export function ParameterDescriptionsForm({
  dataPointIndex,
  paramIndex,
  parameterDescriptions,
}: ParameterDescriptionsFormProps) {
  const { dataPointListActions, useValidation } = useFunctionalProfileFormContext();

  // Create an adapter store that wraps the parameter descriptions
  const adaptedStore = useMemo(() => {
    const store: { legibleDescriptions?: DynamicParameterDescription[] } & LegibleDescriptionSlice =
      {
        legibleDescriptions: parameterDescriptions,
        addLegibleDescription: (description) => {
          dataPointListActions.addDataPointParameterDescription(
            dataPointIndex,
            paramIndex,
            description as DynamicParameterDescription
          );
        },
        removeLegibleDescription: (index) => {
          dataPointListActions.removeDataPointParameterDescription(
            dataPointIndex,
            paramIndex,
            index
          );
        },
        removeAllLegibleDescriptions: () => {
          // Remove all descriptions by removing them one by one
          if (parameterDescriptions) {
            for (let i = parameterDescriptions.length - 1; i >= 0; i--) {
              dataPointListActions.removeDataPointParameterDescription(
                dataPointIndex,
                paramIndex,
                i
              );
            }
          }
        },
        updateTextElement: (index, textElement) => {
          dataPointListActions.updateDataPointParameterDescriptionText(
            dataPointIndex,
            paramIndex,
            index,
            textElement
          );
        },
        updateLanguage: (index, language) => {
          dataPointListActions.updateDataPointParameterDescriptionLanguage(
            dataPointIndex,
            paramIndex,
            index,
            language
          );
        },
        updateUri: (index, uri) => {
          dataPointListActions.updateDataPointParameterDescriptionUri(
            dataPointIndex,
            paramIndex,
            index,
            uri
          );
        },
        updateLabel: (index, label) => {
          dataPointListActions.updateDataPointParameterDescriptionLabel(
            dataPointIndex,
            paramIndex,
            index,
            label
          );
        },
        addEmptyLegibleDescription: () => {
          dataPointListActions.addEmptyDataPointParameterDescription(dataPointIndex, paramIndex);
        },
      };
    return store;
  }, [dataPointIndex, paramIndex, parameterDescriptions, dataPointListActions]);

  // Create a store hook that returns the adapted store
  const useStore = <TSelected,>(selector: (store: typeof adaptedStore) => TSelected): TSelected => {
    return selector(adaptedStore);
  };

  // Create a validation hook adapter
  const useValidationAdapter = () => {
    const { getError: getRawError } = useValidation();
    return {
      getError: (fieldPath: string) => {
        // Convert the field path from legible description format to parameter description format
        const basePath = `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList.parameterListElement.${paramIndex}.parameterDescription`;
        const fullPath = fieldPath.replace("legibleDescription", basePath);
        return getRawError(fullPath);
      },
    };
  };

  return (
    <LegibleDescriptionForm
      useStore={useStore}
      useValidation={useValidationAdapter}
      stateSelector={(store) => ({
        legibleDescriptions: store.legibleDescriptions,
      })}
      isAddedSelector={(store) => !!store.legibleDescriptions}
      fieldPathPrefix={`dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList.parameterListElement.${paramIndex}.parameterDescription`}
      required={false}
      title="Parameter Descriptions"
      description="Human-readable descriptions for the parameter (max 4)"
      nested={true}
      maxItems={4}
      showLabel={true}
    />
  );
}
