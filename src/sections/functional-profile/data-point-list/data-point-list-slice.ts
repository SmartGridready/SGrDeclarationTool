import {
  FunctionalProfileDataPoint,
  DataDirectionFunctionalProfile,
  PresenceLevel,
  DataTypeFunctionalProfile,
  Units,
  LegibleDescription,
  Language,
  DynamicParameterDescription,
  DataTypeProduct,
  EnumMapProduct,
  EnumEntryProductRecord,
  BitmapProduct,
  BitmapEntryProduct,
} from "@/models";
import { createSimpleDataType } from "@/sections/functional-profile/data-point-list/data-type-utils";
import {
  SetState,
  getDataPoint,
  ensureArray,
  removeArrayItem,
  normalizeString,
} from "@/sections/shared/utils/slice-utils";
import {
  createEnumSlice,
  EnumSlice,
} from "@/sections/functional-profile/data-point-list/enum/enum-slice";
import {
  createBitmapSlice,
  BitmapSlice,
} from "@/sections/functional-profile/data-point-list/bitmap/bitmap-slice";
import {
  createJsonSlice,
  JsonSlice,
} from "@/sections/functional-profile/data-point-list/json/json-slice";
import {
  createDataPointAlternativeNamesSlice,
  DataPointAlternativeNamesSlice,
} from "@/sections/functional-profile/data-point-list/alternative-names/alternative-names-slice";

export interface DataPointListSlice
  extends EnumSlice,
    BitmapSlice,
    JsonSlice,
    DataPointAlternativeNamesSlice {
  // Main operations
  addDataPoint: (dataPoint: FunctionalProfileDataPoint) => void;
  removeDataPoint: (index: number) => void;
  removeAllDataPoints: () => void;

  // Field-specific updates for dataPoint
  updateDataPointName: (index: number, name: string) => void;
  updateDataDirection: (index: number, direction: DataDirectionFunctionalProfile) => void;
  updatePresenceLevel: (index: number, level: PresenceLevel) => void;
  updateDataType: (index: number, dataType: DataTypeFunctionalProfile) => void;
  updateUnit: (index: number, unit: Units) => void;
  updateArrayLength: (index: number, length: number | undefined) => void;

  // Legible description operations for data points
  addDataPointLegibleDescription: (dataPointIndex: number, description: LegibleDescription) => void;
  removeDataPointLegibleDescription: (dataPointIndex: number, descIndex: number) => void;
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

  // ParameterList operations for data points
  addDataPointParameterList: (dataPointIndex: number) => void;
  removeDataPointParameterList: (dataPointIndex: number) => void;
  addDataPointParameterListElement: (dataPointIndex: number) => void;
  removeDataPointParameterListElement: (dataPointIndex: number, paramIndex: number) => void;
  updateDataPointParameterListElementName: (
    dataPointIndex: number,
    paramIndex: number,
    name: string
  ) => void;
  updateDataPointParameterListElementDataType: (
    dataPointIndex: number,
    paramIndex: number,
    dataType: DataTypeProduct
  ) => void;
  updateDataPointParameterListElementDefaultValue: (
    dataPointIndex: number,
    paramIndex: number,
    defaultValue: string | undefined
  ) => void;
  addDataPointParameterDescription: (
    dataPointIndex: number,
    paramIndex: number,
    description: DynamicParameterDescription
  ) => void;
  removeDataPointParameterDescription: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number
  ) => void;
  updateDataPointParameterDescriptionText: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number,
    text: string
  ) => void;
  updateDataPointParameterDescriptionLanguage: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number,
    language: Language
  ) => void;
  updateDataPointParameterDescriptionUri: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number,
    uri: string | undefined
  ) => void;
  updateDataPointParameterDescriptionLabel: (
    dataPointIndex: number,
    paramIndex: number,
    descIndex: number,
    label: string | undefined
  ) => void;

  // ParameterList Enum operations (for DataTypeProduct)
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

  // ParameterList Bitmap operations (for DataTypeProduct)
  setParameterListBitmapDataType: (
    dataPointIndex: number,
    paramIndex: number,
    bitmap: BitmapProduct
  ) => void;
  addParameterListBitmapEntry: (
    dataPointIndex: number,
    paramIndex: number,
    entry: BitmapEntryProduct
  ) => void;
  removeParameterListBitmapEntry: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number
  ) => void;
  updateParameterListBitmapEntryLiteral: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateParameterListBitmapEntryHexMask: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    hexMask: string
  ) => void;
  updateParameterListBitmapEntryDescription: (
    dataPointIndex: number,
    paramIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  addEmptyParameterListBitmapEntry: (dataPointIndex: number, paramIndex: number) => void;

  // Convenience methods
  addEmptyDataPoint: () => void;
  addEmptyDataPointLegibleDescription: (dataPointIndex: number) => void;
  addEmptyDataPointParameterDescription: (dataPointIndex: number, paramIndex: number) => void;
}

const createEmptyDataPoint = (): FunctionalProfileDataPoint => ({
  dataPoint: {
    dataPointName: "",
    dataDirection: "R",
    presenceLevel: "M",
    dataType: createSimpleDataType("float64"),
    unit: "NO_UNITS",
  },
});

export const createDataPointListSlice = (set: SetState): DataPointListSlice => {
  const enumSlice = createEnumSlice(set);
  const bitmapSlice = createBitmapSlice(set);
  const jsonSlice = createJsonSlice(set);
  const alternativeNamesSlice = createDataPointAlternativeNamesSlice(set);

  return {
    ...enumSlice,
    ...bitmapSlice,
    ...jsonSlice,
    ...alternativeNamesSlice,

    addDataPoint: (dataPoint) =>
      set((state) => {
        if (state.profile) {
          const list = ensureArray(state.profile.dataPointList?.dataPointListElement, () => []);
          list.push(dataPoint);
          if (!state.profile.dataPointList) {
            state.profile.dataPointList = { dataPointListElement: list };
          } else {
            state.profile.dataPointList.dataPointListElement = list;
          }
        }
      }),

    removeDataPoint: (index) =>
      set((state) => {
        if (state.profile?.dataPointList?.dataPointListElement) {
          removeArrayItem(state.profile.dataPointList.dataPointListElement, index, () => {
            if (state.profile) {
              state.profile.dataPointList = undefined;
            }
          });
        }
      }),

    removeAllDataPoints: () =>
      set((state) => {
        if (state.profile) {
          state.profile.dataPointList = undefined;
        }
      }),

    updateDataPointName: (index, name) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.dataPointName = name;
        }
      }),

    updateDataDirection: (index, direction) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.dataDirection = direction;
        }
      }),

    updatePresenceLevel: (index, level) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.presenceLevel = level;
        }
      }),

    updateDataType: (index, dataType) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.dataType = dataType;
        }
      }),

    updateUnit: (index, unit) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.unit = unit;
        }
      }),

    updateArrayLength: (index, length) =>
      set((state) => {
        const dp = getDataPoint(state, index);
        if (dp) {
          dp.dataPoint.arrayLength = length;
        }
      }),

    addDataPointLegibleDescription: (dataPointIndex, description) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) {
          const list = ensureArray(dp.dataPoint.legibleDescription, () => []);
          if (list.length < 4) {
            list.push(description);
            dp.dataPoint.legibleDescription = list;
          }
        }
      }),

    removeDataPointLegibleDescription: (dataPointIndex, descIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp?.dataPoint.legibleDescription) {
          removeArrayItem(dp.dataPoint.legibleDescription, descIndex, () => {
            dp.dataPoint.legibleDescription = undefined;
          });
        }
      }),

    updateDataPointLegibleDescriptionText: (dataPointIndex, descIndex, text) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const desc = dp?.dataPoint.legibleDescription?.[descIndex];
        if (desc) {
          desc.textElement = text;
        }
      }),

    updateDataPointLegibleDescriptionLanguage: (dataPointIndex, descIndex, language) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const desc = dp?.dataPoint.legibleDescription?.[descIndex];
        if (desc) {
          desc.language = language;
        }
      }),

    addEmptyDataPoint: () =>
      set((state) => {
        if (state.profile) {
          const list = ensureArray(state.profile.dataPointList?.dataPointListElement, () => []);
          list.push(createEmptyDataPoint());
          if (!state.profile.dataPointList) {
            state.profile.dataPointList = { dataPointListElement: list };
          } else {
            state.profile.dataPointList.dataPointListElement = list;
          }
        }
      }),

    addEmptyDataPointLegibleDescription: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) {
          const list = ensureArray(dp.dataPoint.legibleDescription, () => []);
          if (list.length < 4) {
            list.push({ textElement: "", language: "en" });
            dp.dataPoint.legibleDescription = list;
          }
        }
      }),

    // ParameterList operations
    addDataPointParameterList: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) {
          dp.dataPoint.parameterList = {};
        }
      }),

    removeDataPointParameterList: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) {
          dp.dataPoint.parameterList = undefined;
        }
      }),

    addDataPointParameterListElement: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) {
          if (!dp.dataPoint.parameterList) {
            dp.dataPoint.parameterList = {};
          }
          const list = ensureArray(dp.dataPoint.parameterList.parameterListElement, () => []);
          list.push({
            name: "",
            dataType: { float64: {} },
          });
          dp.dataPoint.parameterList.parameterListElement = list;
        }
      }),

    removeDataPointParameterListElement: (dataPointIndex, paramIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp?.dataPoint.parameterList?.parameterListElement) {
          removeArrayItem(dp.dataPoint.parameterList.parameterListElement, paramIndex, () => {
            if (dp.dataPoint.parameterList) {
              dp.dataPoint.parameterList.parameterListElement = undefined;
            }
          });
        }
      }),

    updateDataPointParameterListElementName: (dataPointIndex, paramIndex, name) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param) {
          param.name = name;
        }
      }),

    updateDataPointParameterListElementDataType: (dataPointIndex, paramIndex, dataType) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param) {
          param.dataType = dataType;
        }
      }),

    updateDataPointParameterListElementDefaultValue: (dataPointIndex, paramIndex, defaultValue) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param) {
          param.defaultValue = normalizeString(defaultValue);
        }
      }),

    addDataPointParameterDescription: (dataPointIndex, paramIndex, description) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param) {
          const list = ensureArray(param.parameterDescription, () => []);
          list.push(description);
          param.parameterDescription = list;
        }
      }),

    removeDataPointParameterDescription: (dataPointIndex, paramIndex, descIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param?.parameterDescription) {
          removeArrayItem(param.parameterDescription, descIndex, () => {
            param.parameterDescription = undefined;
          });
        }
      }),

    updateDataPointParameterDescriptionText: (dataPointIndex, paramIndex, descIndex, text) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const desc =
          dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.parameterDescription?.[
            descIndex
          ];
        if (desc) {
          desc.textElement = text;
        }
      }),

    updateDataPointParameterDescriptionLanguage: (
      dataPointIndex,
      paramIndex,
      descIndex,
      language
    ) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const desc =
          dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.parameterDescription?.[
            descIndex
          ];
        if (desc) {
          desc.language = language;
        }
      }),

    updateDataPointParameterDescriptionUri: (dataPointIndex, paramIndex, descIndex, uri) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const desc =
          dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.parameterDescription?.[
            descIndex
          ];
        if (desc) {
          desc.uri = normalizeString(uri);
        }
      }),

    updateDataPointParameterDescriptionLabel: (dataPointIndex, paramIndex, descIndex, label) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const desc =
          dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.parameterDescription?.[
            descIndex
          ];
        if (desc) {
          desc.label = normalizeString(label);
        }
      }),

    addEmptyDataPointParameterDescription: (dataPointIndex, paramIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param) {
          const list = ensureArray(param.parameterDescription, () => []);
          list.push({ textElement: "", language: "en" });
          param.parameterDescription = list;
        }
      }),

    // ParameterList Enum operations
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

    updateParameterListEnumEntryDescription: (
      dataPointIndex,
      paramIndex,
      entryIndex,
      description
    ) =>
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

    // ParameterList Bitmap operations
    setParameterListBitmapDataType: (dataPointIndex, paramIndex, bitmap) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param) {
          param.dataType = { bitmap: bitmap };
        }
      }),

    addParameterListBitmapEntry: (dataPointIndex, paramIndex, entry) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param && "bitmap" in param.dataType) {
          const bitmapType = param.dataType.bitmap;
          const entries = ensureArray(bitmapType.bitmapEntry, () => []);
          entries.push(entry);
          bitmapType.bitmapEntry = entries;
        }
      }),

    removeParameterListBitmapEntry: (dataPointIndex, paramIndex, entryIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param && "bitmap" in param.dataType) {
          const bitmapType = param.dataType.bitmap;
          removeArrayItem(bitmapType.bitmapEntry, entryIndex, () => {
            bitmapType.bitmapEntry = [];
          });
        }
      }),

    updateParameterListBitmapEntryLiteral: (dataPointIndex, paramIndex, entryIndex, literal) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const entry =
          dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.dataType &&
          "bitmap" in dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType &&
          dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType.bitmap.bitmapEntry?.[
            entryIndex
          ];
        if (entry) {
          entry.literal = literal;
        }
      }),

    updateParameterListBitmapEntryHexMask: (dataPointIndex, paramIndex, entryIndex, hexMask) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const entry =
          dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.dataType &&
          "bitmap" in dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType &&
          dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType.bitmap.bitmapEntry?.[
            entryIndex
          ];
        if (entry) {
          entry.hexMask = hexMask;
        }
      }),

    updateParameterListBitmapEntryDescription: (
      dataPointIndex,
      paramIndex,
      entryIndex,
      description
    ) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const entry =
          dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex]?.dataType &&
          "bitmap" in dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType &&
          dp.dataPoint.parameterList.parameterListElement[paramIndex].dataType.bitmap.bitmapEntry?.[
            entryIndex
          ];
        if (entry) {
          entry.description = normalizeString(description);
        }
      }),

    addEmptyParameterListBitmapEntry: (dataPointIndex, paramIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const param = dp?.dataPoint.parameterList?.parameterListElement?.[paramIndex];
        if (param && "bitmap" in param.dataType) {
          const bitmapType = param.dataType.bitmap;
          const entries = ensureArray(bitmapType.bitmapEntry, () => []);
          entries.push({ literal: "", hexMask: "" });
          bitmapType.bitmapEntry = entries;
        }
      }),
  };
};
