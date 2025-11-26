import {
  FunctionalProfileFrame,
  EnumMapFunctionalProfile,
  EnumEntryRecordFunctionalProfile,
} from "@/models";

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

type StoreState = {
  profile?: FunctionalProfileFrame;
};

type SetState = (fn: (state: StoreState) => void) => void;

export const createEnumSlice = (set: SetState): EnumSlice => ({
  setEnumDataType: (index, enumMap) =>
    set((state) => {
      const dp = state.profile?.dataPointList?.dataPointListElement?.[index];
      if (dp) {
        dp.dataPoint.dataType = { enum: enumMap };
      }
    }),

  addEnumEntry: (dataPointIndex, entry) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
      if (dp && "enum" in dp.dataPoint.dataType) {
        if (!dp.dataPoint.dataType.enum.enumEntry) {
          dp.dataPoint.dataType.enum.enumEntry = [];
        }
        dp.dataPoint.dataType.enum.enumEntry.push(entry);
      }
    }),

  removeEnumEntry: (dataPointIndex, entryIndex) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
      const entries = dp?.dataPoint.dataType;
      if (
        entries &&
        "enum" in entries &&
        entries.enum.enumEntry &&
        entryIndex >= 0 &&
        entryIndex < entries.enum.enumEntry.length
      ) {
        entries.enum.enumEntry.splice(entryIndex, 1);
        if (entries.enum.enumEntry.length === 0) {
          entries.enum.enumEntry = undefined;
        }
      }
    }),

  updateEnumEntryLiteral: (dataPointIndex, entryIndex, literal) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
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
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
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
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
      if (dp && "enum" in dp.dataPoint.dataType) {
        dp.dataPoint.dataType.enum.hexMask = hexMask;
      }
    }),

  addEmptyEnumEntry: (dataPointIndex) =>
    set((state) => {
      const dp =
        state.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
      if (dp && "enum" in dp.dataPoint.dataType) {
        if (!dp.dataPoint.dataType.enum.enumEntry) {
          dp.dataPoint.dataType.enum.enumEntry = [];
        }
        dp.dataPoint.dataType.enum.enumEntry.push({
          literal: "",
        });
      }
    }),
});
