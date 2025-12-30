"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { InterfaceList } from "@/models";
import { MessagingInterface } from "@/models/product/messaging-interface";
import {
  MessagingPlatformType,
  MESSAGING_PLATFORM_TYPE_VALUES,
} from "@/models/product/messaging-types";
import { createFormOptions } from "@/models/form-options-helper";
import { MessageBrokerListForm } from "./message-broker-list/message-broker-list-form";
import { MessageBrokerAuthenticationForm } from "./message-broker-authentication/message-broker-authentication-form";

const MESSAGING_PLATFORM_OPTIONS = createFormOptions(MESSAGING_PLATFORM_TYPE_VALUES);

/**
 * Type guard to check if interface list is Messaging interface
 */
function isMessagingInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { messagingInterface: MessagingInterface } {
  return interfaceList !== undefined && "messagingInterface" in interfaceList;
}

export function MessagingInterfaceDescriptionForm() {
  const { useDeviceState, useValidation, messagingInterfaceDescriptionActions, pathPrefix } =
    useDeviceFormContext();

  const messagingInterfaceDescription = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isMessagingInterface(interfaceList)
      ? interfaceList.messagingInterface.messagingInterfaceDescription
      : undefined;
  });

  const { getError } = useValidation();

  if (!messagingInterfaceDescription) {
    return null;
  }

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(
      pathPrefix,
      `interfaceList.messagingInterface.messagingInterfaceDescription.${field}`
    );

  return (
    <FormSection
      title="Messaging Interface Description"
      description="Configure the messaging interface connection settings"
      required={true}
      nested={true}
    >
      <FormGroup>
        <SelectField
          label="Platform"
          name="platform"
          required={true}
          options={MESSAGING_PLATFORM_OPTIONS}
          value={messagingInterfaceDescription.platform}
          onChange={(value) =>
            messagingInterfaceDescriptionActions.updatePlatform(value as MessagingPlatformType)
          }
          error={getError(fieldPath("platform"))}
        />
        <InputField
          label="Client ID"
          name="clientId"
          required={false}
          type="text"
          value={messagingInterfaceDescription.clientId || ""}
          onChange={(value) =>
            messagingInterfaceDescriptionActions.updateClientId(value || undefined)
          }
          placeholder="Optional client ID"
          error={getError(fieldPath("clientId"))}
        />
      </FormGroup>

      <MessageBrokerListForm />
      <MessageBrokerAuthenticationForm />
    </FormSection>
  );
}
