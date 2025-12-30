import { MessageFilter } from "@/models/generic";

export interface MessageFilterSlice {
  addMessageFilter: (filterType: MessageFilterType) => void;
  changeMessageFilterType: (filterType: MessageFilterType) => void;
  removeMessageFilter: () => void;
  updatePlaintextFilterMatchesRegex: (matchesRegex: string) => void;
  updateJmespathFilterQuery: (query: string) => void;
  updateJmespathFilterMatchesRegex: (matchesRegex: string) => void;
  updateXpathFilterQuery: (query: string) => void;
  updateXpathFilterMatchesRegex: (matchesRegex: string) => void;
  updateRegexFilterQuery: (query: string) => void;
  updateRegexFilterMatchesRegex: (matchesRegex: string) => void;
  updateJSONataFilterQuery: (query: string) => void;
  updateJSONataFilterMatchesRegex: (matchesRegex: string) => void;
}

export const MESSAGE_FILTER_TYPE_VALUES = [
  "plaintextFilter",
  "jmespathFilter",
  "xpathFilter",
  "regexFilter",
  "jsonataFilter",
] as const;
export type MessageFilterType = (typeof MESSAGE_FILTER_TYPE_VALUES)[number];

/**
 * Creates a MessageFilter slice that works with any store state
 * @param set - The Zustand set function
 * @param getMessageFilter - Function to get the MessageFilter from state
 * @param setMessageFilter - Function to set the MessageFilter in state
 */
export function createMessageFilterSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getMessageFilter: (state: TState) => MessageFilter | undefined,
  setMessageFilter: (state: TState, filter: MessageFilter | undefined) => void
): MessageFilterSlice {
  return {
    addMessageFilter: (filterType) =>
      set((state) => {
        const current = getMessageFilter(state);
        if (!current) {
          if (filterType === "plaintextFilter") {
            setMessageFilter(state, { plaintextFilter: { matchesRegex: "" } });
          } else if (filterType === "jmespathFilter") {
            setMessageFilter(state, { jmespathFilter: { query: "", matchesRegex: "" } });
          } else if (filterType === "xpathFilter") {
            setMessageFilter(state, { xpathFilter: { query: "", matchesRegex: "" } });
          } else if (filterType === "regexFilter") {
            setMessageFilter(state, { regexFilter: { query: "", matchesRegex: "" } });
          } else if (filterType === "jsonataFilter") {
            setMessageFilter(state, { jsonataFilter: { query: "", matchesRegex: "" } });
          }
        }
      }),

    removeMessageFilter: () =>
      set((state) => {
        setMessageFilter(state, undefined);
      }),

    changeMessageFilterType: (filterType) =>
      set((state) => {
        // Replace existing filter with new type (resets all values)
        if (filterType === "plaintextFilter") {
          setMessageFilter(state, { plaintextFilter: { matchesRegex: "" } });
        } else if (filterType === "jmespathFilter") {
          setMessageFilter(state, { jmespathFilter: { query: "", matchesRegex: "" } });
        } else if (filterType === "xpathFilter") {
          setMessageFilter(state, { xpathFilter: { query: "", matchesRegex: "" } });
        } else if (filterType === "regexFilter") {
          setMessageFilter(state, { regexFilter: { query: "", matchesRegex: "" } });
        } else if (filterType === "jsonataFilter") {
          setMessageFilter(state, { jsonataFilter: { query: "", matchesRegex: "" } });
        }
      }),

    updatePlaintextFilterMatchesRegex: (matchesRegex) =>
      set((state) => {
        const current = getMessageFilter(state);
        if (current && "plaintextFilter" in current) {
          setMessageFilter(state, {
            plaintextFilter: { ...current.plaintextFilter, matchesRegex },
          });
        }
      }),

    updateJmespathFilterQuery: (query) =>
      set((state) => {
        const current = getMessageFilter(state);
        if (current && "jmespathFilter" in current) {
          setMessageFilter(state, {
            jmespathFilter: { ...current.jmespathFilter, query },
          });
        }
      }),

    updateJmespathFilterMatchesRegex: (matchesRegex) =>
      set((state) => {
        const current = getMessageFilter(state);
        if (current && "jmespathFilter" in current) {
          setMessageFilter(state, {
            jmespathFilter: { ...current.jmespathFilter, matchesRegex },
          });
        }
      }),

    updateXpathFilterQuery: (query) =>
      set((state) => {
        const current = getMessageFilter(state);
        if (current && "xpathFilter" in current) {
          setMessageFilter(state, {
            xpathFilter: { ...current.xpathFilter, query },
          });
        }
      }),

    updateXpathFilterMatchesRegex: (matchesRegex) =>
      set((state) => {
        const current = getMessageFilter(state);
        if (current && "xpathFilter" in current) {
          setMessageFilter(state, {
            xpathFilter: { ...current.xpathFilter, matchesRegex },
          });
        }
      }),

    updateRegexFilterQuery: (query) =>
      set((state) => {
        const current = getMessageFilter(state);
        if (current && "regexFilter" in current) {
          setMessageFilter(state, {
            regexFilter: { ...current.regexFilter, query },
          });
        }
      }),

    updateRegexFilterMatchesRegex: (matchesRegex) =>
      set((state) => {
        const current = getMessageFilter(state);
        if (current && "regexFilter" in current) {
          setMessageFilter(state, {
            regexFilter: { ...current.regexFilter, matchesRegex },
          });
        }
      }),

    updateJSONataFilterQuery: (query) =>
      set((state) => {
        const current = getMessageFilter(state);
        if (current && "jsonataFilter" in current) {
          setMessageFilter(state, {
            jsonataFilter: { ...current.jsonataFilter, query },
          });
        }
      }),

    updateJSONataFilterMatchesRegex: (matchesRegex) =>
      set((state) => {
        const current = getMessageFilter(state);
        if (current && "jsonataFilter" in current) {
          setMessageFilter(state, {
            jsonataFilter: { ...current.jsonataFilter, matchesRegex },
          });
        }
      }),
  };
}
