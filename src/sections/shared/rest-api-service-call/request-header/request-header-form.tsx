"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { ArrayField } from "@/components/forms/array-field";
import { RestApiServiceCall } from "@/models/product/rest-api-types";
import { RequestHeaderSlice } from "./request-header-slice";

interface RequestHeaderFormProps {
  serviceCall: RestApiServiceCall;
  actions: RequestHeaderSlice;
  fieldPathPrefix: string;
  getError: (fieldPath: string) => string | undefined;
}

export function RequestHeaderForm({ serviceCall, actions, fieldPathPrefix, getError }: RequestHeaderFormProps) {
  return (
    <FormSection
      title="Request Header"
      description="HTTP headers to include in the request"
      required={false}
      isAdded={!!serviceCall.requestHeader}
      onAdd={() => actions.addRequestHeader()}
      onRemove={() => actions.removeRequestHeader()}
      nested={true}
    >
      {serviceCall.requestHeader && (
        <ArrayField
          label="Headers"
          items={serviceCall.requestHeader.header}
          onAdd={() => actions.addRequestHeaderEntry()}
          onRemove={(index) => actions.removeRequestHeaderEntry(index)}
          emptyMessage="No headers added"
          renderItem={(header, index) => (
            <FormGroup columns={2}>
              <InputField
                label="Header Name"
                name={`${fieldPathPrefix}-header-${index}-name`}
                type="text"
                value={header.headerName}
                onChange={(value) => actions.updateRequestHeaderEntryName(index, value)}
                placeholder="Enter header name (e.g., Content-Type)"
                required={true}
                error={getError(`${fieldPathPrefix}.requestHeader.header[${index}].headerName`)}
              />
              <InputField
                label="Header Value"
                name={`${fieldPathPrefix}-header-${index}-value`}
                type="text"
                value={header.value}
                onChange={(value) => actions.updateRequestHeaderEntryValue(index, value)}
                placeholder="Enter header value"
                required={true}
                error={getError(`${fieldPathPrefix}.requestHeader.header[${index}].value`)}
              />
            </FormGroup>
          )}
        />
      )}
    </FormSection>
  );
}
