"use client";

import { LegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { DynamicParameterDescription } from "@/models";
import { DynamicParameterListSlice } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-slice";
import { useMemo } from "react";

interface DynamicParameterDescriptionsFormProps {
  listIndex: number;
  paramIndex: number;
  parameterDescriptions: DynamicParameterDescription[] | undefined;
  actions: DynamicParameterListSlice;
  getError: (path: string) => string | undefined;
  fieldPathPrefix: string;
}

export function DynamicParameterDescriptionsForm({
  listIndex,
  paramIndex,
  parameterDescriptions,
  actions,
  getError,
  fieldPathPrefix,
}: DynamicParameterDescriptionsFormProps) {
  // Create an adapter store that wraps the parameter descriptions
  const adaptedStore = useMemo(() => {
    const store: { legibleDescriptions?: DynamicParameterDescription[] } & LegibleDescriptionSlice =
      {
        legibleDescriptions: parameterDescriptions,
        addLegibleDescription: (description) => {
          actions.addParameterDescription(
            listIndex,
            paramIndex,
            description as DynamicParameterDescription
          );
        },
        removeLegibleDescription: (index) => {
          actions.removeParameterDescription(listIndex, paramIndex, index);
        },
        removeAllLegibleDescriptions: () => {
          // Remove all descriptions by removing them one by one
          if (parameterDescriptions) {
            for (let i = parameterDescriptions.length - 1; i >= 0; i--) {
              actions.removeParameterDescription(listIndex, paramIndex, i);
            }
          }
        },
        updateTextElement: (index, textElement) => {
          actions.updateParameterDescriptionText(listIndex, paramIndex, index, textElement);
        },
        updateLanguage: (index, language) => {
          actions.updateParameterDescriptionLanguage(listIndex, paramIndex, index, language);
        },
        updateUri: (index, uri) => {
          actions.updateParameterDescriptionUri(listIndex, paramIndex, index, uri);
        },
        updateLabel: (index, label) => {
          actions.updateParameterDescriptionLabel(listIndex, paramIndex, index, label);
        },
        addEmptyLegibleDescription: () => {
          actions.addEmptyParameterDescription(listIndex, paramIndex);
        },
      };
    return store;
  }, [listIndex, paramIndex, parameterDescriptions, actions]);

  // Create a store hook that returns the adapted store
  const useStore = <TSelected,>(selector: (store: typeof adaptedStore) => TSelected): TSelected => {
    return selector(adaptedStore);
  };

  // Create a validation hook adapter
  const useValidationAdapter = () => {
    return {
      getError: (fieldPath: string) => {
        // Convert the field path from legible description format to parameter description format
        const fullPath = fieldPath.replace(
          "legibleDescription",
          `${fieldPathPrefix}.parameterListElement.${paramIndex}.parameterDescription`
        );
        return getError(fullPath);
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
      fieldPathPrefix={`${fieldPathPrefix}.parameterListElement.${paramIndex}.parameterDescription`}
      required={false}
      title="Parameter Descriptions"
      description="Human-readable descriptions for the parameter (max 4)"
      nested={true}
      maxItems={4}
      showLabel={true}
    />
  );
}
