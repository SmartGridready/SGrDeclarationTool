import { SetState, getDataPoint } from "@/sections/shared/utils/slice-utils";
import { updateAlternativeNamesField } from "@/sections/shared/sections/alternative-names/alternative-names-slice";

export interface DataPointAlternativeNamesSlice {
  // AlternativeNames operations for data points
  addDataPointAlternativeNames: (dataPointIndex: number) => void;
  removeDataPointAlternativeNames: (dataPointIndex: number) => void;
  updateDataPointSLV1Name: (dataPointIndex: number, value: string | undefined) => void;
  updateDataPointWorkName: (dataPointIndex: number, value: string | undefined) => void;
  updateDataPointManufName: (dataPointIndex: number, value: string | undefined) => void;
  updateDataPointIec61850Name: (dataPointIndex: number, value: string | undefined) => void;
  updateDataPointSarefName: (dataPointIndex: number, value: string | undefined) => void;
  updateDataPointEebusName: (dataPointIndex: number, value: string | undefined) => void;
  updateDataPointSunSpecName: (dataPointIndex: number, value: string | undefined) => void;
  updateDataPointHpBwpName: (dataPointIndex: number, value: string | undefined) => void;
  updateDataPointEn17609Name: (dataPointIndex: number, value: string | undefined) => void;
}

/**
 * Creates alternative names slice for data points
 */
export const createDataPointAlternativeNamesSlice = (
  set: SetState
): DataPointAlternativeNamesSlice => ({
  // AlternativeNames operations
  addDataPointAlternativeNames: (dataPointIndex) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp) {
        dp.dataPoint.alternativeNames = {};
      }
    }),

  removeDataPointAlternativeNames: (dataPointIndex) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp) {
        dp.dataPoint.alternativeNames = undefined;
      }
    }),

  updateDataPointSLV1Name: (dataPointIndex, value) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp) {
        updateAlternativeNamesField(dp.dataPoint, "sLV1Name", value);
      }
    }),

  updateDataPointWorkName: (dataPointIndex, value) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp) {
        updateAlternativeNamesField(dp.dataPoint, "workName", value);
      }
    }),

  updateDataPointManufName: (dataPointIndex, value) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp) {
        updateAlternativeNamesField(dp.dataPoint, "manufName", value);
      }
    }),

  updateDataPointIec61850Name: (dataPointIndex, value) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp) {
        updateAlternativeNamesField(dp.dataPoint, "iec61850Name", value);
      }
    }),

  updateDataPointSarefName: (dataPointIndex, value) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp) {
        updateAlternativeNamesField(dp.dataPoint, "sarefName", value);
      }
    }),

  updateDataPointEebusName: (dataPointIndex, value) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp) {
        updateAlternativeNamesField(dp.dataPoint, "eebusName", value);
      }
    }),

  updateDataPointSunSpecName: (dataPointIndex, value) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp) {
        updateAlternativeNamesField(dp.dataPoint, "sunSpecName", value);
      }
    }),

  updateDataPointHpBwpName: (dataPointIndex, value) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp) {
        updateAlternativeNamesField(dp.dataPoint, "hpBwpName", value);
      }
    }),

  updateDataPointEn17609Name: (dataPointIndex, value) =>
    set((state) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp) {
        updateAlternativeNamesField(dp.dataPoint, "en17609Name", value);
      }
    }),
});
