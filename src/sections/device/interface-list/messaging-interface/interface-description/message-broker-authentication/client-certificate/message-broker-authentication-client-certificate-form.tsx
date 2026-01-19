"use client";

import { FormSection } from "@/components/forms/form-section";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";

export function MessageBrokerAuthenticationClientCertificateForm() {
  // Granular selector
  const clientCertAuth = useDeviceField((d) => {
    const auth = d?.interfaceList?.messagingInterface?.messagingInterfaceDescription?.messageBrokerAuthentication;
    return auth && "clientCertificateAuthentication" in auth ? auth.clientCertificateAuthentication : undefined;
  });
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  const fieldPath = (field: string) =>
    `interfaceList.messagingInterface.messagingInterfaceDescription.messageBrokerAuthentication.clientCertificateAuthentication.${field}`;

  const handleAdd = () => {
    store.addMessageBrokerAuthenticationClientCertificate();
  };

  const handleRemove = () => {
    store.removeMessageBrokerAuthenticationClientCertificate();
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
              onChange={(value) => store.updateClientCertificateKeystorePath(value)}
              error={getError(fieldPath("keystorePath"))}
            />
            <InputField
              label="Keystore Password"
              name="keystorePassword"
              required={true}
              type="text"
              value={clientCertAuth.keystorePassword}
              onChange={(value) => store.updateClientCertificateKeystorePassword(value)}
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
              onChange={(value) => store.updateClientCertificateTruststorePath(value)}
              error={getError(fieldPath("truststorePath"))}
            />
            <InputField
              label="Truststore Password"
              name="truststorePassword"
              required={true}
              type="text"
              value={clientCertAuth.truststorePassword}
              onChange={(value) => store.updateClientCertificateTruststorePassword(value)}
              error={getError(fieldPath("truststorePassword"))}
            />
          </FormGroup>
        </div>
      )}
    </FormSection>
  );
}
