"use client";

import { FormSection } from "@/components/forms/form-section";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { InterfaceList } from "@/models";
import { MessagingInterface } from "@/models/product/messaging-interface";

/**
 * Type guard to check if interface list is Messaging interface
 */
function isMessagingInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { messagingInterface: MessagingInterface } {
  return interfaceList !== undefined && "messagingInterface" in interfaceList;
}

export function MessageBrokerAuthenticationClientCertificateForm() {
  const {
    useDeviceState,
    useValidation,
    messageBrokerAuthenticationClientCertificateActions,
    pathPrefix,
  } = useDeviceFormContext();

  const clientCertAuth = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    if (isMessagingInterface(interfaceList)) {
      const auth =
        interfaceList.messagingInterface.messagingInterfaceDescription?.messageBrokerAuthentication;
      return auth && "clientCertificateAuthentication" in auth
        ? auth.clientCertificateAuthentication
        : undefined;
    }
    return undefined;
  });

  const { getError } = useValidation();

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(
      pathPrefix,
      `interfaceList.messagingInterface.messagingInterfaceDescription.messageBrokerAuthentication.clientCertificateAuthentication.${field}`
    );

  const handleAdd = () => {
    messageBrokerAuthenticationClientCertificateActions.addMessageBrokerAuthenticationClientCertificate();
  };

  const handleRemove = () => {
    messageBrokerAuthenticationClientCertificateActions.removeMessageBrokerAuthenticationClientCertificate();
  };

  return (
    <FormSection
      title="Client Certificate Authentication"
      description="Configure keystore and truststore paths and passwords for client certificate authentication"
      required={false}
      isAdded={!!clientCertAuth}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      {clientCertAuth && (
        <div className="space-y-4">
          <FormGroup>
            <InputField
              label="Keystore Path"
              name="keystorePath"
              required={true}
              type="text"
              value={clientCertAuth.keystorePath}
              onChange={(value) =>
                messageBrokerAuthenticationClientCertificateActions.updateClientCertificateKeystorePath(
                  value
                )
              }
              error={getError(fieldPath("keystorePath"))}
            />
            <InputField
              label="Keystore Password"
              name="keystorePassword"
              required={true}
              type="text"
              value={clientCertAuth.keystorePassword}
              onChange={(value) =>
                messageBrokerAuthenticationClientCertificateActions.updateClientCertificateKeystorePassword(
                  value
                )
              }
              error={getError(fieldPath("keystorePassword"))}
            />
          </FormGroup>
          <FormGroup>
            <InputField
              label="Truststore Path"
              name="truststorePath"
              required={true}
              type="text"
              value={clientCertAuth.truststorePath}
              onChange={(value) =>
                messageBrokerAuthenticationClientCertificateActions.updateClientCertificateTruststorePath(
                  value
                )
              }
              error={getError(fieldPath("truststorePath"))}
            />
            <InputField
              label="Truststore Password"
              name="truststorePassword"
              required={true}
              type="text"
              value={clientCertAuth.truststorePassword}
              onChange={(value) =>
                messageBrokerAuthenticationClientCertificateActions.updateClientCertificateTruststorePassword(
                  value
                )
              }
              error={getError(fieldPath("truststorePassword"))}
            />
          </FormGroup>
        </div>
      )}
    </FormSection>
  );
}
