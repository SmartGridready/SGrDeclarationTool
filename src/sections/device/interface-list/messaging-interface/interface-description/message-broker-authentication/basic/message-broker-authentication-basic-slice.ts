import { DeviceFrame } from "@/models";
import { createEmptyMessageBrokerAuthentication } from "@/utils/factory-utils";

export interface MessageBrokerAuthenticationBasicSlice {
  addMessageBrokerAuthenticationBasic: () => void;
  removeMessageBrokerAuthenticationBasic: () => void;
  updateBasicUsername: (username: string) => void;
  updateBasicPassword: (password: string) => void;
}

/**
 * Creates a Message Broker Authentication Basic slice for Device stores.
 */
export function createMessageBrokerAuthenticationBasicSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): MessageBrokerAuthenticationBasicSlice {
  const getMessagingInterfaceDescription = (state: TState) => {
    const interfaceList = state.device?.interfaceList;
    if (!interfaceList) return undefined;
    // Direct field access with 'in' operator instead of type guard
    return "messagingInterface" in interfaceList
      ? interfaceList.messagingInterface?.messagingInterfaceDescription
      : undefined;
  };

  return {
    addMessageBrokerAuthenticationBasic: () =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        if (description && !description.messageBrokerAuthentication) {
          description.messageBrokerAuthentication = createEmptyMessageBrokerAuthentication("basicAuthentication");
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
