import { DeviceFrame, InterfaceList } from "@/models";
import { MessagingInterface } from "@/models/product/messaging-interface";
import { MessagingPlatformType, MessageBrokerAuthenticationType } from "@/models/product/messaging-types";
import { createEmptyMessageBrokerAuthentication } from "@/utils/factory-utils";
import {
  createMessageBrokerAuthenticationSlice,
  MessageBrokerAuthenticationSlice,
} from "./message-broker-authentication/message-broker-authentication-slice";
import { createMessageBrokerListSlice, MessageBrokerListSlice } from "./message-broker-list/message-broker-list-slice";

export interface MessagingInterfaceDescriptionSlice extends MessageBrokerAuthenticationSlice, MessageBrokerListSlice {
  updatePlatform: (platform: MessagingPlatformType) => void;
  updateClientId: (clientId: string | undefined) => void;
  updateMessageBrokerAuthenticationType: (authType: MessageBrokerAuthenticationType | undefined) => void;
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
 * Creates a Messaging interface description slice for Device stores.
 */
export function createMessagingInterfaceDescriptionSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): MessagingInterfaceDescriptionSlice {
  const getMessagingInterfaceDescription = (state: TState) => {
    const interfaceList = state.device?.interfaceList;
    return isMessagingInterface(interfaceList)
      ? interfaceList.messagingInterface.messagingInterfaceDescription
      : undefined;
  };

  // Create nested slices
  const messageBrokerAuthenticationSlice = createMessageBrokerAuthenticationSlice(set);
  const messageBrokerListSlice = createMessageBrokerListSlice(set);

  return {
    // Spread nested slice actions
    ...messageBrokerAuthenticationSlice,
    ...messageBrokerListSlice,

    updatePlatform: (platform) =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        if (description) {
          description.platform = platform;
        }
      }),

    updateClientId: (clientId) =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        if (description) {
          description.clientId = clientId || undefined;
        }
      }),

    updateMessageBrokerAuthenticationType: (authType) =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        if (description) {
          if (!authType) {
            description.messageBrokerAuthentication = undefined;
          } else {
            description.messageBrokerAuthentication = createEmptyMessageBrokerAuthentication(authType);
          }
        }
      }),
  };
}
