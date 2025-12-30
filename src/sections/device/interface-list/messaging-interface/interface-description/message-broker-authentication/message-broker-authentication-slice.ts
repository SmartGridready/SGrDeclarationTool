import { DeviceFrame } from "@/models";
import {
  createMessageBrokerAuthenticationBasicSlice,
  MessageBrokerAuthenticationBasicSlice,
} from "./basic/message-broker-authentication-basic-slice";
import {
  createMessageBrokerAuthenticationClientCertificateSlice,
  MessageBrokerAuthenticationClientCertificateSlice,
} from "./client-certificate/message-broker-authentication-client-certificate-slice";

export interface MessageBrokerAuthenticationSlice
  extends MessageBrokerAuthenticationBasicSlice,
    MessageBrokerAuthenticationClientCertificateSlice {}

/**
 * Creates a Message Broker Authentication slice for Device stores.
 */
export function createMessageBrokerAuthenticationSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): MessageBrokerAuthenticationSlice {
  const basicAuthSlice = createMessageBrokerAuthenticationBasicSlice(set);
  const clientCertAuthSlice = createMessageBrokerAuthenticationClientCertificateSlice(set);

  return {
    ...basicAuthSlice,
    ...clientCertAuthSlice,
  };
}
