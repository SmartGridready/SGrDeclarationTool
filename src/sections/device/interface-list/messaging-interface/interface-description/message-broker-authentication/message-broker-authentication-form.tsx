"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";
import {
  MessageBrokerAuthenticationType,
  MESSAGE_BROKER_AUTHENTICATION_TYPE_VALUES,
  MessageBrokerAuthentication,
} from "@/models/product/messaging-types";
import { createFormOptions } from "@/utils/form-options-utils";
import { MessageBrokerAuthenticationBasicForm } from "./basic/message-broker-authentication-basic-form";
import { MessageBrokerAuthenticationClientCertificateForm } from "./client-certificate/message-broker-authentication-client-certificate-form";

const MESSAGE_BROKER_AUTHENTICATION_TYPE_OPTIONS = createFormOptions(MESSAGE_BROKER_AUTHENTICATION_TYPE_VALUES);

/**
 * Type guard to check if authentication is basic authentication
 */
function isBasicAuthentication(
  auth: MessageBrokerAuthentication | undefined
): auth is { basicAuthentication: { username: string; password: string } } {
  return auth !== undefined && "basicAuthentication" in auth;
}

/**
 * Type guard to check if authentication is client certificate authentication
 */
function isClientCertificateAuthentication(auth: MessageBrokerAuthentication | undefined): auth is {
  clientCertificateAuthentication: {
    keystorePath: string;
    keystorePassword: string;
    truststorePath: string;
    truststorePassword: string;
  };
} {
  return auth !== undefined && "clientCertificateAuthentication" in auth;
}

export function MessageBrokerAuthenticationForm() {
  // Granular selector
  const messagingInterfaceDescription = useDeviceField(
    (d) => d?.interfaceList?.messagingInterface?.messagingInterfaceDescription
  );
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  if (!messagingInterfaceDescription) {
    return null;
  }

  const messageBrokerAuthentication = messagingInterfaceDescription.messageBrokerAuthentication;

  const authType: MessageBrokerAuthenticationType | undefined = messageBrokerAuthentication
    ? isBasicAuthentication(messageBrokerAuthentication)
      ? "basicAuthentication"
      : isClientCertificateAuthentication(messageBrokerAuthentication)
        ? "clientCertificateAuthentication"
        : undefined
    : undefined;

  const showBasicAuth = authType === "basicAuthentication";
  const showClientCertAuth = authType === "clientCertificateAuthentication";

  const isAdded = !!messageBrokerAuthentication;

  const handleAdd = () => {
    // Default to basic authentication when adding
    store.updateMessageBrokerAuthenticationType("basicAuthentication");
  };

  const handleRemove = () => {
    store.updateMessageBrokerAuthenticationType(undefined);
  };

  const fieldPath = (field: string) =>
    `interfaceList.messagingInterface.messagingInterfaceDescription.messageBrokerAuthentication.${field}`;

  return (
    <FormSection
      title="Message Broker Authentication"
      description="Configure authentication for the message broker"
      required={false}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      <FormGroup>
        <SelectField
          label="Authentication Type"
          name="messageBrokerAuthenticationType"
          required={false}
          placeholder="None (no authentication)"
          options={MESSAGE_BROKER_AUTHENTICATION_TYPE_OPTIONS}
          value={authType ?? ""}
          onChange={(value) =>
            store.updateMessageBrokerAuthenticationType(value ? (value as MessageBrokerAuthenticationType) : undefined)
          }
          error={getError(fieldPath("type"))}
        />
      </FormGroup>

      {showBasicAuth && <MessageBrokerAuthenticationBasicForm />}
      {showClientCertAuth && <MessageBrokerAuthenticationClientCertificateForm />}
    </FormSection>
  );
}
