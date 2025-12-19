import { DeviceFrame, LegibleDescription, Language } from "@/models";
import {
  createLegibleDescriptionSlice,
  LegibleDescriptionSlice,
} from "@/sections/shared/legible-description/legible-description-slice";

/**
 * ProgrammerHintsSlice interface - mirrors LegibleDescriptionSlice but with different method names
 * to avoid conflicts when composed with LegibleDescriptionSlice in DeviceInformationSlice.
 */
export interface ProgrammerHintsSlice {
  // Main operations
  addProgrammerHint: (programmerHint: LegibleDescription) => void;
  removeProgrammerHint: (index: number) => void;
  removeAllProgrammerHints: () => void;

  // Field-specific updates
  updateProgrammerHintTextElement: (index: number, textElement: string) => void;
  updateProgrammerHintLanguage: (index: number, language: Language) => void;
  updateProgrammerHintUri: (index: number, uri: string | undefined) => void;

  // Convenience methods
  addEmptyProgrammerHint: () => void;
}

/**
 * Creates a programmer hints slice specifically for device stores.
 * Internally reuses the LegibleDescriptionSlice pattern since they have identical structure.
 * This is a convenience function that sets up the getter/setter for device.deviceInformation.programmerHints
 */
export function createProgrammerHintsSliceForDevice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ProgrammerHintsSlice {
  // Reuse the shared LegibleDescriptionSlice internally
  const internalSlice: LegibleDescriptionSlice = createLegibleDescriptionSlice(
    set,
    (state) => state.device?.deviceInformation?.programmerHints,
    (state, programmerHints) => {
      if (state.device?.deviceInformation) {
        state.device.deviceInformation.programmerHints = programmerHints;
      }
    },
    4, // maxItems - programmerHints has maxOccurs="4"
    true // isOptional - programmerHints is optional in DeviceInformation
  );

  // Map internal methods to ProgrammerHintsSlice interface
  return {
    addProgrammerHint: internalSlice.addLegibleDescription,
    removeProgrammerHint: internalSlice.removeLegibleDescription,
    removeAllProgrammerHints: internalSlice.removeAllLegibleDescriptions,
    updateProgrammerHintTextElement: internalSlice.updateTextElement,
    updateProgrammerHintLanguage: internalSlice.updateLanguage,
    updateProgrammerHintUri: internalSlice.updateUri,
    addEmptyProgrammerHint: internalSlice.addEmptyLegibleDescription,
  };
}
