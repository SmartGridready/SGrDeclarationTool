import { DynamicParameterDescription, Language } from "@/models";
import {
  SetState,
  getDataPoint,
  ensureArray,
  removeArrayItem,
  normalizeString,
} from "@/sections/shared/utils/slice-utils";

export interface ParameterDescriptionsSlice {
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
  addEmptyDataPointParameterDescription: (dataPointIndex: number, paramIndex: number) => void;
}

export const createParameterDescriptionsSlice = (set: SetState): ParameterDescriptionsSlice => ({
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

  updateDataPointParameterDescriptionLanguage: (dataPointIndex, paramIndex, descIndex, language) =>
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
});
