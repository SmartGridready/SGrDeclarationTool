import { ResponseQuery } from "@/models/generic";
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
 * Creates a generic JMESPath mapping slice that works with any store state
 * @param set - The Zustand set function
 * @param getResponseQuery - Function to get the ResponseQuery from state
 * @param setResponseQuery - Function to set the ResponseQuery in state
 */
export function createJmesPathMappingSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getResponseQuery: (state: TState) => ResponseQuery | undefined,
  setResponseQuery: (state: TState, responseQuery: ResponseQuery | undefined) => void
): JmesPathMappingSlice {
  return {
    addResponseQueryJmesPathMapping: () =>
      set((state) => {
        const current = getResponseQuery(state);
        if (!current) {
          setResponseQuery(state, { queryType: "JMESPathMapping" });
        }
        const updated = getResponseQuery(state);
        if (updated && updated.queryType === "JMESPathMapping") {
          if (!("jmesPathMappings" in updated)) {
            setResponseQuery(state, {
              queryType: "JMESPathMapping",
              jmesPathMappings: { mapping: [] },
            });
          }
        }
      }),

    removeResponseQueryJmesPathMapping: () =>
      set((state) => {
        const current = getResponseQuery(state);
        if (current && "jmesPathMappings" in current) {
          setResponseQuery(state, undefined);
        }
      }),

    addResponseQueryJmesPathMappingRecord: () =>
      set((state) => {
        const current = getResponseQuery(state);
        if (current && "jmesPathMappings" in current) {
          const jmesPathMappings = current.jmesPathMappings;
          jmesPathMappings.mapping = ensureArray(jmesPathMappings.mapping, () => []);
          jmesPathMappings.mapping.push({ from: "", to: "" });
        }
      }),

    removeResponseQueryJmesPathMappingRecord: (index) =>
      set((state) => {
        const current = getResponseQuery(state);
        if (current && "jmesPathMappings" in current) {
          const jmesPathMappings = current.jmesPathMappings;
          removeArrayItem(jmesPathMappings.mapping, index, () => {
            if (jmesPathMappings.mapping.length === 0) {
              setResponseQuery(state, undefined);
            }
          });
        }
      }),

    updateResponseQueryJmesPathMappingRecordFrom: (index, from) =>
      set((state) => {
        const current = getResponseQuery(state);
        if (current && "jmesPathMappings" in current) {
          const record = current.jmesPathMappings.mapping[index];
          if (record) {
            record.from = from;
          }
        }
      }),

    updateResponseQueryJmesPathMappingRecordTo: (index, to) =>
      set((state) => {
        const current = getResponseQuery(state);
        if (current && "jmesPathMappings" in current) {
          const record = current.jmesPathMappings.mapping[index];
          if (record) {
            record.to = to;
          }
        }
      }),

    updateResponseQueryJmesPathMappingRecordName: (index, name) =>
      set((state) => {
        const current = getResponseQuery(state);
        if (current && "jmesPathMappings" in current) {
          const record = current.jmesPathMappings.mapping[index];
          if (record) {
            record.name = name || undefined;
          }
        }
      }),
  };
}
