"use client";

import { InputField } from "@/components/forms/input-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { OutMessage } from "@/models/product/messaging-types";
import { OutMessageSlice } from "./out-message-slice";
import { ResponseQueryForm } from "@/sections/shared/response-query/response-query-form";
import { MessagingValueMappingForm } from "@/sections/shared/messaging-value-mapping/messaging-value-mapping-form";

interface OutMessageFormProps {
  outMessage: OutMessage | undefined;
  actions: OutMessageSlice;
  fieldPathPrefix: string;
  getError: (fieldPath: string) => string | undefined;
}

export function OutMessageForm({
  outMessage,
  actions,
  fieldPathPrefix,
  getError,
}: OutMessageFormProps) {
  if (!outMessage) {
    return null;
  }

  return (
    <div className="space-y-4">
      <InputField
        label="Topic"
        name={`${fieldPathPrefix}-topic`}
        type="text"
        value={outMessage.topic}
        onChange={(value) => actions.updateTopic(value)}
        placeholder="Enter topic"
        required={true}
        error={getError(`${fieldPathPrefix}.topic`)}
      />

      <TextareaField
        label="Template"
        name={`${fieldPathPrefix}-template`}
        value={outMessage.template}
        onChange={(value) => actions.updateTemplate(value)}
        placeholder="Enter message template"
        required={true}
        rows={4}
        error={getError(`${fieldPathPrefix}.template`)}
      />

      <ResponseQueryForm
        responseQuery={outMessage.templateQuery}
        actions={actions}
        fieldPathPrefix={`${fieldPathPrefix}.templateQuery`}
        getError={getError}
      />

      <MessagingValueMappingForm
        valueMapping={outMessage.valueMapping}
        actions={actions}
        fieldPathPrefix={`${fieldPathPrefix}.valueMapping`}
        getError={getError}
      />
    </div>
  );
}
