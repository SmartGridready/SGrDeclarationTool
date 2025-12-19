import { LegibleDescription, Language } from "@/models";
import { ensureArray, removeArrayItem, normalizeString } from "@/utils/slice-utils";

export interface LegibleDescriptionSlice {
  // Main operations
  addLegibleDescription: (legibleDescription: LegibleDescription) => void;
  removeLegibleDescription: (index: number) => void;
  removeAllLegibleDescriptions: () => void;

  // Field-specific updates
  updateTextElement: (index: number, textElement: string) => void;
  updateLanguage: (index: number, language: Language) => void;
  updateUri: (index: number, uri: string | undefined) => void;

  // Convenience methods
  addEmptyLegibleDescription: () => void;
}

const createEmptyLegibleDescription = (): LegibleDescription => ({
  textElement: "",
  language: "en",
});

/**
 * Creates a generic legible description slice that works with any store state
 * @param set - The Zustand set function
 * @param getLegibleDescriptions - Function to get legibleDescriptions array from the store state
 * @param setLegibleDescriptions - Function to set legibleDescriptions array in the store state
 * @param maxItems - Maximum number of items allowed (default: 4)
 * @param isOptional - Whether legibleDescriptions is optional (default: true)
 */
export function createLegibleDescriptionSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getLegibleDescriptions: (state: TState) => LegibleDescription[] | undefined,
  setLegibleDescriptions: (
    state: TState,
    legibleDescriptions: LegibleDescription[] | undefined
  ) => void,
  maxItems: number = 4,
  isOptional: boolean = true
): LegibleDescriptionSlice {
  return {
    addLegibleDescription: (legibleDescription) =>
      set((state) => {
        const list = ensureArray(getLegibleDescriptions(state), () => []);
        if (list.length < maxItems) {
          list.push(legibleDescription);
          setLegibleDescriptions(state, list);
        }
      }),

    removeLegibleDescription: (index) =>
      set((state) => {
        const current = getLegibleDescriptions(state);
        if (current) {
          removeArrayItem(current, index, () => {
            if (isOptional) {
              setLegibleDescriptions(state, undefined);
            } else {
              setLegibleDescriptions(state, []);
            }
          });
        }
      }),

    removeAllLegibleDescriptions: () =>
      set((state) => {
        if (isOptional) {
          setLegibleDescriptions(state, undefined);
        } else {
          setLegibleDescriptions(state, []);
        }
      }),

    updateTextElement: (index, textElement) =>
      set((state) => {
        const array = getLegibleDescriptions(state);
        if (array?.[index]) {
          const updated = [...array];
          updated[index] = { ...updated[index], textElement };
          setLegibleDescriptions(state, updated);
        }
      }),

    updateLanguage: (index, language) =>
      set((state) => {
        const array = getLegibleDescriptions(state);
        if (array?.[index]) {
          const updated = [...array];
          updated[index] = { ...updated[index], language };
          setLegibleDescriptions(state, updated);
        }
      }),

    updateUri: (index, uri) =>
      set((state) => {
        const array = getLegibleDescriptions(state);
        if (array?.[index]) {
          const updated = [...array];
          updated[index] = { ...updated[index], uri: normalizeString(uri) };
          setLegibleDescriptions(state, updated);
        }
      }),

    addEmptyLegibleDescription: () =>
      set((state) => {
        const list = ensureArray(getLegibleDescriptions(state), () => []);
        if (list.length < maxItems) {
          list.push(createEmptyLegibleDescription());
          setLegibleDescriptions(state, list);
        }
      }),
  };
}
