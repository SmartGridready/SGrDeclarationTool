import { ResponseQuery, ResponseQueryType } from "@/models/generic";
import { createJmesPathMappingSlice, JmesPathMappingSlice } from "./jmespath/jmespath-mapping-slice";

export interface ResponseQuerySlice extends JmesPathMappingSlice {
  addResponseQuery: () => void;
  removeResponseQuery: () => void;
  updateResponseQueryType: (queryType: ResponseQueryType) => void;
  updateResponseQueryQuery: (query: string | undefined) => void;
}

/**
 * Creates a generic response query slice that works with any store state
 * @param set - The Zustand set function
 * @param getResponseQuery - Function to get the ResponseQuery from state
 * @param setResponseQuery - Function to set the ResponseQuery in state
 */
export function createResponseQuerySlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getResponseQuery: (state: TState) => ResponseQuery | undefined,
  setResponseQuery: (state: TState, responseQuery: ResponseQuery | undefined) => void
): ResponseQuerySlice {
  const jmesPathMappingSlice = createJmesPathMappingSlice(set, getResponseQuery, setResponseQuery);

  return {
    ...jmesPathMappingSlice,

    addResponseQuery: () =>
      set((state) => {
        if (!getResponseQuery(state)) {
          setResponseQuery(state, { queryType: "JMESPathExpression" });
        }
      }),

    removeResponseQuery: () =>
      set((state) => {
        setResponseQuery(state, undefined);
      }),

    updateResponseQueryType: (queryType) =>
      set((state) => {
        const current = getResponseQuery(state);
        if (!current) {
          setResponseQuery(state, { queryType });
        } else {
          // When changing query type, we need to reset the query-specific fields
          const newResponseQuery: ResponseQuery = { queryType };
          setResponseQuery(state, newResponseQuery);
        }
      }),

    updateResponseQueryQuery: (query) =>
      set((state) => {
        const current = getResponseQuery(state);
        if (current) {
          if (query) {
            setResponseQuery(state, { ...current, query });
          } else {
            // Remove query field if empty - create new object with only queryType
            const { queryType } = current;
            setResponseQuery(state, { queryType });
          }
        }
      }),
  };
}
