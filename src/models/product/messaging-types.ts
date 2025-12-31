/**
 * Messaging auxiliary types (Product)
 * Generated from MessagingTypes.xsd
 */

import { MessageFilter, ResponseQuery, BooleanParameter, ValueMapping, EmptyType } from "@/models/generic";

export const MESSAGING_PLATFORM_TYPE_VALUES = ["MQTT5", "Kafka"] as const;
export type MessagingPlatformType = (typeof MESSAGING_PLATFORM_TYPE_VALUES)[number];

export interface MessageBrokerAuthenticationBasic {
  username: string;
  password: string;
}

export interface MessageBrokerAuthenticationClientCertificate {
  keystorePath: string;
  keystorePassword: string;
  truststorePath: string;
  truststorePassword: string;
}

export type MessageBrokerAuthentication =
  | { basicAuthentication: MessageBrokerAuthenticationBasic }
  | {
      clientCertificateAuthentication: MessageBrokerAuthenticationClientCertificate;
    };

export const MESSAGE_BROKER_AUTHENTICATION_TYPE_VALUES = [
  "basicAuthentication",
  "clientCertificateAuthentication",
] as const;
export type MessageBrokerAuthenticationType = (typeof MESSAGE_BROKER_AUTHENTICATION_TYPE_VALUES)[number];

export interface MessageBrokerListElement {
  host: string;
  port: string;
  tls?: BooleanParameter;
  tlsVerifyCertificate?: BooleanParameter;
}

export interface MessageBrokerList {
  messageBrokerListElement: MessageBrokerListElement[]; // maxOccurs="unbounded"
}

export interface MessagingInterfaceDescription {
  platform: MessagingPlatformType;
  messageBrokerList: MessageBrokerList;
  clientId?: string;
  messageBrokerAuthentication?: MessageBrokerAuthentication;
}

export interface MessagingValueMapping {
  mapping: ValueMapping[]; // maxOccurs="unbounded"
}

export interface OutMessage {
  topic: string;
  template: string;
  templateQuery?: ResponseQuery;
  valueMapping?: MessagingValueMapping;
}

export interface InMessage {
  topic: string;
  filter?: MessageFilter;
  responseQuery?: ResponseQuery;
  valueMapping?: MessagingValueMapping;
}

export const MESSAGING_DATA_TYPE_VALUES = ["number", "string", "JSON_array", "JSON_object"] as const;
export type MessagingDataType =
  | { number: EmptyType }
  | { string: EmptyType }
  | { JSON_array: EmptyType }
  | { JSON_object: EmptyType };

export interface MessagingDataPointConfiguration {
  messagingDataType: MessagingDataType;
  readCmdMessage?: OutMessage;
  writeCmdMessage?: OutMessage;
  inMessage?: InMessage;
}
