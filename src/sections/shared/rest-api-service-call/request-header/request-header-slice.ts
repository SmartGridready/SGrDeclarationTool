import { RestApiServiceCall, HeaderList } from "@/models/product/rest-api-types";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface RequestHeaderSlice {
  addRequestHeader: () => void;
  removeRequestHeader: () => void;
  addRequestHeaderEntry: () => void;
  removeRequestHeaderEntry: (index: number) => void;
  updateRequestHeaderEntryName: (index: number, headerName: string) => void;
  updateRequestHeaderEntryValue: (index: number, value: string) => void;
}

/**
 * Creates a request header slice that works with any store state
 */
export function createRequestHeaderSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getRestApiServiceCall: (state: TState) => RestApiServiceCall | undefined
): RequestHeaderSlice {
  return {
    addRequestHeader: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall && !serviceCall.requestHeader) {
          serviceCall.requestHeader = {};
        }
      }),

    removeRequestHeader: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          serviceCall.requestHeader = undefined;
        }
      }),

    addRequestHeaderEntry: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          if (!serviceCall.requestHeader) {
            serviceCall.requestHeader = {};
          }
          serviceCall.requestHeader.header = ensureArray(
            serviceCall.requestHeader.header,
            () => []
          );
          serviceCall.requestHeader.header.push({ headerName: "", value: "" });
        }
      }),

    removeRequestHeaderEntry: (index) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall?.requestHeader?.header) {
          removeArrayItem(serviceCall.requestHeader.header, index, () => {
            if (serviceCall.requestHeader?.header?.length === 0) {
              serviceCall.requestHeader = undefined;
            }
          });
        }
      }),

    updateRequestHeaderEntryName: (index, headerName) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        const entry = serviceCall?.requestHeader?.header?.[index];
        if (entry) {
          entry.headerName = headerName;
        }
      }),

    updateRequestHeaderEntryValue: (index, value) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        const entry = serviceCall?.requestHeader?.header?.[index];
        if (entry) {
          entry.value = value;
        }
      }),
  };
}
