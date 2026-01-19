"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";
import { MessagingPlatformType, MESSAGING_PLATFORM_TYPE_VALUES } from "@/models/product/messaging-types";
import { createFormOptions } from "@/utils/form-options-utils";
import { MessageBrokerListForm } from "./message-broker-list/message-broker-list-form";
import { MessageBrokerAuthenticationForm } from "./message-broker-authentication/message-broker-authentication-form";

const MESSAGING_PLATFORM_OPTIONS = createFormOptions(MESSAGING_PLATFORM_TYPE_VALUES);

export function MessagingInterfaceDescriptionForm() {
  // Granular selector
  const messagingInterfaceDescription = useDeviceField(
    (d) => d?.interfaceList?.messagingInterface?.messagingInterfaceDescription
  );
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  if (!messagingInterfaceDescription) {
    return null;
  }

  const fieldPath = (field: string) => `interfaceList.messagingInterface.messagingInterfaceDescription.${field}`;

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
          onChange={(value) => store.updatePlatform(value as MessagingPlatformType)}
          error={getError(fieldPath("platform"))}
        />
        <InputField
          label="Client ID"
          name="clientId"
          required={false}
          type="text"
          value={messagingInterfaceDescription.clientId || ""}
          onChange={(value) => store.updateClientId(value || undefined)}
          placeholder="Optional client ID"
          error={getError(fieldPath("clientId"))}
        />
      </FormGroup>

      <MessageBrokerListForm />
      <MessageBrokerAuthenticationForm />
    </FormSection>
  );
}
