import { RestApiServiceCall } from "@/models/product/rest-api-types";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface RequestFormSlice {
  addRequestForm: () => void;
  removeRequestForm: () => void;
  addRequestFormParameter: () => void;
  removeRequestFormParameter: (index: number) => void;
  updateRequestFormParameterName: (index: number, name: string) => void;
  updateRequestFormParameterValue: (index: number, value: string) => void;
}

/**
 * Creates a request form slice that works with any store state
 */
export function createRequestFormSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getRestApiServiceCall: (state: TState) => RestApiServiceCall | undefined
): RequestFormSlice {
  return {
    addRequestForm: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall && !serviceCall.requestForm) {
          serviceCall.requestForm = { parameter: [] };
        }
      }),

    removeRequestForm: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          serviceCall.requestForm = undefined;
        }
      }),

    addRequestFormParameter: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          if (!serviceCall.requestForm) {
            serviceCall.requestForm = { parameter: [] };
          }
          serviceCall.requestForm.parameter = ensureArray(serviceCall.requestForm.parameter, () => []);
          serviceCall.requestForm.parameter.push({ name: "", value: "" });
        }
      }),

    removeRequestFormParameter: (index) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall?.requestForm?.parameter) {
          removeArrayItem(serviceCall.requestForm.parameter, index, () => {
            if (serviceCall.requestForm?.parameter?.length === 0) {
              serviceCall.requestForm = undefined;
            }
          });
        }
      }),

    updateRequestFormParameterName: (index, name) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        const param = serviceCall?.requestForm?.parameter?.[index];
        if (param) {
          param.name = name;
        }
      }),

    updateRequestFormParameterValue: (index, value) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        const param = serviceCall?.requestForm?.parameter?.[index];
        if (param) {
          param.value = value;
        }
      }),
  };
}
