import { DeviceFrame, InterfaceList } from "@/models";
import { MessagingInterface } from "@/models/product/messaging-interface";
import { MessageBrokerListElement, MessageBrokerList } from "@/models/product/messaging-types";
import { createEmptyMessageBrokerListElement } from "@/utils/factory-utils";

export interface MessageBrokerListSlice {
  addMessageBrokerListElement: () => void;
  removeMessageBrokerListElement: (index: number) => void;
  updateMessageBrokerListElementHost: (index: number, host: string) => void;
  updateMessageBrokerListElementPort: (index: number, port: string) => void;
  updateMessageBrokerListElementTls: (index: number, tls: string | undefined) => void;
  updateMessageBrokerListElementTlsVerifyCertificate: (
    index: number,
    tlsVerifyCertificate: string | undefined
  ) => void;
}

/**
 * Type guard to check if interface list is Messaging interface
 */
function isMessagingInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { messagingInterface: MessagingInterface } {
  return interfaceList !== undefined && "messagingInterface" in interfaceList;
}

/**
 * Creates a Message Broker List slice for Device stores.
 */
export function createMessageBrokerListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): MessageBrokerListSlice {
  const getMessagingInterfaceDescription = (state: TState) => {
    const interfaceList = state.device?.interfaceList;
    return isMessagingInterface(interfaceList)
      ? interfaceList.messagingInterface.messagingInterfaceDescription
      : undefined;
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
