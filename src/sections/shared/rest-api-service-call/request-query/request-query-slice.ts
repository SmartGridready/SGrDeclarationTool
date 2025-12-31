import { RestApiServiceCall } from "@/models/product/rest-api-types";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface RequestQuerySlice {
  addRequestQuery: () => void;
  removeRequestQuery: () => void;
  addRequestQueryParameter: () => void;
  removeRequestQueryParameter: (index: number) => void;
  updateRequestQueryParameterName: (index: number, name: string) => void;
  updateRequestQueryParameterValue: (index: number, value: string) => void;
}

/**
 * Creates a request query slice that works with any store state
 */
export function createRequestQuerySlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getRestApiServiceCall: (state: TState) => RestApiServiceCall | undefined
): RequestQuerySlice {
  return {
    addRequestQuery: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall && !serviceCall.requestQuery) {
          serviceCall.requestQuery = { parameter: [] };
        }
      }),

    removeRequestQuery: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          serviceCall.requestQuery = undefined;
        }
      }),

    addRequestQueryParameter: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          if (!serviceCall.requestQuery) {
            serviceCall.requestQuery = { parameter: [] };
          }
          serviceCall.requestQuery.parameter = ensureArray(serviceCall.requestQuery.parameter, () => []);
          serviceCall.requestQuery.parameter.push({ name: "", value: "" });
        }
      }),

    removeRequestQueryParameter: (index) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall?.requestQuery?.parameter) {
          removeArrayItem(serviceCall.requestQuery.parameter, index, () => {
            if (serviceCall.requestQuery?.parameter?.length === 0) {
              serviceCall.requestQuery = undefined;
            }
          });
        }
      }),

    updateRequestQueryParameterName: (index, name) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        const param = serviceCall?.requestQuery?.parameter?.[index];
        if (param) {
          param.name = name;
        }
      }),

    updateRequestQueryParameterValue: (index, value) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        const param = serviceCall?.requestQuery?.parameter?.[index];
        if (param) {
          param.value = value;
        }
      }),
  };
}
