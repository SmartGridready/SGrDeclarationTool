import { FunctionalProfileDataPoint } from "@/models";
import {
  createDynamicParameterListSlice,
  DynamicParameterListSlice,
} from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-slice";

/**
 * Creates a parameter list slice for FunctionalProfile stores.
 * This is a convenience wrapper around the shared createDynamicParameterListSlice.
 */
export function createParameterListSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataPoint: (state: TState, index: number) => FunctionalProfileDataPoint | undefined
): DynamicParameterListSlice {
  return createDynamicParameterListSlice(
    set,
    (state, dataPointIndex) => getDataPoint(state, dataPointIndex)?.dataPoint.parameterList,
    (state, dataPointIndex, parameterList) => {
      const dp = getDataPoint(state, dataPointIndex);
      if (dp) {
        dp.dataPoint.parameterList = parameterList;
      }
    }
  );
}
