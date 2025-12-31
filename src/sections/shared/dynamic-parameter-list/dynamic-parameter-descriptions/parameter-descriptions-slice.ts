import { DynamicParameterDescription, Language, DynamicParameterDescriptionList } from "@/models";
import {
  createLegibleDescriptionSlice,
  LegibleDescriptionSlice,
} from "@/sections/shared/legible-description/legible-description-slice";

export interface DynamicParameterDescriptionsSlice {
  addParameterDescription: (listIndex: number, paramIndex: number, description: DynamicParameterDescription) => void;
  removeParameterDescription: (listIndex: number, paramIndex: number, descIndex: number) => void;
  updateParameterDescriptionText: (listIndex: number, paramIndex: number, descIndex: number, text: string) => void;
  updateParameterDescriptionLanguage: (
    listIndex: number,
    paramIndex: number,
    descIndex: number,
    language: Language
  ) => void;
  updateParameterDescriptionUri: (
    listIndex: number,
    paramIndex: number,
    descIndex: number,
    uri: string | undefined
  ) => void;
  updateParameterDescriptionLabel: (
    listIndex: number,
    paramIndex: number,
    descIndex: number,
    label: string | undefined
  ) => void;
  addEmptyParameterDescription: (listIndex: number, paramIndex: number) => void;
}

/**
 * Creates a dynamic parameter descriptions slice that works with any store state.
 * Uses the shared createLegibleDescriptionSlice internally for consistency.
 * Parameter descriptions extend legible descriptions with an optional label field.
 */
export function createDynamicParameterDescriptionsSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getParameterList: (state: TState, listIndex: number) => DynamicParameterDescriptionList | undefined
): DynamicParameterDescriptionsSlice {
  // Helper function to get a slice bound to specific listIndex and paramIndex
  const getSliceForIndices = (listIndex: number, paramIndex: number): LegibleDescriptionSlice => {
    return createLegibleDescriptionSlice(
      set,
      (state) => getParameterList(state, listIndex)?.parameterListElement?.[paramIndex]?.parameterDescription,
      (state, descriptions) => {
        const paramList = getParameterList(state, listIndex);
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
    addParameterDescription: (listIndex, paramIndex, description) =>
      getSliceForIndices(listIndex, paramIndex).addLegibleDescription(description as DynamicParameterDescription),

    removeParameterDescription: (listIndex, paramIndex, descIndex) =>
      getSliceForIndices(listIndex, paramIndex).removeLegibleDescription(descIndex),

    updateParameterDescriptionText: (listIndex, paramIndex, descIndex, text) =>
      getSliceForIndices(listIndex, paramIndex).updateTextElement(descIndex, text),

    updateParameterDescriptionLanguage: (listIndex, paramIndex, descIndex, language) =>
      getSliceForIndices(listIndex, paramIndex).updateLanguage(descIndex, language),

    updateParameterDescriptionUri: (listIndex, paramIndex, descIndex, uri) =>
      getSliceForIndices(listIndex, paramIndex).updateUri(descIndex, uri),

    updateParameterDescriptionLabel: (listIndex, paramIndex, descIndex, label) => {
      const slice = getSliceForIndices(listIndex, paramIndex);
      if (slice.updateLabel) {
        slice.updateLabel(descIndex, label);
      }
    },

    addEmptyParameterDescription: (listIndex, paramIndex) =>
      getSliceForIndices(listIndex, paramIndex).addEmptyLegibleDescription(),
  };
}
