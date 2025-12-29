"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { ArrayField } from "@/components/forms/array-field";
import { RestApiServiceCall } from "@/models/product/rest-api-types";
import { RequestQuerySlice } from "./request-query-slice";

interface RequestQueryFormProps {
  serviceCall: RestApiServiceCall;
  actions: RequestQuerySlice;
  fieldPathPrefix: string;
  getError: (fieldPath: string) => string | undefined;
}

export function RequestQueryForm({
  serviceCall,
  actions,
  fieldPathPrefix,
  getError,
}: RequestQueryFormProps) {
  return (
    <FormSection
      title="Request Query"
      description="Query parameters to include in the request URL"
      required={false}
      isAdded={!!serviceCall.requestQuery}
      onAdd={() => actions.addRequestQuery()}
      onRemove={() => actions.removeRequestQuery()}
      nested={true}
    >
      {serviceCall.requestQuery && (
        <ArrayField
          label="Query Parameters"
          items={serviceCall.requestQuery.parameter}
          onAdd={() => actions.addRequestQueryParameter()}
          onRemove={(index) => actions.removeRequestQueryParameter(index)}
          emptyMessage="No query parameters added"
          renderItem={(param, index) => (
            <FormGroup columns={2}>
              <InputField
                label="Parameter Name"
                name={`${fieldPathPrefix}-query-${index}-name`}
                type="text"
                value={param.name}
                onChange={(value) => actions.updateRequestQueryParameterName(index, value)}
                placeholder="Enter parameter name"
                required={true}
                error={getError(`${fieldPathPrefix}.requestQuery.parameter[${index}].name`)}
              />
              <InputField
                label="Parameter Value"
                name={`${fieldPathPrefix}-query-${index}-value`}
                type="text"
                value={param.value}
                onChange={(value) => actions.updateRequestQueryParameterValue(index, value)}
                placeholder="Enter parameter value"
                required={true}
                error={getError(`${fieldPathPrefix}.requestQuery.parameter[${index}].value`)}
              />
            </FormGroup>
          )}
        />
      )}
    </FormSection>
  );
}
