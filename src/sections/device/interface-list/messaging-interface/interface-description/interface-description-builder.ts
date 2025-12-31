import {
  MessagingInterfaceDescription,
  MessageBrokerList,
  MessageBrokerListElement,
  MessageBrokerAuthentication,
  MessageBrokerAuthenticationBasic,
  MessageBrokerAuthenticationClientCertificate,
} from "@/models/product/messaging-types";
import { wrapInArray, setOptionalXmlField } from "@/utils/builder-utils";
import { validateMessagingInterfaceDescription } from "./interface-description-schema";

/**
 * Builds XML object for booleanParameter
 * BooleanParameter is a string type that can be "true", "false", or a pattern like "{{variable}}"
 *
 * For "true" or "false", we can use either:
 * - Text content: <tls>true</tls>
 * - Self-closing tag: <tls><true/></tls>
 *
 * For variable patterns like "{{broker_tls}}", we use text content: <tls>{{broker_tls}}</tls>
 *
 * We use text content format for all cases to match the XML sample format.
 */
function buildBooleanParameter(value: string | undefined): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  // Use text content format for all cases (matches XML sample: <tls>{{broker_tls}}</tls>)
  return wrapInArray(value);
}

/**
 * Builds XML object for messageBrokerListElement from MessageBrokerListElement model
 */
function buildMessageBrokerListElement(element: MessageBrokerListElement): Record<string, unknown> {
  const elementXml: Record<string, unknown> = {
    host: wrapInArray(element.host),
    port: wrapInArray(element.port),
  };

  if (element.tls !== undefined) {
    const tlsXml = buildBooleanParameter(element.tls);
    if (tlsXml) {
      // buildBooleanParameter already returns an array, so we use it directly
      elementXml.tls = tlsXml;
    }
  }

  if (element.tlsVerifyCertificate !== undefined) {
    const tlsVerifyXml = buildBooleanParameter(element.tlsVerifyCertificate);
    if (tlsVerifyXml) {
      // buildBooleanParameter already returns an array, so we use it directly
      elementXml.tlsVerifyCertificate = tlsVerifyXml;
    }
  }

  return elementXml;
}

/**
 * Builds XML object for messageBrokerList from MessageBrokerList model
 */
function buildMessageBrokerList(brokerList: MessageBrokerList): Record<string, unknown> {
  return {
    messageBrokerListElement: brokerList.messageBrokerListElement.map(buildMessageBrokerListElement),
  };
}

/**
 * Builds XML object for basicAuthentication from MessageBrokerAuthenticationBasic model
 */
function buildBasicAuthentication(auth: MessageBrokerAuthenticationBasic): Record<string, unknown> {
  return {
    username: wrapInArray(auth.username),
    password: wrapInArray(auth.password),
  };
}

/**
 * Builds XML object for clientCertificateAuthentication from MessageBrokerAuthenticationClientCertificate model
 */
function buildClientCertificateAuthentication(
  auth: MessageBrokerAuthenticationClientCertificate
): Record<string, unknown> {
  return {
    keystorePath: wrapInArray(auth.keystorePath),
    keystorePassword: wrapInArray(auth.keystorePassword),
    truststorePath: wrapInArray(auth.truststorePath),
    truststorePassword: wrapInArray(auth.truststorePassword),
  };
}

/**
 * Builds XML object for messageBrokerAuthentication from MessageBrokerAuthentication model
 */
function buildMessageBrokerAuthentication(
  auth: MessageBrokerAuthentication | undefined
): Record<string, unknown> | undefined {
  if (!auth) {
    return undefined;
  }

  if ("basicAuthentication" in auth) {
    return {
      basicAuthentication: wrapInArray(buildBasicAuthentication(auth.basicAuthentication)),
    };
  }

  if ("clientCertificateAuthentication" in auth) {
    return {
      clientCertificateAuthentication: wrapInArray(
        buildClientCertificateAuthentication(auth.clientCertificateAuthentication)
      ),
    };
  }

  return undefined;
}

/**
 * Builds XML object for messagingInterfaceDescription from MessagingInterfaceDescription model
 * @throws Error if required fields are missing
 */
export function buildMessagingInterfaceDescription(
  description: MessagingInterfaceDescription
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateMessagingInterfaceDescription(description);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for messaging interface description";
    throw new Error(errorMessage);
  }

  const descriptionXml: Record<string, unknown> = {
    platform: wrapInArray(description.platform),
    messageBrokerList: wrapInArray(buildMessageBrokerList(description.messageBrokerList)),
  };

  // Include optional clientId
  setOptionalXmlField(descriptionXml, "clientId", description.clientId);

  // Include optional messageBrokerAuthentication
  if (description.messageBrokerAuthentication) {
    const authXml = buildMessageBrokerAuthentication(description.messageBrokerAuthentication);
    if (authXml) {
      descriptionXml.messageBrokerAuthentication = wrapInArray(authXml);
    }
  }

  return descriptionXml;
}
