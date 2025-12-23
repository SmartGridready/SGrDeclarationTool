import { DynamicParameterDescription, Language, DynamicParameterDescriptionList } from "@/models";
import {
  createLegibleDescriptionSlice,
  LegibleDescriptionSlice,
} from "@/sections/shared/legible-description/legible-description-slice";

export interface DynamicParameterDescriptionsSlice {
  addParameterDescription: (
    dataPointIndex: number,
    paramIndex: number,
    description: DynamicParameterDescription
  ) => void;
  removeParameterDescription: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number
  ) => void;
  updateParameterDescriptionText: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number,
    text: string
  ) => void;
  updateParameterDescriptionLanguage: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number,
    language: Language
  ) => void;
  updateParameterDescriptionUri: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number,
    uri: string | undefined
  ) => void;
  updateParameterDescriptionLabel: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number,
    label: string | undefined
  ) => void;
  addEmptyParameterDescription: (dataPointIndex: number, paramIndex: number) => void;
}

/**
 * Creates a dynamic parameter descriptions slice that works with any store state.
 * Uses the shared createLegibleDescriptionSlice internally for consistency.
 * Parameter descriptions extend legible descriptions with an optional label field.
 */
export function createDynamicParameterDescriptionsSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getParameterList: (
    state: TState,
    dataPointIndex: number
  ) => DynamicParameterDescriptionList | undefined
): DynamicParameterDescriptionsSlice {
  // Helper function to get a slice bound to specific dataPointIndex and paramIndex
  const getSliceForIndices = (
    dataPointIndex: number,
    paramIndex: number
  ): LegibleDescriptionSlice => {
    return createLegibleDescriptionSlice(
      set,
      (state) =>
        getParameterList(state, dataPointIndex)?.parameterListElement?.[paramIndex]
          ?.parameterDescription,
      (state, descriptions) => {
        const paramList = getParameterList(state, dataPointIndex);
        const param = paramList?.parameterListElement?.[paramIndex];
        if (param) {
          param.parameterDescription = descriptions as DynamicParameterDescription[] | undefined;
        }
      },
      4, // maxItems - parameterDescription has maxOccurs="4"
      true // isOptional - parameterDescription is optional
    );
  };

  return {
    addParameterDescription: (dataPointIndex, paramIndex, description) =>
      getSliceForIndices(dataPointIndex, paramIndex).addLegibleDescription(
        description as DynamicParameterDescription
      ),

    removeParameterDescription: (dataPointIndex, paramIndex, descIndex) =>
      getSliceForIndices(dataPointIndex, paramIndex).removeLegibleDescription(descIndex),

    updateParameterDescriptionText: (dataPointIndex, paramIndex, descIndex, text) =>
      getSliceForIndices(dataPointIndex, paramIndex).updateTextElement(descIndex, text),

    updateParameterDescriptionLanguage: (dataPointIndex, paramIndex, descIndex, language) =>
      getSliceForIndices(dataPointIndex, paramIndex).updateLanguage(descIndex, language),

    updateParameterDescriptionUri: (dataPointIndex, paramIndex, descIndex, uri) =>
      getSliceForIndices(dataPointIndex, paramIndex).updateUri(descIndex, uri),

    updateParameterDescriptionLabel: (dataPointIndex, paramIndex, descIndex, label) => {
      const slice = getSliceForIndices(dataPointIndex, paramIndex);
      if (slice.updateLabel) {
        slice.updateLabel(descIndex, label);
      }
    },

    addEmptyParameterDescription: (dataPointIndex, paramIndex) =>
      getSliceForIndices(dataPointIndex, paramIndex).addEmptyLegibleDescription(),
  };
}
