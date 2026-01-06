import { DeviceFrame, InterfaceList } from "@/models";
import { MessagingInterface } from "@/models/product/messaging-interface";
import { MessageBrokerList } from "@/models/product/messaging-types";
import { createEmptyMessageBrokerListElement } from "@/utils/factory-utils";

export interface MessageBrokerListSlice {
  addMessageBrokerListElement: () => void;
  removeMessageBrokerListElement: (index: number) => void;
  updateMessageBrokerListElementHost: (index: number, host: string) => void;
  updateMessageBrokerListElementPort: (index: number, port: string) => void;
  updateMessageBrokerListElementTls: (index: number, tls: string | undefined) => void;
  updateMessageBrokerListElementTlsVerifyCertificate: (index: number, tlsVerifyCertificate: string | undefined) => void;
}

/**
 * Creates a Message Broker List slice for Device stores.
 */
export function createMessageBrokerListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): MessageBrokerListSlice {
  const getMessagingInterfaceDescription = (state: TState) => {
    const interfaceList = state.device?.interfaceList;
    if (!interfaceList || !("messagingInterface" in interfaceList)) return undefined;
    // Direct field access with 'in' operator instead of type guard
    return interfaceList.messagingInterface?.messagingInterfaceDescription;
  };

  const getMessageBrokerList = (state: TState): MessageBrokerList | undefined => {
    return getMessagingInterfaceDescription(state)?.messageBrokerList;
  };

  return {
    addMessageBrokerListElement: () =>
      set((state) => {
        const list = getMessageBrokerList(state);
        if (list) {
          if (!list.messageBrokerListElement) {
            list.messageBrokerListElement = [];
          }
          list.messageBrokerListElement.push(createEmptyMessageBrokerListElement());
        }
      }),

    removeMessageBrokerListElement: (index) =>
      set((state) => {
        const list = getMessageBrokerList(state);
        if (list?.messageBrokerListElement) {
          list.messageBrokerListElement.splice(index, 1);
        }
      }),

    updateMessageBrokerListElementHost: (index, host) =>
      set((state) => {
        const list = getMessageBrokerList(state);
        const element = list?.messageBrokerListElement?.[index];
        if (element) {
          element.host = host;
        }
      }),

    updateMessageBrokerListElementPort: (index, port) =>
      set((state) => {
        const list = getMessageBrokerList(state);
        const element = list?.messageBrokerListElement?.[index];
        if (element) {
          element.port = port;
        }
      }),

    updateMessageBrokerListElementTls: (index, tls) =>
      set((state) => {
        const list = getMessageBrokerList(state);
        const element = list?.messageBrokerListElement?.[index];
        if (element) {
          if (tls !== undefined && tls !== "") {
            element.tls = tls;
          } else {
            delete element.tls;
          }
        }
      }),

    updateMessageBrokerListElementTlsVerifyCertificate: (index, tlsVerifyCertificate) =>
      set((state) => {
        const list = getMessageBrokerList(state);
        const element = list?.messageBrokerListElement?.[index];
        if (element) {
          if (tlsVerifyCertificate !== undefined && tlsVerifyCertificate !== "") {
            element.tlsVerifyCertificate = tlsVerifyCertificate;
          } else {
            delete element.tlsVerifyCertificate;
          }
        }
      }),
  };
}
