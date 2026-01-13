"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { ResponseQuery, RESPONSE_QUERY_TYPE_VALUES } from "@/models/generic";
import { createFormOptions } from "@/utils/form-options-utils";
import { ResponseQuerySlice } from "./response-query-slice";
import { JmesPathMappingForm } from "./jmespath/jmespath-mapping-form";

const RESPONSE_QUERY_TYPE_OPTIONS = createFormOptions(RESPONSE_QUERY_TYPE_VALUES);

interface ResponseQueryFormProps {
  responseQuery: ResponseQuery | undefined;
  actions: ResponseQuerySlice;
  fieldPathPrefix: string;
  getError: (fieldPath: string) => string | undefined;
}

export function ResponseQueryForm({ responseQuery, actions, fieldPathPrefix, getError }: ResponseQueryFormProps) {
  // Show query field for expression types (all except JMESPathMapping)
  // The query field is optional in the model, but should be available for these types
  const shouldShowQueryField =
    responseQuery && responseQuery.queryType !== "JMESPathMapping" && !("jmesPathMappings" in responseQuery);
  const queryValue = responseQuery && "query" in responseQuery ? responseQuery.query : "";

  return (
    <FormSection
      title="Response Query"
      description="Query expression to extract data from the response"
      required={false}
      isAdded={!!responseQuery}
      onAdd={() => actions.addResponseQuery()}
      onRemove={() => actions.removeResponseQuery()}
      nested={true}
    >
      {responseQuery && (
        <div className="space-y-4">
          <SelectField
            label="Query Type"
            name={`${fieldPathPrefix}-responseQueryType`}
            required={true}
            options={RESPONSE_QUERY_TYPE_OPTIONS}
            value={responseQuery.queryType}
            onChange={(value) => actions.updateResponseQueryType(value as ResponseQuery["queryType"])}
            placeholder="Select query type"
            error={getError(`${fieldPathPrefix}.responseQuery.queryType`)}
          />

          {/* Show query field for expression types (JMESPathExpression, XPathExpression, RegularExpression, JSONataExpression) */}
          {shouldShowQueryField && (
            <TextareaField
              label="Query Expression"
              name={`${fieldPathPrefix}-responseQueryQuery`}
              required={false}
              value={queryValue}
              onChange={(value) => actions.updateResponseQueryQuery(value || undefined)}
              placeholder="Enter query expression"
              rows={4}
              error={getError(`${fieldPathPrefix}.responseQuery.query`)}
            />
          )}

          {/* Show JMESPath Mapping for JMESPathMapping type */}
          {responseQuery.queryType === "JMESPathMapping" && (
            <JmesPathMappingForm
              responseQuery={responseQuery}
              actions={actions}
              fieldPathPrefix={fieldPathPrefix}
              getError={getError}
            />
          )}
        </div>
      )}
    </FormSection>
  );
}
