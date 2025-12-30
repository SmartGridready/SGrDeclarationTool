import { OutMessage } from "@/models/product/messaging-types";
import {
  createResponseQuerySlice,
  ResponseQuerySlice,
} from "@/sections/shared/response-query/response-query-slice";
import {
  createMessagingValueMappingSlice,
  MessagingValueMappingSlice,
} from "@/sections/shared/messaging-value-mapping/messaging-value-mapping-slice";

export interface OutMessageSlice extends ResponseQuerySlice, MessagingValueMappingSlice {
  updateTopic: (topic: string) => void;
  updateTemplate: (template: string) => void;
}

/**
 * Creates an OutMessage slice that works with any store state
 * @param set - The Zustand set function
 * @param getOutMessage - Function to get the OutMessage from state
 * @param setOutMessage - Function to set the OutMessage in state
 */
export function createOutMessageSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getOutMessage: (state: TState) => OutMessage | undefined,
  setOutMessage: (state: TState, outMessage: OutMessage | undefined) => void
): OutMessageSlice {
  const responseQuerySlice = createResponseQuerySlice(
    set,
    (state) => getOutMessage(state)?.templateQuery,
    (state, query) => {
      const current = getOutMessage(state);
      if (current) {
        setOutMessage(state, { ...current, templateQuery: query });
      }
    }
  );

  const valueMappingSlice = createMessagingValueMappingSlice(
    set,
    (state) => getOutMessage(state)?.valueMapping,
    (state, mapping) => {
      const current = getOutMessage(state);
      if (current) {
        setOutMessage(state, { ...current, valueMapping: mapping });
      }
    }
  );

  return {
    ...responseQuerySlice,
    ...valueMappingSlice,

    updateTopic: (topic) =>
      set((state) => {
        const current = getOutMessage(state);
        if (current) {
          setOutMessage(state, { ...current, topic });
        }
      }),

    updateTemplate: (template) =>
      set((state) => {
        const current = getOutMessage(state);
        if (current) {
          setOutMessage(state, { ...current, template });
        }
      }),
  };
}
