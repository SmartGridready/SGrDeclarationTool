import { DeviceFrame, InterfaceList } from "@/models";
import { MessagingInterface } from "@/models/product/messaging-interface";
import { createEmptyMessageBrokerAuthentication } from "@/utils/factory-utils";

export interface MessageBrokerAuthenticationClientCertificateSlice {
  addMessageBrokerAuthenticationClientCertificate: () => void;
  removeMessageBrokerAuthenticationClientCertificate: () => void;
  updateClientCertificateKeystorePath: (keystorePath: string) => void;
  updateClientCertificateKeystorePassword: (keystorePassword: string) => void;
  updateClientCertificateTruststorePath: (truststorePath: string) => void;
  updateClientCertificateTruststorePassword: (truststorePassword: string) => void;
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
 * Creates a Message Broker Authentication Client Certificate slice for Device stores.
 */
export function createMessageBrokerAuthenticationClientCertificateSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): MessageBrokerAuthenticationClientCertificateSlice {
  const getMessagingInterfaceDescription = (state: TState) => {
    const interfaceList = state.device?.interfaceList;
    return isMessagingInterface(interfaceList)
      ? interfaceList.messagingInterface.messagingInterfaceDescription
      : undefined;
  };

  return {
    addMessageBrokerAuthenticationClientCertificate: () =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        if (description && !description.messageBrokerAuthentication) {
          description.messageBrokerAuthentication = createEmptyMessageBrokerAuthentication(
            "clientCertificateAuthentication"
          );
        }
      }),

    removeMessageBrokerAuthenticationClientCertificate: () =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        if (description) {
          description.messageBrokerAuthentication = undefined;
        }
      }),

    updateClientCertificateKeystorePath: (keystorePath) =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        const auth = description?.messageBrokerAuthentication;
        if (auth && "clientCertificateAuthentication" in auth) {
          auth.clientCertificateAuthentication.keystorePath = keystorePath;
        }
      }),

    updateClientCertificateKeystorePassword: (keystorePassword) =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        const auth = description?.messageBrokerAuthentication;
        if (auth && "clientCertificateAuthentication" in auth) {
          auth.clientCertificateAuthentication.keystorePassword = keystorePassword;
        }
      }),

    updateClientCertificateTruststorePath: (truststorePath) =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        const auth = description?.messageBrokerAuthentication;
        if (auth && "clientCertificateAuthentication" in auth) {
          auth.clientCertificateAuthentication.truststorePath = truststorePath;
        }
      }),

    updateClientCertificateTruststorePassword: (truststorePassword) =>
      set((state) => {
        const description = getMessagingInterfaceDescription(state);
        const auth = description?.messageBrokerAuthentication;
        if (auth && "clientCertificateAuthentication" in auth) {
          auth.clientCertificateAuthentication.truststorePassword = truststorePassword;
        }
      }),
  };
}
