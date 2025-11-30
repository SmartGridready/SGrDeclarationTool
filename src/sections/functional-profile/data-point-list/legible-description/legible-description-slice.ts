import { SetState, getDataPoint } from "@/sections/shared/utils/slice-utils";
import { Language } from "@/models";

export interface DataPointLegibleDescriptionSlice {
  // LegibleDescription operations for data points
  addDataPointLegibleDescription: (dataPointIndex: number) => void;
  removeDataPointLegibleDescription: (dataPointIndex: number, descIndex: number) => void;
  removeAllDataPointLegibleDescriptions: (dataPointIndex: number) => void;
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
  updateDataPointLegibleDescriptionUri: (
    dataPointIndex: number,
    descIndex: number,
    uri: string | undefined
  ) => void;
}

/**
 * Creates legible description slice for data points
 */
export const createDataPointLegibleDescriptionSlice = (
  set: SetState
): DataPointLegibleDescriptionSlice => {
  return {
    addDataPointLegibleDescription: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) {
          const list = dp.dataPoint.legibleDescription || [];
          if (list.length < 4) {
            list.push({ textElement: "", language: "en" });
            dp.dataPoint.legibleDescription = list;
          }
        }
      }),

    removeDataPointLegibleDescription: (dataPointIndex, descIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp?.dataPoint.legibleDescription) {
          const list = dp.dataPoint.legibleDescription;
          if (descIndex >= 0 && descIndex < list.length) {
            list.splice(descIndex, 1);
            if (list.length === 0) {
              dp.dataPoint.legibleDescription = undefined;
            }
          }
        }
      }),

    removeAllDataPointLegibleDescriptions: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) {
          dp.dataPoint.legibleDescription = undefined;
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

    updateDataPointLegibleDescriptionUri: (dataPointIndex, descIndex, uri) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        const desc = dp?.dataPoint.legibleDescription?.[descIndex];
        if (desc) {
          desc.uri = uri;
        }
      }),
  };
};
