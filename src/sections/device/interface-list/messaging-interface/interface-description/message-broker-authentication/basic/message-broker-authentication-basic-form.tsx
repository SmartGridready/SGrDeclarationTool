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

export function MessageBrokerAuthenticationBasicForm() {
  const { useDeviceState, useValidation, messageBrokerAuthenticationBasicActions, pathPrefix } =
    useDeviceFormContext();

  const basicAuth = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    if (isMessagingInterface(interfaceList)) {
      const auth =
        interfaceList.messagingInterface.messagingInterfaceDescription?.messageBrokerAuthentication;
      return auth && "basicAuthentication" in auth ? auth.basicAuthentication : undefined;
    }
    return undefined;
  });

  const { getError } = useValidation();

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(
      pathPrefix,
      `interfaceList.messagingInterface.messagingInterfaceDescription.messageBrokerAuthentication.basicAuthentication.${field}`
    );

  const handleAdd = () => {
    messageBrokerAuthenticationBasicActions.addMessageBrokerAuthenticationBasic();
  };

  const handleRemove = () => {
    messageBrokerAuthenticationBasicActions.removeMessageBrokerAuthenticationBasic();
  };

  return (
    <FormSection
      title="Basic Authentication"
      description="Configure username and password for basic authentication"
      required={false}
      isAdded={!!basicAuth}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      {basicAuth && (
        <FormGroup>
          <InputField
            label="Username"
            name="basicUsername"
            required={true}
            type="text"
            value={basicAuth.username}
            onChange={(value) => messageBrokerAuthenticationBasicActions.updateBasicUsername(value)}
            error={getError(fieldPath("username"))}
          />
          <InputField
            label="Password"
            name="basicPassword"
            required={true}
            type="text"
            value={basicAuth.password}
            onChange={(value) => messageBrokerAuthenticationBasicActions.updateBasicPassword(value)}
            error={getError(fieldPath("password"))}
          />
        </FormGroup>
      )}
    </FormSection>
  );
}
