"use client";

import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { FormGroup } from "@/components/forms/form-group";
import {
  RestApiServiceCall,
  HTTP_METHOD_VALUES,
  HttpMethod,
} from "@/models/product/rest-api-types";
import { createFormOptions } from "@/models/form-options-helper";
import { RequestBasicSlice } from "./request-basic-slice";

const HTTP_METHOD_OPTIONS = createFormOptions(HTTP_METHOD_VALUES);

interface RequestBasicFormProps {
  serviceCall: RestApiServiceCall;
  actions: RequestBasicSlice;
  fieldPathPrefix: string;
  getError: (fieldPath: string) => string | undefined;
}

export function RequestBasicForm({
  serviceCall,
  actions,
  fieldPathPrefix,
  getError,
}: RequestBasicFormProps) {
  return (
    <div className="space-y-4">
      <FormGroup>
        <SelectField
          label="Request Method"
          name={`${fieldPathPrefix}-requestMethod`}
          required={true}
          options={HTTP_METHOD_OPTIONS}
          value={serviceCall.requestMethod}
          onChange={(value) => actions.updateRequestMethod(value as HttpMethod)}
          placeholder="Select HTTP method"
          error={getError(`${fieldPathPrefix}.requestMethod`)}
        />
        <InputField
          label="Request Path"
          name={`${fieldPathPrefix}-requestPath`}
          required={false}
          type="text"
          value={serviceCall.requestPath || ""}
          onChange={(value) => actions.updateRequestPath(value || undefined)}
          placeholder="Enter request path (e.g., /api/v1/data)"
          error={getError(`${fieldPathPrefix}.requestPath`)}
        />
      </FormGroup>

      <TextareaField
        label="Request Body"
        name={`${fieldPathPrefix}-requestBody`}
        required={false}
        value={serviceCall.requestBody || ""}
        onChange={(value) => actions.updateRequestBody(value || undefined)}
        placeholder="Enter request body (JSON, XML, etc.)"
        rows={6}
        error={getError(`${fieldPathPrefix}.requestBody`)}
      />
    </div>
  );
}
