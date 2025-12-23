import { DynamicParameterDescription, Language, FunctionalProfileDataPoint } from "@/models";
import {
  createLegibleDescriptionSlice,
  LegibleDescriptionSlice,
} from "@/sections/shared/legible-description/legible-description-slice";

export interface ParameterDescriptionsSlice {
  addDataPointParameterDescription: (
    dataPointIndex: number,
    paramIndex: number,
    description: DynamicParameterDescription
  ) => void;
  removeDataPointParameterDescription: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number
  ) => void;
  updateDataPointParameterDescriptionText: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number,
    text: string
  ) => void;
  updateDataPointParameterDescriptionLanguage: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number,
    language: Language
  ) => void;
  updateDataPointParameterDescriptionUri: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number,
    uri: string | undefined
  ) => void;
  updateDataPointParameterDescriptionLabel: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number,
    label: string | undefined
  ) => void;
  addEmptyDataPointParameterDescription: (dataPointIndex: number, paramIndex: number) => void;
}

/**
 * Creates a parameter descriptions slice that works with any store state.
 * Uses the shared createLegibleDescriptionSlice internally for consistency.
 * Parameter descriptions extend legible descriptions with an optional label field.
 */
export function createParameterDescriptionsSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataPoint: (state: TState, index: number) => FunctionalProfileDataPoint | undefined
): ParameterDescriptionsSlice {
  // Helper function to get a slice bound to specific dataPointIndex and paramIndex
  const getSliceForIndices = (
    dataPointIndex: number,
    paramIndex: number
  ): LegibleDescriptionSlice => {
    return createLegibleDescriptionSlice(
      set,
      (state) =>
        getDataPoint(state, dataPointIndex)?.dataPoint.parameterList?.parameterListElement?.[
          paramIndex
        ]?.parameterDescription,
      (state, descriptions) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param) {
          param.parameterDescription = descriptions;
        }
      },
      4, // maxItems - parameterDescription has maxOccurs="4"
      true // isOptional - parameterDescription is optional
    );
  };

  return {
    addDataPointParameterDescription: (dataPointIndex, paramIndex, description) =>
      getSliceForIndices(dataPointIndex, paramIndex).addLegibleDescription(
        description as DynamicParameterDescription
      ),

    removeDataPointParameterDescription: (dataPointIndex, paramIndex, descIndex) =>
      getSliceForIndices(dataPointIndex, paramIndex).removeLegibleDescription(descIndex),

    updateDataPointParameterDescriptionText: (dataPointIndex, paramIndex, descIndex, text) =>
      getSliceForIndices(dataPointIndex, paramIndex).updateTextElement(descIndex, text),

    updateDataPointParameterDescriptionLanguage: (
      dataPointIndex,
      paramIndex,
      descIndex,
      language
    ) => getSliceForIndices(dataPointIndex, paramIndex).updateLanguage(descIndex, language),

    updateDataPointParameterDescriptionUri: (dataPointIndex, paramIndex, descIndex, uri) =>
      getSliceForIndices(dataPointIndex, paramIndex).updateUri(descIndex, uri),

    updateDataPointParameterDescriptionLabel: (dataPointIndex, paramIndex, descIndex, label) => {
      const slice = getSliceForIndices(dataPointIndex, paramIndex);
      if (slice.updateLabel) {
        slice.updateLabel(descIndex, label);
      }
    },

    addEmptyDataPointParameterDescription: (dataPointIndex, paramIndex) =>
      getSliceForIndices(dataPointIndex, paramIndex).addEmptyLegibleDescription(),
  };
}
