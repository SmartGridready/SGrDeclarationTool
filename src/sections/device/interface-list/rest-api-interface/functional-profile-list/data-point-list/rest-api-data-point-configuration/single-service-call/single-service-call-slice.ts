import { RestApiDataPointConfiguration, RestApiServiceCall } from "@/models/product/rest-api-types";
import {
  createRestApiServiceCallSlice,
  RestApiServiceCallSlice,
} from "@/sections/shared/rest-api-service-call/rest-api-service-call-slice";

export type SingleServiceCallSlice = RestApiServiceCallSlice;

/**
 * Type guard to check if configuration is a single service call type
 */
export function isSingleServiceCallConfig(
  config: RestApiDataPointConfiguration | undefined
): config is RestApiDataPointConfiguration & { restApiServiceCall: RestApiServiceCall } {
  return config !== undefined && "restApiServiceCall" in config;
}

/**
 * Creates a single service call slice for REST API data point configuration.
 * Uses the shared RestApiServiceCallSlice for the restApiServiceCall.
 *
 * @param set - The Zustand set function
 * @param getConfig - Function to get the RestApiDataPointConfiguration
 */
export function createSingleServiceCallSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getConfig: (state: TState) => RestApiDataPointConfiguration | undefined
): SingleServiceCallSlice {
  const getRestApiServiceCall = (state: TState): RestApiServiceCall | undefined => {
    const config = getConfig(state);
    return isSingleServiceCallConfig(config) ? config.restApiServiceCall : undefined;
  };

  const setRestApiServiceCall = (
    state: TState,
    restApiServiceCall: RestApiServiceCall | undefined
  ) => {
    const config = getConfig(state);
    if (isSingleServiceCallConfig(config) && restApiServiceCall) {
      config.restApiServiceCall = restApiServiceCall;
    }
  };

  // Create the shared service call slice
  const serviceCallSlice = createRestApiServiceCallSlice(
    set,
    getRestApiServiceCall,
    setRestApiServiceCall
  );

  return {
    ...serviceCallSlice,
  };
}
