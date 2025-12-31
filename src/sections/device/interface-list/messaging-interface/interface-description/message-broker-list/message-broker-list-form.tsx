"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { ComboboxField } from "@/components/forms/combobox-field";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { InterfaceList } from "@/models";
import { MessagingInterface } from "@/models/product/messaging-interface";
import { MessageBrokerListElement } from "@/models/product/messaging-types";
import { BOOLEAN_OPTIONS } from "@/models/generic";

/**
 * Type guard to check if interface list is Messaging interface
 */
function isMessagingInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { messagingInterface: MessagingInterface } {
  return interfaceList !== undefined && "messagingInterface" in interfaceList;
}

export function MessageBrokerListForm() {
  const { useDeviceState, messagingInterfaceDescriptionActions, pathPrefix } = useDeviceFormContext();

  const messageBrokerList = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isMessagingInterface(interfaceList)
      ? interfaceList.messagingInterface.messagingInterfaceDescription?.messageBrokerList
      : undefined;
  });

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(
      pathPrefix,
      `interfaceList.messagingInterface.messagingInterfaceDescription.messageBrokerList.${field}`
    );

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
          onAdd={() => messagingInterfaceDescriptionActions.addMessageBrokerListElement()}
          onRemove={(index) => messagingInterfaceDescriptionActions.removeMessageBrokerListElement(index)}
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
  const { useValidation, messagingInterfaceDescriptionActions } = useDeviceFormContext();
  const { getError } = useValidation();

  const elementName = element.host || `Message Broker ${elementIndex + 1}`;

  const handleRemove = () => {
    messagingInterfaceDescriptionActions.removeMessageBrokerListElement(elementIndex);
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
          onChange={(value) =>
            messagingInterfaceDescriptionActions.updateMessageBrokerListElementHost(elementIndex, value)
          }
          error={getError(`${fieldPathPrefix}.host`)}
        />
        <InputField
          label="Port"
          name={`${fieldPathPrefix}-port`}
          required={true}
          type="text"
          value={element.port}
          onChange={(value) =>
            messagingInterfaceDescriptionActions.updateMessageBrokerListElementPort(elementIndex, value)
          }
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
          onChange={(value) =>
            messagingInterfaceDescriptionActions.updateMessageBrokerListElementTls(elementIndex, value || undefined)
          }
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
            messagingInterfaceDescriptionActions.updateMessageBrokerListElementTlsVerifyCertificate(
              elementIndex,
              value || undefined
            )
          }
          error={getError(`${fieldPathPrefix}.tlsVerifyCertificate`)}
        />
      </FormGroup>
    </FormSection>
  );
}
