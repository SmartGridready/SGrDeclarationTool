import { RestApiServiceCall, HttpMethod } from "@/models/product/rest-api-types";

export interface RequestBasicSlice {
  updateRequestMethod: (requestMethod: HttpMethod) => void;
  updateRequestPath: (requestPath: string | undefined) => void;
  updateRequestBody: (requestBody: string | undefined) => void;
}

/**
 * Creates a request basic slice that works with any store state
 */
export function createRequestBasicSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getRestApiServiceCall: (state: TState) => RestApiServiceCall | undefined,
  setRestApiServiceCall: (state: TState, restApiServiceCall: RestApiServiceCall | undefined) => void
): RequestBasicSlice {
  return {
    updateRequestMethod: (requestMethod) =>
      set((state) => {
        let serviceCall = getRestApiServiceCall(state);
        if (!serviceCall) {
          serviceCall = { requestMethod };
          setRestApiServiceCall(state, serviceCall);
        } else {
          serviceCall.requestMethod = requestMethod;
        }
      }),

    updateRequestPath: (requestPath) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          serviceCall.requestPath = requestPath || undefined;
        }
      }),

    updateRequestBody: (requestBody) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          serviceCall.requestBody = requestBody || undefined;
        }
      }),
  };
}
