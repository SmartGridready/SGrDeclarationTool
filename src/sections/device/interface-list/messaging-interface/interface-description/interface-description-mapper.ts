import {
  MessagingInterfaceDescription,
  MessagingPlatformType,
  MessageBrokerList,
  MessageBrokerListElement,
  MessageBrokerAuthentication,
  MessageBrokerAuthenticationBasic,
  MessageBrokerAuthenticationClientCertificate,
} from "@/models/product/messaging-types";
import { BooleanParameter } from "@/models/generic";
import {
  getStringValue,
  getOptionalStringValue,
  getFirstElement,
  mapArray,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";

/**
 * Maps XML booleanParameter to BooleanParameter model
 * BooleanParameter is a string type that can be "true", "false", or a pattern like "{{variable}}"
 *
 * XML can be:
 * - <tls>{{broker_tls}}</tls> -> text content
 * - <tls><true/></tls> -> nested self-closing tag
 */
function mapBooleanParameter(parentXml: Xml2JsObject, fieldName: string): BooleanParameter | undefined {
  // First check if the field exists as a direct child with text content
  // e.g., <tls>{{broker_tls}}</tls> -> { tls: ["{{broker_tls}}"] }
  const textValue = getOptionalStringValue(parentXml, fieldName);
  if (textValue !== undefined) {
    return textValue;
  }

  // Check if it's a nested element with self-closing tags
  // e.g., <tls><true/></tls> -> { tls: [{ true: [""] }] }
  const elementXml = getFirstElement(parentXml, fieldName);
  if (elementXml) {
    if (elementXml["true"] !== undefined) return "true";
    if (elementXml["false"] !== undefined) return "false";
  }

  return undefined;
}

/**
 * Maps XML messageBrokerListElement to MessageBrokerListElement model
 */
function mapMessageBrokerListElement(xml: Xml2JsObject): MessageBrokerListElement {
  const element: MessageBrokerListElement = {
    host: getStringValue(xml, "host"),
    port: getStringValue(xml, "port"),
  };

  // Map optional boolean parameters
  const tlsValue = mapBooleanParameter(xml, "tls");
  if (tlsValue !== undefined) {
    element.tls = tlsValue;
  }

  const tlsVerifyValue = mapBooleanParameter(xml, "tlsVerifyCertificate");
  if (tlsVerifyValue !== undefined) {
    element.tlsVerifyCertificate = tlsVerifyValue;
  }

  return element;
}

/**
 * Maps XML messageBrokerList to MessageBrokerList model
 */
function mapMessageBrokerList(xml: Xml2JsObject | undefined): MessageBrokerList {
  if (!xml) {
    return { messageBrokerListElement: [] };
  }

  return {
    messageBrokerListElement: mapArray(xml, "messageBrokerListElement", mapMessageBrokerListElement),
  };
}

/**
 * Maps XML basicAuthentication to MessageBrokerAuthenticationBasic model
 */
function mapBasicAuthentication(xml: Xml2JsObject): MessageBrokerAuthenticationBasic {
  return {
    username: getStringValue(xml, "username"),
    password: getStringValue(xml, "password"),
  };
}

/**
 * Maps XML clientCertificateAuthentication to MessageBrokerAuthenticationClientCertificate model
 */
function mapClientCertificateAuthentication(xml: Xml2JsObject): MessageBrokerAuthenticationClientCertificate {
  return {
    keystorePath: getStringValue(xml, "keystorePath"),
    keystorePassword: getStringValue(xml, "keystorePassword"),
    truststorePath: getStringValue(xml, "truststorePath"),
    truststorePassword: getStringValue(xml, "truststorePassword"),
  };
}

/**
 * Maps XML messageBrokerAuthentication to MessageBrokerAuthentication model
 */
function mapMessageBrokerAuthentication(xml: Xml2JsObject | undefined): MessageBrokerAuthentication | undefined {
  if (!xml) {
    return undefined;
  }

  // Check for basicAuthentication
  const basicAuthXml = getFirstElement(xml, "basicAuthentication");
  if (basicAuthXml) {
    return {
      basicAuthentication: mapBasicAuthentication(basicAuthXml),
    };
  }

  // Check for clientCertificateAuthentication
  const clientCertAuthXml = getFirstElement(xml, "clientCertificateAuthentication");
  if (clientCertAuthXml) {
    return {
      clientCertificateAuthentication: mapClientCertificateAuthentication(clientCertAuthXml),
    };
  }

  return undefined;
}

/**
 * Maps XML messagingInterfaceDescription to MessagingInterfaceDescription model
 */
export function mapMessagingInterfaceDescription(xml: Xml2JsObject | undefined): MessagingInterfaceDescription {
  if (!xml) {
    throw new Error("messagingInterfaceDescription is required");
  }

  const description: MessagingInterfaceDescription = {
    platform: getStringValue(xml, "platform") as MessagingPlatformType,
    messageBrokerList: mapMessageBrokerList(getFirstElement(xml, "messageBrokerList")),
  };

  // Map optional clientId
  setOptionalField(description, "clientId", getOptionalStringValue(xml, "clientId"));

  // Map optional messageBrokerAuthentication
  const authXml = getFirstElement(xml, "messageBrokerAuthentication");
  if (authXml) {
    const auth = mapMessageBrokerAuthentication(authXml);
    if (auth) {
      description.messageBrokerAuthentication = auth;
    }
  }

  return description;
}
