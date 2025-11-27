import {
  EnumMapFunctionalProfile,
  EnumEntryRecordFunctionalProfile,
} from "@/models";
import {
  SetState,
  getDataPoint,
  ensureArray,
  removeArrayItem,
} from "@/sections/shared/utils/slice-utils";

export interface EnumSlice {
  setEnumDataType: (index: number, enumMap: EnumMapFunctionalProfile) => void;
  addEnumEntry: (
    dataPointIndex: number,
    entry: EnumEntryRecordFunctionalProfile
  ) => void;
  removeEnumEntry: (dataPointIndex: number, entryIndex: number) => void;
  updateEnumEntryLiteral: (
    dataPointIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateEnumEntryDescription: (
    dataPointIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  updateEnumHexMask: (
    dataPointIndex: number,
    hexMask: string | undefined
  ) => void;
  addEmptyEnumEntry: (dataPointIndex: number) => void;
}

export const createEnumSlice = (set: SetState): EnumSlice => ({
  setEnumDataType: (index, enumMap) =>
    set((state) => {
      const dp = getDataPoint(state, index);
      if (dp) {
        dp.dataPoint.dataType = { enum: enumMap };
      }
    }),

  addEnumEntry: (dataPointIndex, entry) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp && "enum" in dp.dataPoint.dataType) {
        const enumType = dp.dataPoint.dataType.enum;
        const entries = ensureArray(enumType.enumEntry, () => []);
        entries.push(entry);
        enumType.enumEntry = entries;
      }
    }),

  removeEnumEntry: (dataPointIndex, entryIndex) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp && "enum" in dp.dataPoint.dataType) {
        const enumType = dp.dataPoint.dataType.enum;
        removeArrayItem(enumType.enumEntry, entryIndex, () => {
          enumType.enumEntry = undefined;
        });
      }
    }),

  updateEnumEntryLiteral: (dataPointIndex, entryIndex, literal) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const entry =
        dp?.dataPoint.dataType &&
        "enum" in dp.dataPoint.dataType &&
        dp.dataPoint.dataType.enum.enumEntry?.[entryIndex];
      if (entry) {
        entry.literal = literal;
      }
    }),

  updateEnumEntryDescription: (dataPointIndex, entryIndex, description) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const entry =
        dp?.dataPoint.dataType &&
        "enum" in dp.dataPoint.dataType &&
        dp.dataPoint.dataType.enum.enumEntry?.[entryIndex];
      if (entry) {
        entry.description = description;
      }
    }),

  updateEnumHexMask: (dataPointIndex, hexMask) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp && "enum" in dp.dataPoint.dataType) {
        const enumType = dp.dataPoint.dataType.enum;
        enumType.hexMask = hexMask;
      }
    }),

  addEmptyEnumEntry: (dataPointIndex) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp && "enum" in dp.dataPoint.dataType) {
        const enumType = dp.dataPoint.dataType.enum;
        const entries = ensureArray(enumType.enumEntry, () => []);
        entries.push({ literal: "" });
        enumType.enumEntry = entries;
      }
    }),
});
