import { FunctionalProfileDataPoint } from "@/models";
import { updateAlternativeNamesField } from "@/sections/shared/alternative-names/alternative-names-slice";

export interface DataPointAlternativeNamesSlice {
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
 * Creates a generic data point alternative names slice that works with any store state
 */
export function createDataPointAlternativeNamesSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataPoint: (state: TState, index: number) => FunctionalProfileDataPoint | undefined
): DataPointAlternativeNamesSlice {
  return {
    addDataPointAlternativeNames: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) dp.dataPoint.alternativeNames = {};
      }),

    removeDataPointAlternativeNames: (dataPointIndex) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) dp.dataPoint.alternativeNames = undefined;
      }),

    updateDataPointSLV1Name: (dataPointIndex, value) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) updateAlternativeNamesField(dp.dataPoint, "sLV1Name", value);
      }),

    updateDataPointWorkName: (dataPointIndex, value) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) updateAlternativeNamesField(dp.dataPoint, "workName", value);
      }),

    updateDataPointManufName: (dataPointIndex, value) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) updateAlternativeNamesField(dp.dataPoint, "manufName", value);
      }),

    updateDataPointIec61850Name: (dataPointIndex, value) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) updateAlternativeNamesField(dp.dataPoint, "iec61850Name", value);
      }),

    updateDataPointSarefName: (dataPointIndex, value) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) updateAlternativeNamesField(dp.dataPoint, "sarefName", value);
      }),

    updateDataPointEebusName: (dataPointIndex, value) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) updateAlternativeNamesField(dp.dataPoint, "eebusName", value);
      }),

    updateDataPointSunSpecName: (dataPointIndex, value) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) updateAlternativeNamesField(dp.dataPoint, "sunSpecName", value);
      }),

    updateDataPointHpBwpName: (dataPointIndex, value) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) updateAlternativeNamesField(dp.dataPoint, "hpBwpName", value);
      }),

    updateDataPointEn17609Name: (dataPointIndex, value) =>
      set((state) => {
        const dp = getDataPoint(state, dataPointIndex);
        if (dp) updateAlternativeNamesField(dp.dataPoint, "en17609Name", value);
      }),
  };
}
