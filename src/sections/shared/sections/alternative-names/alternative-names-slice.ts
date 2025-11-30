import { AlternativeNames } from "@/models";
import { normalizeString } from "@/sections/shared/utils/slice-utils";

export interface AlternativeNamesSlice {
  // Main operations
  addAlternativeNames: () => void;
  removeAlternativeNames: () => void;

  // Field-specific updates
  updateSLV1Name: (sLV1Name: string | undefined) => void;
  updateWorkName: (workName: string | undefined) => void;
  updateManufName: (manufName: string | undefined) => void;
  updateIec61850Name: (iec61850Name: string | undefined) => void;
  updateSarefName: (sarefName: string | undefined) => void;
  updateEebusName: (eebusName: string | undefined) => void;
  updateSunSpecName: (sunSpecName: string | undefined) => void;
  updateHpBwpName: (hpBwpName: string | undefined) => void;
  updateEn17609Name: (en17609Name: string | undefined) => void;
}

/**
 * Helper to check if all alternative name fields are empty
 */
function isEmpty(alternativeNames: AlternativeNames): boolean {
  return (
    !alternativeNames.sLV1Name &&
    !alternativeNames.workName &&
    !alternativeNames.manufName &&
    !alternativeNames.iec61850Name &&
    !alternativeNames.sarefName &&
    !alternativeNames.eebusName &&
    !alternativeNames.sunSpecName &&
    !alternativeNames.hpBwpName &&
    !alternativeNames.en17609Name
  );
}

/**
 * Creates a generic alternative names slice that works with any store state
 * @param set - The Zustand set function
 * @param getAlternativeNames - Function to get alternativeNames from the store state
 * @param setAlternativeNames - Function to set alternativeNames in the store state
 * @param isOptional - Whether alternativeNames is optional (default: true)
 */
export function createAlternativeNamesSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getAlternativeNames: (state: TState) => AlternativeNames | undefined,
  setAlternativeNames: (state: TState, alternativeNames: AlternativeNames | undefined) => void,
  isOptional: boolean = true
): AlternativeNamesSlice {
  return {
    addAlternativeNames: () =>
      set((state) => {
        const current = getAlternativeNames(state);
        if (!current) {
          setAlternativeNames(state, {});
        }
      }),

    removeAlternativeNames: () =>
      set((state) => {
        if (isOptional) {
          setAlternativeNames(state, undefined);
        }
      }),

    updateSLV1Name: (value) =>
      set((state) => {
        let alternativeNames = getAlternativeNames(state);
        // Create object if it doesn't exist and we're setting a value
        if (!alternativeNames && value) {
          alternativeNames = {};
          setAlternativeNames(state, alternativeNames);
        }
        if (alternativeNames) {
          alternativeNames.sLV1Name = normalizeString(value);
          if (isOptional && isEmpty(alternativeNames)) {
            setAlternativeNames(state, undefined);
          }
        }
      }),

    updateWorkName: (value) =>
      set((state) => {
        let alternativeNames = getAlternativeNames(state);
        if (!alternativeNames && value) {
          alternativeNames = {};
          setAlternativeNames(state, alternativeNames);
        }
        if (alternativeNames) {
          alternativeNames.workName = normalizeString(value);
          if (isOptional && isEmpty(alternativeNames)) {
            setAlternativeNames(state, undefined);
          }
        }
      }),

    updateManufName: (value) =>
      set((state) => {
        let alternativeNames = getAlternativeNames(state);
        if (!alternativeNames && value) {
          alternativeNames = {};
          setAlternativeNames(state, alternativeNames);
        }
        if (alternativeNames) {
          alternativeNames.manufName = normalizeString(value);
          if (isOptional && isEmpty(alternativeNames)) {
            setAlternativeNames(state, undefined);
          }
        }
      }),

    updateIec61850Name: (value) =>
      set((state) => {
        let alternativeNames = getAlternativeNames(state);
        if (!alternativeNames && value) {
          alternativeNames = {};
          setAlternativeNames(state, alternativeNames);
        }
        if (alternativeNames) {
          alternativeNames.iec61850Name = normalizeString(value);
          if (isOptional && isEmpty(alternativeNames)) {
            setAlternativeNames(state, undefined);
          }
        }
      }),

    updateSarefName: (value) =>
      set((state) => {
        let alternativeNames = getAlternativeNames(state);
        if (!alternativeNames && value) {
          alternativeNames = {};
          setAlternativeNames(state, alternativeNames);
        }
        if (alternativeNames) {
          alternativeNames.sarefName = normalizeString(value);
          if (isOptional && isEmpty(alternativeNames)) {
            setAlternativeNames(state, undefined);
          }
        }
      }),

    updateEebusName: (value) =>
      set((state) => {
        let alternativeNames = getAlternativeNames(state);
        if (!alternativeNames && value) {
          alternativeNames = {};
          setAlternativeNames(state, alternativeNames);
        }
        if (alternativeNames) {
          alternativeNames.eebusName = normalizeString(value);
          if (isOptional && isEmpty(alternativeNames)) {
            setAlternativeNames(state, undefined);
          }
        }
      }),

    updateSunSpecName: (value) =>
      set((state) => {
        let alternativeNames = getAlternativeNames(state);
        if (!alternativeNames && value) {
          alternativeNames = {};
          setAlternativeNames(state, alternativeNames);
        }
        if (alternativeNames) {
          alternativeNames.sunSpecName = normalizeString(value);
          if (isOptional && isEmpty(alternativeNames)) {
            setAlternativeNames(state, undefined);
          }
        }
      }),

    updateHpBwpName: (value) =>
      set((state) => {
        let alternativeNames = getAlternativeNames(state);
        if (!alternativeNames && value) {
          alternativeNames = {};
          setAlternativeNames(state, alternativeNames);
        }
        if (alternativeNames) {
          alternativeNames.hpBwpName = normalizeString(value);
          if (isOptional && isEmpty(alternativeNames)) {
            setAlternativeNames(state, undefined);
          }
        }
      }),

    updateEn17609Name: (value) =>
      set((state) => {
        let alternativeNames = getAlternativeNames(state);
        if (!alternativeNames && value) {
          alternativeNames = {};
          setAlternativeNames(state, alternativeNames);
        }
        if (alternativeNames) {
          alternativeNames.en17609Name = normalizeString(value);
          if (isOptional && isEmpty(alternativeNames)) {
            setAlternativeNames(state, undefined);
          }
        }
      }),
  };
}

/**
 * Helper function to update an AlternativeNames field
 * Can be reused for both FunctionalProfile-level and DataPoint-level
 * Auto-creates the object if it doesn't exist and we're setting a value
 * Auto-cleans up the object if all fields are empty
 */
export function updateAlternativeNamesField<T extends { alternativeNames?: AlternativeNames }>(
  obj: T,
  field: keyof AlternativeNames,
  value: string | undefined
): void {
  // Create object if it doesn't exist and we're setting a value
  if (!obj.alternativeNames && value) {
    obj.alternativeNames = {};
  }

  if (obj.alternativeNames) {
    obj.alternativeNames[field] = normalizeString(value);

    // Clean up if all fields are empty
    if (isEmpty(obj.alternativeNames)) {
      obj.alternativeNames = undefined;
    }
  }
}
