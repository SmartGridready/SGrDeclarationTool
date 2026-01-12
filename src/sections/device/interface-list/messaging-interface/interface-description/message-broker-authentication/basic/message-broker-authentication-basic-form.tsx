"use client";

import { FormSection } from "@/components/forms/form-section";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useShallow } from "zustand/react/shallow";
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
  const interfaceList = useDeviceStore(useShallow((state) => state.device?.interfaceList));
  const basicAuth = isMessagingInterface(interfaceList)
    ? (() => {
        const auth = interfaceList.messagingInterface.messagingInterfaceDescription?.messageBrokerAuthentication;
        return auth && "basicAuthentication" in auth ? auth.basicAuthentication : undefined;
      })()
    : undefined;
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  const fieldPath = (field: string) =>
    `interfaceList.messagingInterface.messagingInterfaceDescription.messageBrokerAuthentication.basicAuthentication.${field}`;

  const handleAdd = () => {
    store.addMessageBrokerAuthenticationBasic();
  };

  const handleRemove = () => {
    store.removeMessageBrokerAuthenticationBasic();
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
            onChange={(value) => store.updateBasicUsername(value)}
            error={getError(fieldPath("username"))}
          />
          <InputField
            label="Password"
            name="basicPassword"
            required={true}
            type="text"
            value={basicAuth.password}
            onChange={(value) => store.updateBasicPassword(value)}
            error={getError(fieldPath("password"))}
          />
        </FormGroup>
      )}
    </FormSection>
  );
}
