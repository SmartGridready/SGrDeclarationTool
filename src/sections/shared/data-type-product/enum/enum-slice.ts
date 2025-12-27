import { EnumMapProduct, EnumEntryProductRecord, DataTypeProduct } from "@/models";
import { createEmptyEnumEntryProduct } from "@/utils/factory-utils";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface DataTypeProductEnumSlice {
  setEnumDataType: (enumMap: EnumMapProduct) => void;
  addEnumEntry: (entry: EnumEntryProductRecord) => void;
  removeEnumEntry: (entryIndex: number) => void;
  updateEnumEntryLiteral: (entryIndex: number, literal: string) => void;
  updateEnumEntryOrdinal: (entryIndex: number, ordinal: number | undefined) => void;
  updateEnumEntryDescription: (entryIndex: number, description: string | undefined) => void;
  updateEnumHexMask: (hexMask: string | undefined) => void;
  addEmptyEnumEntry: () => void;
}

/**
 * Creates a generic enum slice for DataTypeProduct that works with any store state.
 * @param set - The Zustand set function
 * @param getDataType - Function to get the DataTypeProduct from the store state
 * @param setDataType - Function to set the DataTypeProduct in the store state
 */
export function createDataTypeProductEnumSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataType: (state: TState) => DataTypeProduct | undefined,
  setDataType: (state: TState, dataType: DataTypeProduct) => void
): DataTypeProductEnumSlice {
  return {
    setEnumDataType: (enumMap) =>
      set((state) => {
        setDataType(state, { enum: enumMap });
      }),

    addEnumEntry: (entry) =>
      set((state) => {
        const dataType = getDataType(state);
        if (dataType && "enum" in dataType) {
          const enumType = dataType.enum;
          const entries = ensureArray(enumType.enumEntry, () => []);
          entries.push(entry);
          enumType.enumEntry = entries;
        }
      }),

    removeEnumEntry: (entryIndex) =>
      set((state) => {
        const dataType = getDataType(state);
        if (dataType && "enum" in dataType) {
          const enumType = dataType.enum;
          removeArrayItem(enumType.enumEntry, entryIndex, () => {
            enumType.enumEntry = [];
          });
        }
      }),

    updateEnumEntryLiteral: (entryIndex, literal) =>
      set((state) => {
        const dataType = getDataType(state);
        const entry = dataType && "enum" in dataType && dataType.enum.enumEntry?.[entryIndex];
        if (entry) entry.literal = literal;
      }),

    updateEnumEntryOrdinal: (entryIndex, ordinal) =>
      set((state) => {
        const dataType = getDataType(state);
        const entry = dataType && "enum" in dataType && dataType.enum.enumEntry?.[entryIndex];
        if (entry) entry.ordinal = ordinal;
      }),

    updateEnumEntryDescription: (entryIndex, description) =>
      set((state) => {
        const dataType = getDataType(state);
        const entry = dataType && "enum" in dataType && dataType.enum.enumEntry?.[entryIndex];
        if (entry) entry.description = description;
      }),

    updateEnumHexMask: (hexMask) =>
      set((state) => {
        const dataType = getDataType(state);
        if (dataType && "enum" in dataType) {
          dataType.enum.hexMask = hexMask;
        }
      }),

    addEmptyEnumEntry: () =>
      set((state) => {
        const dataType = getDataType(state);
        if (dataType && "enum" in dataType) {
          const entries = ensureArray(dataType.enum.enumEntry, () => []);
          entries.push(createEmptyEnumEntryProduct());
          dataType.enum.enumEntry = entries;
        }
      }),
  };
}
