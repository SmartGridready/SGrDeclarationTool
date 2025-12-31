import { InMessage } from "@/models/product/messaging-types";
import { createResponseQuerySlice, ResponseQuerySlice } from "@/sections/shared/response-query/response-query-slice";
import {
  createMessagingValueMappingSlice,
  MessagingValueMappingSlice,
} from "@/sections/shared/messaging-value-mapping/messaging-value-mapping-slice";
import { createMessageFilterSlice, MessageFilterSlice } from "./message-filter/message-filter-slice";

export interface InMessageSlice extends ResponseQuerySlice, MessagingValueMappingSlice, MessageFilterSlice {
  updateTopic: (topic: string) => void;
}

/**
 * Creates an InMessage slice that works with any store state
 * @param set - The Zustand set function
 * @param getInMessage - Function to get the InMessage from state
 * @param setInMessage - Function to set the InMessage in state
 */
export function createInMessageSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getInMessage: (state: TState) => InMessage | undefined,
  setInMessage: (state: TState, inMessage: InMessage | undefined) => void
): InMessageSlice {
  const responseQuerySlice = createResponseQuerySlice(
    set,
    (state) => getInMessage(state)?.responseQuery,
    (state, query) => {
      const current = getInMessage(state);
      if (current) {
        setInMessage(state, { ...current, responseQuery: query });
      }
    }
  );

  const valueMappingSlice = createMessagingValueMappingSlice(
    set,
    (state) => getInMessage(state)?.valueMapping,
    (state, mapping) => {
      const current = getInMessage(state);
      if (current) {
        setInMessage(state, { ...current, valueMapping: mapping });
      }
    }
  );

  const messageFilterSlice = createMessageFilterSlice(
    set,
    (state) => getInMessage(state)?.filter,
    (state, filter) => {
      const current = getInMessage(state);
      if (current) {
        setInMessage(state, { ...current, filter });
      }
    }
  );

  return {
    ...responseQuerySlice,
    ...valueMappingSlice,
    ...messageFilterSlice,

    updateTopic: (topic) =>
      set((state) => {
        const current = getInMessage(state);
        if (current) {
          setInMessage(state, { ...current, topic });
        }
      }),
  };
}
