import {
  EnumMapProduct,
  EnumEntryProductRecord,
  FunctionalProfileDataPoint,
  DynamicParameterDescriptionListElement,
} from "@/models";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

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

export function createParameterListEnumSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataPoint: (state: TState, index: number) => FunctionalProfileDataPoint | undefined
): ParameterListEnumSlice {
  const getParameter = (
    state: TState,
    dataPointIndex: number,
    paramIndex: number
  ): DynamicParameterDescriptionListElement | undefined => {
    const dp = getDataPoint(state, dataPointIndex);
    return dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
  };

  return {
    setParameterListEnumDataType: (dataPointIndex, paramIndex, enumMap) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        if (param) param.dataType = { enum: enumMap };
      }),

    addParameterListEnumEntry: (dataPointIndex, paramIndex, entry) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        if (param && "enum" in param.dataType) {
          const enumType = param.dataType.enum;
          const entries = ensureArray(enumType.enumEntry, () => []);
          entries.push(entry);
          enumType.enumEntry = entries;
        }
      }),

    removeParameterListEnumEntry: (dataPointIndex, paramIndex, entryIndex) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        if (param && "enum" in param.dataType) {
          const enumType = param.dataType.enum;
          removeArrayItem(enumType.enumEntry, entryIndex, () => {
            enumType.enumEntry = [];
          });
        }
      }),

    updateParameterListEnumEntryLiteral: (dataPointIndex, paramIndex, entryIndex, literal) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        const entry =
          param?.dataType &&
          "enum" in param.dataType &&
          param.dataType.enum.enumEntry?.[entryIndex];
        if (entry) entry.literal = literal;
      }),

    updateParameterListEnumEntryOrdinal: (dataPointIndex, paramIndex, entryIndex, ordinal) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        const entry =
          param?.dataType &&
          "enum" in param.dataType &&
          param.dataType.enum.enumEntry?.[entryIndex];
        if (entry) entry.ordinal = ordinal;
      }),

    updateParameterListEnumEntryDescription: (
      dataPointIndex,
      paramIndex,
      entryIndex,
      description
    ) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        const entry =
          param?.dataType &&
          "enum" in param.dataType &&
          param.dataType.enum.enumEntry?.[entryIndex];
        if (entry) entry.description = description;
      }),

    updateParameterListEnumHexMask: (dataPointIndex, paramIndex, hexMask) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        if (param && "enum" in param.dataType) param.dataType.enum.hexMask = hexMask;
      }),

    addEmptyParameterListEnumEntry: (dataPointIndex, paramIndex) =>
      set((state) => {
        const param = getParameter(state, dataPointIndex, paramIndex);
        if (param && "enum" in param.dataType) {
          const entries = ensureArray(param.dataType.enum.enumEntry, () => []);
          entries.push({ literal: "" });
          param.dataType.enum.enumEntry = entries;
        }
      }),
  };
}
