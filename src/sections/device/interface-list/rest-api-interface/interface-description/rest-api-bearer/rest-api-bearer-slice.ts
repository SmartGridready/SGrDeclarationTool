import { DeviceFrame } from "@/models";
import { RestApiServiceCall } from "@/models/product/rest-api-types";
import {
  createRestApiServiceCallSlice,
  RestApiServiceCallSlice,
} from "@/sections/shared/rest-api-service-call/rest-api-service-call-slice";

export interface RestApiBearerSlice extends RestApiServiceCallSlice {
  addRestApiBearer: () => void;
  removeRestApiBearer: () => void;
}

/**
 * Creates a REST API bearer authentication slice for Device stores.
 * Uses the shared RestApiServiceCallSlice for the nested restApiServiceCall.
 */
export function createRestApiBearerSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): RestApiBearerSlice {
  const getRestApiInterfaceDescription = (state: TState) => {
    const interfaceList = state.device?.interfaceList;
    if (!interfaceList) return undefined;
    // Direct field access with 'in' operator instead of type guard
    return "restApiInterface" in interfaceList
      ? interfaceList.restApiInterface?.restApiInterfaceDescription
      : undefined;
  };

  const getRestApiServiceCall = (state: TState): RestApiServiceCall | undefined => {
    return getRestApiInterfaceDescription(state)?.restApiBearer?.restApiServiceCall;
  };

  const setRestApiServiceCall = (state: TState, restApiServiceCall: RestApiServiceCall | undefined) => {
    const description = getRestApiInterfaceDescription(state);
    if (description?.restApiBearer && restApiServiceCall) {
      description.restApiBearer.restApiServiceCall = restApiServiceCall;
    }
  };

  // Create the shared service call slice
  const serviceCallSlice = createRestApiServiceCallSlice(set, getRestApiServiceCall, setRestApiServiceCall);

  return {
    ...serviceCallSlice,

    addRestApiBearer: () =>
      set((state) => {
        const description = getRestApiInterfaceDescription(state);
        if (description && !description.restApiBearer) {
          description.restApiBearer = {
            restApiServiceCall: {
              requestMethod: "GET",
            },
          };
        }
      }),

    removeRestApiBearer: () =>
      set((state) => {
        const description = getRestApiInterfaceDescription(state);
        if (description) {
          description.restApiBearer = undefined;
        }
      }),
  };
}
