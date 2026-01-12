"use client";

import { LegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { ConfigurationDescription } from "@/models";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useMemo } from "react";

interface ConfigurationDescriptionsFormProps {
  configIndex: number;
  configurationDescriptions: ConfigurationDescription[] | undefined;
}

export function ConfigurationDescriptionsForm({
  configIndex,
  configurationDescriptions,
}: ConfigurationDescriptionsFormProps) {
  const store = useDeviceStore.getState();
  const useValidation = useDeviceValidation;

  // Create an adapter store that wraps the configuration descriptions
  const adaptedStore = useMemo(() => {
    const adapted: { legibleDescriptions?: ConfigurationDescription[] } & LegibleDescriptionSlice = {
      legibleDescriptions: configurationDescriptions,
      addLegibleDescription: (description) => {
        store.addConfigurationDescription(configIndex, description as ConfigurationDescription);
      },
      removeLegibleDescription: (index) => {
        store.removeConfigurationDescription(configIndex, index);
      },
      removeAllLegibleDescriptions: () => {
        // Remove all descriptions by removing them one by one
        if (configurationDescriptions) {
          for (let i = configurationDescriptions.length - 1; i >= 0; i--) {
            store.removeConfigurationDescription(configIndex, i);
          }
        }
      },
      updateTextElement: (index, textElement) => {
        store.updateConfigurationDescriptionText(configIndex, index, textElement);
      },
      updateLanguage: (index, language) => {
        store.updateConfigurationDescriptionLanguage(configIndex, index, language);
      },
      updateUri: (index, uri) => {
        store.updateConfigurationDescriptionUri(configIndex, index, uri);
      },
      updateLabel: (index, label) => {
        store.updateConfigurationDescriptionLabel(configIndex, index, label);
      },
      addEmptyLegibleDescription: () => {
        store.addEmptyConfigurationDescription(configIndex);
      },
    };
    return adapted;
  }, [configIndex, configurationDescriptions, store]);

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
        return getRawError(fullPath);
      },
    };
  };

  const fieldPathPrefix = `configurationList.configurationListElement.${configIndex}.configurationDescription`;

  return (
    <LegibleDescriptionForm
      useStore={useStore}
      useValidation={useValidationAdapter}
      stateSelector={(store) => ({
        legibleDescriptions: store.legibleDescriptions,
      })}
      isAddedSelector={(store) => !!store.legibleDescriptions}
      fieldPathPrefix={fieldPathPrefix}
      required={false}
      title="Configuration Descriptions"
      description="Human-readable descriptions for the configuration (max 4)"
      nested={true}
      maxItems={4}
      showLabel={true}
    />
  );
}
