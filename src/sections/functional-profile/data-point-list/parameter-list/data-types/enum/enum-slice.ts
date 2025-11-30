import { EnumMapProduct, EnumEntryProductRecord } from "@/models";
import {
  SetState,
  getDataPoint,
  ensureArray,
  removeArrayItem,
  normalizeString,
} from "@/sections/shared/utils/slice-utils";

export interface ParameterListEnumSlice {
  setParameterListEnumDataType: (
    dataPointIndex: number,
    paramIndex: number,
    enumMap: EnumMapProduct
  ) => void;
  addParameterListEnumEntry: (
    dataPointIndex: number,
    paramIndex: number,
    entry: EnumEntryProductRecord
  ) => void;
  removeParameterListEnumEntry: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number
  ) => void;
  updateParameterListEnumEntryLiteral: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateParameterListEnumEntryOrdinal: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    ordinal: number | undefined
  ) => void;
  updateParameterListEnumEntryDescription: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  updateParameterListEnumHexMask: (
    dataPointIndex: number,
    paramIndex: number,
    hexMask: string | undefined
  ) => void;
  addEmptyParameterListEnumEntry: (dataPointIndex: number, paramIndex: number) => void;
}

export const createParameterListEnumSlice = (set: SetState): ParameterListEnumSlice => ({
  setParameterListEnumDataType: (dataPointIndex, paramIndex, enumMap) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
      if (param) {
        param.dataType = { enum: enumMap };
      }
    }),

  addParameterListEnumEntry: (dataPointIndex, paramIndex, entry) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
      if (param && "enum" in param.dataType) {
        const enumType = param.dataType.enum;
        const entries = ensureArray(enumType.enumEntry, () => []);
        entries.push(entry);
        enumType.enumEntry = entries;
      }
    }),

  removeParameterListEnumEntry: (dataPointIndex, paramIndex, entryIndex) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
      if (param && "enum" in param.dataType) {
        const enumType = param.dataType.enum;
        removeArrayItem(enumType.enumEntry, entryIndex, () => {
          enumType.enumEntry = [];
        });
      }
    }),

  updateParameterListEnumEntryLiteral: (dataPointIndex, paramIndex, entryIndex, literal) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const entry =
        dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.dataType &&
        "enum" in dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType &&
        dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType.enum.enumEntry?.[
          entryIndex
        ];
      if (entry) {
        entry.literal = literal;
      }
    }),

  updateParameterListEnumEntryOrdinal: (dataPointIndex, paramIndex, entryIndex, ordinal) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const entry =
        dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.dataType &&
        "enum" in dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType &&
        dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType.enum.enumEntry?.[
          entryIndex
        ];
      if (entry) {
        entry.ordinal = ordinal;
      }
    }),

  updateParameterListEnumEntryDescription: (dataPointIndex, paramIndex, entryIndex, description) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const entry =
        dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.dataType &&
        "enum" in dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType &&
        dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType.enum.enumEntry?.[
          entryIndex
        ];
      if (entry) {
        entry.description = normalizeString(description);
      }
    }),

  updateParameterListEnumHexMask: (dataPointIndex, paramIndex, hexMask) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
      if (param && "enum" in param.dataType) {
        param.dataType.enum.hexMask = normalizeString(hexMask);
      }
    }),

  addEmptyParameterListEnumEntry: (dataPointIndex, paramIndex) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
      if (param && "enum" in param.dataType) {
        const enumType = param.dataType.enum;
        const entries = ensureArray(enumType.enumEntry, () => []);
        entries.push({ literal: "" });
        enumType.enumEntry = entries;
      }
    }),
});
