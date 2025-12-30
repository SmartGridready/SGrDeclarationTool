import { RestApiServiceCall } from "@/models/product/rest-api-types";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface JmesPathMappingSlice {
  addResponseQueryJmesPathMapping: () => void;
  removeResponseQueryJmesPathMapping: () => void;
  addResponseQueryJmesPathMappingRecord: () => void;
  removeResponseQueryJmesPathMappingRecord: (index: number) => void;
  updateResponseQueryJmesPathMappingRecordFrom: (index: number, from: string) => void;
  updateResponseQueryJmesPathMappingRecordTo: (index: number, to: string) => void;
  updateResponseQueryJmesPathMappingRecordName: (index: number, name: string | undefined) => void;
}

/**
 * Creates a JMESPath mapping slice that works with any store state
 */
export function createJmesPathMappingSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getRestApiServiceCall: (state: TState) => RestApiServiceCall | undefined
): JmesPathMappingSlice {
  return {
    addResponseQueryJmesPathMapping: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          if (!serviceCall.responseQuery) {
            serviceCall.responseQuery = { queryType: "JMESPathMapping" };
          }
          if (serviceCall.responseQuery.queryType === "JMESPathMapping") {
            if (!("jmesPathMappings" in serviceCall.responseQuery)) {
              serviceCall.responseQuery = {
                queryType: "JMESPathMapping",
                jmesPathMappings: { mapping: [] },
              };
            }
          }
        }
      }),

    removeResponseQueryJmesPathMapping: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall?.responseQuery && "jmesPathMappings" in serviceCall.responseQuery) {
          serviceCall.responseQuery = undefined;
        }
      }),

    addResponseQueryJmesPathMappingRecord: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall?.responseQuery && "jmesPathMappings" in serviceCall.responseQuery) {
          const jmesPathMappings = serviceCall.responseQuery.jmesPathMappings;
          jmesPathMappings.mapping = ensureArray(jmesPathMappings.mapping, () => []);
          jmesPathMappings.mapping.push({ from: "", to: "" });
        }
      }),

    removeResponseQueryJmesPathMappingRecord: (index) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall?.responseQuery && "jmesPathMappings" in serviceCall.responseQuery) {
          const jmesPathMappings = serviceCall.responseQuery.jmesPathMappings;
          removeArrayItem(jmesPathMappings.mapping, index, () => {
            if (jmesPathMappings.mapping.length === 0) {
              serviceCall.responseQuery = undefined;
            }
          });
        }
      }),

    updateResponseQueryJmesPathMappingRecordFrom: (index, from) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall?.responseQuery && "jmesPathMappings" in serviceCall.responseQuery) {
          const record = serviceCall.responseQuery.jmesPathMappings.mapping[index];
          if (record) {
            record.from = from;
          }
        }
      }),

    updateResponseQueryJmesPathMappingRecordTo: (index, to) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall?.responseQuery && "jmesPathMappings" in serviceCall.responseQuery) {
          const record = serviceCall.responseQuery.jmesPathMappings.mapping[index];
          if (record) {
            record.to = to;
          }
        }
      }),

    updateResponseQueryJmesPathMappingRecordName: (index, name) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall?.responseQuery && "jmesPathMappings" in serviceCall.responseQuery) {
          const record = serviceCall.responseQuery.jmesPathMappings.mapping[index];
          if (record) {
            record.name = name || undefined;
          }
        }
      }),
  };
}
