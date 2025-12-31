import { ResponseQuery, ResponseQueryType } from "@/models/generic";
import { RestApiServiceCall } from "@/models/product/rest-api-types";
import { createJmesPathMappingSlice, JmesPathMappingSlice } from "./jmespath/jmespath-mapping-slice";

export interface ResponseQuerySlice extends JmesPathMappingSlice {
  addResponseQuery: () => void;
  removeResponseQuery: () => void;
  updateResponseQueryType: (queryType: ResponseQueryType) => void;
  updateResponseQueryQuery: (query: string | undefined) => void;
}

/**
 * Creates a response query slice that works with any store state
 */
export function createResponseQuerySlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getRestApiServiceCall: (state: TState) => RestApiServiceCall | undefined
): ResponseQuerySlice {
  const jmesPathMappingSlice = createJmesPathMappingSlice(set, getRestApiServiceCall);

  return {
    ...jmesPathMappingSlice,

    addResponseQuery: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall && !serviceCall.responseQuery) {
          serviceCall.responseQuery = { queryType: "JMESPathExpression" };
        }
      }),

    removeResponseQuery: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          serviceCall.responseQuery = undefined;
        }
      }),

    updateResponseQueryType: (queryType) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          if (!serviceCall.responseQuery) {
            serviceCall.responseQuery = { queryType };
          } else {
            // When changing query type, we need to reset the query-specific fields
            const newResponseQuery: ResponseQuery = { queryType };
            serviceCall.responseQuery = newResponseQuery;
          }
        }
      }),

    updateResponseQueryQuery: (query) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall?.responseQuery) {
          if (query) {
            serviceCall.responseQuery = { ...serviceCall.responseQuery, query };
          } else {
            // Remove query field if empty - create new object with only queryType
            const { queryType } = serviceCall.responseQuery;
            serviceCall.responseQuery = { queryType };
          }
        }
      }),
  };
}
