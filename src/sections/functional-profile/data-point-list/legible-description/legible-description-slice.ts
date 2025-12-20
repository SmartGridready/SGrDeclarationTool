import { FunctionalProfileDataPoint, Language } from "@/models";
import {
  createLegibleDescriptionSlice,
  LegibleDescriptionSlice,
} from "@/sections/shared/legible-description/legible-description-slice";

export interface DataPointLegibleDescriptionSlice {
  addDataPointLegibleDescription: (dataPointIndex: number) => void;
  removeDataPointLegibleDescription: (dataPointIndex: number, descIndex: number) => void;
  removeAllDataPointLegibleDescriptions: (dataPointIndex: number) => void;
  updateDataPointLegibleDescriptionText: (
    dataPointIndex: number,
    descIndex: number,
    text: string
  ) => void;
  updateDataPointLegibleDescriptionLanguage: (
    dataPointIndex: number,
    descIndex: number,
    language: Language
  ) => void;
  updateDataPointLegibleDescriptionUri: (
    dataPointIndex: number,
    descIndex: number,
    uri: string | undefined
  ) => void;
}

/**
 * Creates a generic data point legible description slice that works with any store state.
 * Uses the shared createLegibleDescriptionSlice internally for consistency.
 */
export function createDataPointLegibleDescriptionSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataPoint: (state: TState, index: number) => FunctionalProfileDataPoint | undefined
): DataPointLegibleDescriptionSlice {
  // Helper function to get a slice bound to a specific dataPointIndex
  const getSliceForIndex = (dataPointIndex: number): LegibleDescriptionSlice => {
    return createLegibleDescriptionSlice(
      set,
      (state) => getDataPoint(state, dataPointIndex)?.dataPoint.legibleDescription,
      (state, legibleDescriptions) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) {
          dp.dataPoint.legibleDescription = legibleDescriptions;
        }
      },
      4, // maxItems - legibleDescription has maxOccurs="4"
      true // isOptional - legibleDescription is optional
    );
  };

  return {
    addDataPointLegibleDescription: (dataPointIndex) =>
      getSliceForIndex(dataPointIndex).addEmptyLegibleDescription(),

    removeDataPointLegibleDescription: (dataPointIndex, descIndex) =>
      getSliceForIndex(dataPointIndex).removeLegibleDescription(descIndex),

    removeAllDataPointLegibleDescriptions: (dataPointIndex) =>
      getSliceForIndex(dataPointIndex).removeAllLegibleDescriptions(),

    updateDataPointLegibleDescriptionText: (dataPointIndex, descIndex, text) =>
      getSliceForIndex(dataPointIndex).updateTextElement(descIndex, text),

    updateDataPointLegibleDescriptionLanguage: (dataPointIndex, descIndex, language) =>
      getSliceForIndex(dataPointIndex).updateLanguage(descIndex, language),

    updateDataPointLegibleDescriptionUri: (dataPointIndex, descIndex, uri) =>
      getSliceForIndex(dataPointIndex).updateUri(descIndex, uri),
  };
}
