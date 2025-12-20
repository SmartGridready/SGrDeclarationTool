"use client";

import { LegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { ConfigurationDescription } from "@/models";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { useMemo } from "react";

interface ConfigurationDescriptionsFormProps {
  configIndex: number;
  configurationDescriptions: ConfigurationDescription[] | undefined;
}

export function ConfigurationDescriptionsForm({
  configIndex,
  configurationDescriptions,
}: ConfigurationDescriptionsFormProps) {
  const { useValidation, configurationListActions, pathPrefix } = useDeviceFormContext();

  // Create an adapter store that wraps the configuration descriptions
  const adaptedStore = useMemo(() => {
    const store: { legibleDescriptions?: ConfigurationDescription[] } & LegibleDescriptionSlice = {
      legibleDescriptions: configurationDescriptions,
      addLegibleDescription: (description) => {
        configurationListActions.addConfigurationDescription(
          configIndex,
          description as ConfigurationDescription
        );
      },
      removeLegibleDescription: (index) => {
        configurationListActions.removeConfigurationDescription(configIndex, index);
      },
      removeAllLegibleDescriptions: () => {
        // Remove all descriptions by removing them one by one
        if (configurationDescriptions) {
          for (let i = configurationDescriptions.length - 1; i >= 0; i--) {
            configurationListActions.removeConfigurationDescription(configIndex, i);
          }
        }
      },
      updateTextElement: (index, textElement) => {
        configurationListActions.updateConfigurationDescriptionText(
          configIndex,
          index,
          textElement
        );
      },
      updateLanguage: (index, language) => {
        configurationListActions.updateConfigurationDescriptionLanguage(
          configIndex,
          index,
          language
        );
      },
      updateUri: (index, uri) => {
        configurationListActions.updateConfigurationDescriptionUri(configIndex, index, uri);
      },
      updateLabel: (index, label) => {
        configurationListActions.updateConfigurationDescriptionLabel(configIndex, index, label);
      },
      addEmptyLegibleDescription: () => {
        configurationListActions.addEmptyConfigurationDescription(configIndex);
      },
    };
    return store;
  }, [configIndex, configurationDescriptions, configurationListActions]);

  // Create a store hook that returns the adapted store
  const useStore = <TSelected,>(selector: (store: typeof adaptedStore) => TSelected): TSelected => {
    return selector(adaptedStore);
  };

  // Create a validation hook adapter
  const useValidationAdapter = () => {
    const { getError: getRawError } = useValidation();
    return {
      getError: (fieldPath: string) => {
        // Convert the field path from legible description format to configuration description format
        const basePath = `configurationList.configurationListElement.${configIndex}.configurationDescription`;
        const fullPath = fieldPath.replace("legibleDescription", basePath);
        const prefixedPath = pathPrefix ? buildDeviceFieldPath(pathPrefix, fullPath) : fullPath;
        return getRawError(prefixedPath);
      },
    };
  };

  const fullPathPrefix = pathPrefix
    ? buildDeviceFieldPath(
        pathPrefix,
        `configurationList.configurationListElement.${configIndex}.configurationDescription`
      )
    : `configurationList.configurationListElement.${configIndex}.configurationDescription`;

  return (
    <LegibleDescriptionForm
      useStore={useStore}
      useValidation={useValidationAdapter}
      stateSelector={(store) => ({
        legibleDescriptions: store.legibleDescriptions,
      })}
      isAddedSelector={(store) => !!store.legibleDescriptions}
      fieldPathPrefix={fullPathPrefix}
      required={false}
      title="Configuration Descriptions"
      description="Human-readable descriptions for the configuration (max 4)"
      nested={true}
      maxItems={4}
      showLabel={true}
    />
  );
}
