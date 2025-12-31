import { ConfigurationDescription, Language, DeviceFrame } from "@/models";
import {
  createLegibleDescriptionSlice,
  LegibleDescriptionSlice,
} from "@/sections/shared/legible-description/legible-description-slice";

export interface ConfigurationDescriptionsSlice {
  addConfigurationDescription: (configIndex: number, description: ConfigurationDescription) => void;
  removeConfigurationDescription: (configIndex: number, descIndex: number) => void;
  updateConfigurationDescriptionText: (configIndex: number, descIndex: number, text: string) => void;
  updateConfigurationDescriptionLanguage: (configIndex: number, descIndex: number, language: Language) => void;
  updateConfigurationDescriptionUri: (configIndex: number, descIndex: number, uri: string | undefined) => void;
  updateConfigurationDescriptionLabel: (configIndex: number, descIndex: number, label: string | undefined) => void;
  addEmptyConfigurationDescription: (configIndex: number) => void;
}

/**
 * Creates a configuration descriptions slice that works with any store state.
 * Uses the shared createLegibleDescriptionSlice internally for consistency.
 * Configuration descriptions extend legible descriptions with an optional label field.
 */
export function createConfigurationDescriptionsSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ConfigurationDescriptionsSlice {
  // Helper function to get a slice bound to specific configIndex
  const getSliceForIndex = (configIndex: number): LegibleDescriptionSlice => {
    return createLegibleDescriptionSlice(
      set,
      (state) => state.device?.configurationList?.configurationListElement?.[configIndex]?.configurationDescription,
      (state, descriptions) => {
        const config = state.device?.configurationList?.configurationListElement?.[configIndex];
        if (config) {
          config.configurationDescription = descriptions;
        }
      },
      4, // maxItems - configurationDescription has maxOccurs="4"
      true // isOptional - configurationDescription is optional
    );
  };

  return {
    addConfigurationDescription: (configIndex, description) =>
      getSliceForIndex(configIndex).addLegibleDescription(description as ConfigurationDescription),

    removeConfigurationDescription: (configIndex, descIndex) =>
      getSliceForIndex(configIndex).removeLegibleDescription(descIndex),

    updateConfigurationDescriptionText: (configIndex, descIndex, text) =>
      getSliceForIndex(configIndex).updateTextElement(descIndex, text),

    updateConfigurationDescriptionLanguage: (configIndex, descIndex, language) =>
      getSliceForIndex(configIndex).updateLanguage(descIndex, language),

    updateConfigurationDescriptionUri: (configIndex, descIndex, uri) =>
      getSliceForIndex(configIndex).updateUri(descIndex, uri),

    updateConfigurationDescriptionLabel: (configIndex, descIndex, label) => {
      const slice = getSliceForIndex(configIndex);
      if (slice.updateLabel) {
        slice.updateLabel(descIndex, label);
      }
    },

    addEmptyConfigurationDescription: (configIndex) => getSliceForIndex(configIndex).addEmptyLegibleDescription(),
  };
}
