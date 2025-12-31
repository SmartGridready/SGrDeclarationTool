"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { ArrayField } from "@/components/forms/array-field";
import { RestApiServiceCall } from "@/models/product/rest-api-types";
import { RequestFormSlice } from "./request-form-slice";

interface RequestFormFormProps {
  serviceCall: RestApiServiceCall;
  actions: RequestFormSlice;
  fieldPathPrefix: string;
  getError: (fieldPath: string) => string | undefined;
}

export function RequestFormForm({ serviceCall, actions, fieldPathPrefix, getError }: RequestFormFormProps) {
  return (
    <FormSection
      title="Request Form"
      description="Form parameters to include in the request body"
      required={false}
      isAdded={!!serviceCall.requestForm}
      onAdd={() => actions.addRequestForm()}
      onRemove={() => actions.removeRequestForm()}
      nested={true}
    >
      {serviceCall.requestForm && (
        <ArrayField
          label="Form Parameters"
          items={serviceCall.requestForm.parameter}
          onAdd={() => actions.addRequestFormParameter()}
          onRemove={(index) => actions.removeRequestFormParameter(index)}
          emptyMessage="No form parameters added"
          renderItem={(param, index) => (
            <FormGroup columns={2}>
              <InputField
                label="Parameter Name"
                name={`${fieldPathPrefix}-form-${index}-name`}
                type="text"
                value={param.name}
                onChange={(value) => actions.updateRequestFormParameterName(index, value)}
                placeholder="Enter parameter name"
                required={true}
                error={getError(`${fieldPathPrefix}.requestForm.parameter[${index}].name`)}
              />
              <InputField
                label="Parameter Value"
                name={`${fieldPathPrefix}-form-${index}-value`}
                type="text"
                value={param.value}
                onChange={(value) => actions.updateRequestFormParameterValue(index, value)}
                placeholder="Enter parameter value"
                required={true}
                error={getError(`${fieldPathPrefix}.requestForm.parameter[${index}].value`)}
              />
            </FormGroup>
          )}
        />
      )}
    </FormSection>
  );
}
