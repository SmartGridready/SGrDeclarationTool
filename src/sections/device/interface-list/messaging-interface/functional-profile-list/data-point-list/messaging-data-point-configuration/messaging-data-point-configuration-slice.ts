import {
  MessagingDataPointConfiguration,
  MessagingDataType,
  OutMessage,
  InMessage,
} from "@/models/product/messaging-types";
import { createOutMessageSlice, OutMessageSlice } from "./out-message/out-message-slice";
import { createInMessageSlice, InMessageSlice } from "./in-message/in-message-slice";
import { createEmptyOutMessage, createEmptyInMessage } from "@/utils/factory-utils";

export interface MessagingDataPointConfigurationSlice {
  updateMessagingDataType: (dataType: MessagingDataType) => void;
  addReadCmdMessage: () => void;
  removeReadCmdMessage: () => void;
  addWriteCmdMessage: () => void;
  removeWriteCmdMessage: () => void;
  addInMessage: () => void;
  removeInMessage: () => void;
  getReadCmdMessageSlice: () => OutMessageSlice;
  getWriteCmdMessageSlice: () => OutMessageSlice;
  getInMessageSlice: () => InMessageSlice;
}

/**
 * Creates a MessagingDataPointConfiguration slice that works with any store state
 * @param set - The Zustand set function
 * @param getConfiguration - Function to get the MessagingDataPointConfiguration from state
 * @param setConfiguration - Function to set the MessagingDataPointConfiguration in state
 */
export function createMessagingDataPointConfigurationSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getConfiguration: (state: TState) => MessagingDataPointConfiguration | undefined,
  setConfiguration: (state: TState, configuration: MessagingDataPointConfiguration | undefined) => void
): MessagingDataPointConfigurationSlice {
  return {
    updateMessagingDataType: (dataType) =>
      set((state) => {
        const current = getConfiguration(state);
        if (current) {
          setConfiguration(state, { ...current, messagingDataType: dataType });
        }
      }),

    addReadCmdMessage: () =>
      set((state) => {
        const current = getConfiguration(state);
        if (current && !current.readCmdMessage) {
          setConfiguration(state, {
            ...current,
            readCmdMessage: createEmptyOutMessage(),
          });
        }
      }),

    removeReadCmdMessage: () =>
      set((state) => {
        const current = getConfiguration(state);
        if (current) {
          setConfiguration(state, { ...current, readCmdMessage: undefined });
        }
      }),

    addWriteCmdMessage: () =>
      set((state) => {
        const current = getConfiguration(state);
        if (current && !current.writeCmdMessage) {
          setConfiguration(state, {
            ...current,
            writeCmdMessage: createEmptyOutMessage(),
          });
        }
      }),

    removeWriteCmdMessage: () =>
      set((state) => {
        const current = getConfiguration(state);
        if (current) {
          setConfiguration(state, { ...current, writeCmdMessage: undefined });
        }
      }),

    addInMessage: () =>
      set((state) => {
        const current = getConfiguration(state);
        if (current && !current.inMessage) {
          setConfiguration(state, {
            ...current,
            inMessage: createEmptyInMessage(),
          });
        }
      }),

    removeInMessage: () =>
      set((state) => {
        const current = getConfiguration(state);
        if (current) {
          setConfiguration(state, { ...current, inMessage: undefined });
        }
      }),

    getReadCmdMessageSlice: (): OutMessageSlice => {
      return createOutMessageSlice<TState>(
        set,
        (state: TState) => getConfiguration(state)?.readCmdMessage,
        (state: TState, message: OutMessage | undefined) => {
          const current = getConfiguration(state);
          if (current) {
            setConfiguration(state, { ...current, readCmdMessage: message });
          }
        }
      );
    },

    getWriteCmdMessageSlice: (): OutMessageSlice => {
      return createOutMessageSlice<TState>(
        set,
        (state: TState) => getConfiguration(state)?.writeCmdMessage,
        (state: TState, message: OutMessage | undefined) => {
          const current = getConfiguration(state);
          if (current) {
            setConfiguration(state, { ...current, writeCmdMessage: message });
          }
        }
      );
    },

    getInMessageSlice: (): InMessageSlice => {
      return createInMessageSlice<TState>(
        set,
        (state: TState) => getConfiguration(state)?.inMessage,
        (state: TState, message: InMessage | undefined) => {
          const current = getConfiguration(state);
          if (current) {
            setConfiguration(state, { ...current, inMessage: message });
          }
        }
      );
    },
  };
}
