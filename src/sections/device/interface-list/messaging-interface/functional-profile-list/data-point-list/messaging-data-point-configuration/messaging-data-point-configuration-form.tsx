"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { MessagingDataPointConfiguration, MESSAGING_DATA_TYPE_VALUES } from "@/models/product/messaging-types";
import { createFormOptions } from "@/utils/form-options-utils";
import { MessagingDataPointConfigurationSlice } from "./messaging-data-point-configuration-slice";
import { OutMessageForm } from "./out-message/out-message-form";
import { InMessageForm } from "./in-message/in-message-form";

const MESSAGING_DATA_TYPE_OPTIONS = createFormOptions(MESSAGING_DATA_TYPE_VALUES);

interface MessagingDataPointConfigurationFormProps {
  configuration: MessagingDataPointConfiguration | undefined;
  actions: MessagingDataPointConfigurationSlice;
  fieldPathPrefix: string;
  getError: (fieldPath: string) => string | undefined;
}

export function MessagingDataPointConfigurationForm({
  configuration,
  actions,
  fieldPathPrefix,
  getError,
}: MessagingDataPointConfigurationFormProps) {
  if (!configuration) {
    return null;
  }

  const dataTypeValue =
    "number" in configuration.messagingDataType
      ? "number"
      : "string" in configuration.messagingDataType
        ? "string"
        : "JSON_array" in configuration.messagingDataType
          ? "JSON_array"
          : "JSON_object";

  const readCmdMessageSlice = actions.getReadCmdMessageSlice();
  const writeCmdMessageSlice = actions.getWriteCmdMessageSlice();
  const inMessageSlice = actions.getInMessageSlice();

  return (
    <FormSection
      title="Messaging Data Point Configuration"
      description="Configure messaging-specific settings for this data point"
      required={true}
      nested={true}
    >
      <div className="space-y-6">
        <SelectField
          label="Messaging Data Type"
          name={`${fieldPathPrefix}-messagingDataType`}
          required={true}
          options={MESSAGING_DATA_TYPE_OPTIONS}
          value={dataTypeValue}
          onChange={(value) => {
            const newDataType: MessagingDataPointConfiguration["messagingDataType"] =
              value === "number"
                ? { number: {} }
                : value === "string"
                  ? { string: {} }
                  : value === "JSON_array"
                    ? { JSON_array: {} }
                    : { JSON_object: {} };
            actions.updateMessagingDataType(newDataType);
          }}
          placeholder="Select data type"
          error={getError(`${fieldPathPrefix}.messagingDataType`)}
        />

        <FormSection
          title="Read Command Message"
          description="Configure the read command message"
          required={false}
          isAdded={!!configuration.readCmdMessage}
          onAdd={() => actions.addReadCmdMessage()}
          onRemove={() => actions.removeReadCmdMessage()}
          nested={true}
        >
          {configuration.readCmdMessage && (
            <OutMessageForm
              outMessage={configuration.readCmdMessage}
              actions={readCmdMessageSlice}
              fieldPathPrefix={`${fieldPathPrefix}.readCmdMessage`}
              getError={getError}
            />
          )}
        </FormSection>

        <FormSection
          title="Write Command Message"
          description="Configure the write command message"
          required={false}
          isAdded={!!configuration.writeCmdMessage}
          onAdd={() => actions.addWriteCmdMessage()}
          onRemove={() => actions.removeWriteCmdMessage()}
          nested={true}
        >
          {configuration.writeCmdMessage && (
            <OutMessageForm
              outMessage={configuration.writeCmdMessage}
              actions={writeCmdMessageSlice}
              fieldPathPrefix={`${fieldPathPrefix}.writeCmdMessage`}
              getError={getError}
            />
          )}
        </FormSection>

        <FormSection
          title="In Message"
          description="Configure the incoming message"
          required={false}
          isAdded={!!configuration.inMessage}
          onAdd={() => actions.addInMessage()}
          onRemove={() => actions.removeInMessage()}
          nested={true}
        >
          {configuration.inMessage && (
            <InMessageForm
              inMessage={configuration.inMessage}
              actions={inMessageSlice}
              fieldPathPrefix={`${fieldPathPrefix}.inMessage`}
              getError={getError}
            />
          )}
        </FormSection>
      </div>
    </FormSection>
  );
}
