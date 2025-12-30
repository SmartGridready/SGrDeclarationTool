import { DeviceFrame, InterfaceList } from "@/models";
import { MessagingInterface } from "@/models/product/messaging-interface";
import { createEmptyMessageBrokerAuthentication } from "@/utils/factory-utils";

export interface MessageBrokerAuthenticationBasicSlice {
  addMessageBrokerAuthenticationBasic: () => void;
  removeMessageBrokerAuthenticationBasic: () => void;
  updateBasicUsername: (username: string) => void;
  updateBasicPassword: (password: string) => void;
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
 * Creates a Message Broker Authentication Basic slice for Device stores.
 */
export function createMessageBrokerAuthenticationBasicSlice<
  TState extends { device?: DeviceFrame },
>(set: (fn: (state: TState) => void) => void): MessageBrokerAuthenticationBasicSlice {
  const getMessagingInterfaceDescription = (state: TState) => {
    const interfaceList = state.device?.interfaceList;
    return isMessagingInterface(interfaceList)
      ? interfaceList.messagingInterface.messagingInterfaceDescription
      : undefined;
  };

  return {
    addMessageBrokerAuthenticationBasic: () =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        if (description && !description.messageBrokerAuthentication) {
          description.messageBrokerAuthentication =
            createEmptyMessageBrokerAuthentication("basicAuthentication");
        }
      }),

    removeMessageBrokerAuthenticationBasic: () =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        if (description) {
          description.messageBrokerAuthentication = undefined;
        }
      }),

    updateBasicUsername: (username) =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        const auth = description?.messageBrokerAuthentication;
        if (auth && "basicAuthentication" in auth) {
          auth.basicAuthentication.username = username;
        }
      }),

    updateBasicPassword: (password) =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        const auth = description?.messageBrokerAuthentication;
        if (auth && "basicAuthentication" in auth) {
          auth.basicAuthentication.password = password;
        }
      }),
  };
}
