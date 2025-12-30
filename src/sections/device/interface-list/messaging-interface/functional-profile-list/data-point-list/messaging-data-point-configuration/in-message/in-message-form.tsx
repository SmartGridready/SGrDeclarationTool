"use client";

import { InputField } from "@/components/forms/input-field";
import { InMessage } from "@/models/product/messaging-types";
import { InMessageSlice } from "./in-message-slice";
import { ResponseQueryForm } from "@/sections/shared/response-query/response-query-form";
import { MessagingValueMappingForm } from "@/sections/shared/messaging-value-mapping/messaging-value-mapping-form";
import { MessageFilterForm } from "./message-filter/message-filter-form";

interface InMessageFormProps {
  inMessage: InMessage | undefined;
  actions: InMessageSlice;
  fieldPathPrefix: string;
  getError: (fieldPath: string) => string | undefined;
}

export function InMessageForm({
  inMessage,
  actions,
  fieldPathPrefix,
  getError,
}: InMessageFormProps) {
  if (!inMessage) {
    return null;
  }

  return (
    <div className="space-y-4">
      <InputField
        label="Topic"
        name={`${fieldPathPrefix}-topic`}
        type="text"
        value={inMessage.topic}
        onChange={(value) => actions.updateTopic(value)}
        placeholder="Enter topic"
        required={true}
        error={getError(`${fieldPathPrefix}.topic`)}
      />

      <MessageFilterForm
        messageFilter={inMessage.filter}
        actions={actions}
        fieldPathPrefix={`${fieldPathPrefix}.filter`}
        getError={getError}
      />

      <ResponseQueryForm
        responseQuery={inMessage.responseQuery}
        actions={actions}
        fieldPathPrefix={`${fieldPathPrefix}.responseQuery`}
        getError={getError}
      />

      <MessagingValueMappingForm
        valueMapping={inMessage.valueMapping}
        actions={actions}
        fieldPathPrefix={`${fieldPathPrefix}.valueMapping`}
        getError={getError}
      />
    </div>
  );
}
