"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { ComboboxField } from "@/components/forms/combobox-field";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";
import { MessageBrokerListElement } from "@/models/product/messaging-types";
import { BOOLEAN_OPTIONS } from "@/models/generic";

export function MessageBrokerListForm() {
  const store = useDeviceStore.getState();

  // Granular selector
  const messageBrokerList = useDeviceField(
    (d) => d?.interfaceList?.messagingInterface?.messagingInterfaceDescription?.messageBrokerList
  );

  const fieldPath = (field: string) =>
    `interfaceList.messagingInterface.messagingInterfaceDescription.messageBrokerList.${field}`;

  return (
    <FormSection
      title="Message Broker List"
      description="Configure the list of message brokers"
      required={true}
      nested={true}
    >
      {messageBrokerList && (
        <ArrayField<MessageBrokerListElement>
          label="Message Broker"
          items={messageBrokerList.messageBrokerListElement}
          onAdd={() => store.addMessageBrokerListElement()}
          onRemove={(index) => store.removeMessageBrokerListElement(index)}
          emptyMessage="No message brokers added"
          noWrapper={true}
          renderItem={(item, index) => (
            <MessageBrokerListElementForm
              key={index}
              elementIndex={index}
              element={item}
              fieldPathPrefix={`${fieldPath("messageBrokerListElement")}[${index}]`}
            />
          )}
        />
      )}
    </FormSection>
  );
}

interface MessageBrokerListElementFormProps {
  elementIndex: number;
  element: MessageBrokerListElement;
  fieldPathPrefix: string;
}

function MessageBrokerListElementForm({ elementIndex, element, fieldPathPrefix }: MessageBrokerListElementFormProps) {
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  const elementName = element.host || `Message Broker ${elementIndex + 1}`;

  const handleRemove = () => {
    store.removeMessageBrokerListElement(elementIndex);
  };

  return (
    <FormSection
      title={elementName}
      description="Configure the message broker connection settings"
      required={false}
      isAdded={true}
      onRemove={handleRemove}
      nested={true}
    >
      <FormGroup>
        <InputField
          label="Host"
          name={`${fieldPathPrefix}-host`}
          required={true}
          type="text"
          value={element.host}
          onChange={(value) => store.updateMessageBrokerListElementHost(elementIndex, value)}
          error={getError(`${fieldPathPrefix}.host`)}
        />
        <InputField
          label="Port"
          name={`${fieldPathPrefix}-port`}
          required={true}
          type="text"
          value={element.port}
          onChange={(value) => store.updateMessageBrokerListElementPort(elementIndex, value)}
          error={getError(`${fieldPathPrefix}.port`)}
        />
      </FormGroup>

      <FormGroup>
        <ComboboxField
          label="TLS"
          name={`${fieldPathPrefix}-tls`}
          required={false}
          placeholder="Enter true, false, or {{parameter}}"
          options={BOOLEAN_OPTIONS}
          value={element.tls}
          onChange={(value) => store.updateMessageBrokerListElementTls(elementIndex, value || undefined)}
          error={getError(`${fieldPathPrefix}.tls`)}
        />
        <ComboboxField
          label="TLS Verify Certificate"
          name={`${fieldPathPrefix}-tlsVerifyCertificate`}
          required={false}
          placeholder="Enter true, false, or {{parameter}}"
          options={BOOLEAN_OPTIONS}
          value={element.tlsVerifyCertificate}
          onChange={(value) =>
            store.updateMessageBrokerListElementTlsVerifyCertificate(elementIndex, value || undefined)
          }
          error={getError(`${fieldPathPrefix}.tlsVerifyCertificate`)}
        />
      </FormGroup>
    </FormSection>
  );
}
