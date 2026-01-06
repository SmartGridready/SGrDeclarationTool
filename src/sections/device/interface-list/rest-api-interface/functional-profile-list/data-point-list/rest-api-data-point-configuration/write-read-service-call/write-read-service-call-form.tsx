"use client";

import { FormSection } from "@/components/forms/form-section";
import { RestApiServiceCallForm } from "@/sections/shared/rest-api-service-call/rest-api-service-call-form";
import { RestApiDataPointConfiguration } from "@/models/product/rest-api-types";
import { isWriteReadServiceCallConfig, WriteReadServiceCallSlice } from "./write-read-service-call-slice";
import { createSliceAdapter } from "@/hooks/use-form-section";

interface WriteReadServiceCallFormProps {
  config: RestApiDataPointConfiguration;
  actions: WriteReadServiceCallSlice;
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  fieldPathPrefix: string;
}

export function WriteReadServiceCallForm({
  config,
  actions,
  useValidation,
  fieldPathPrefix,
}: WriteReadServiceCallFormProps) {
  if (!isWriteReadServiceCallConfig(config)) {
    return null;
  }

  const hasReadServiceCall = !!config.restApiReadServiceCall;

  // Get the service call slices from the actions and create adapters
  const writeUseStore = createSliceAdapter(actions.getWriteServiceCallSlice());
  const readUseStore = createSliceAdapter(actions.getReadServiceCallSlice());

  return (
    <div className="space-y-6">
      {/* Write Service Call - Required */}
      <RestApiServiceCallForm
        useStore={writeUseStore}
        useValidation={useValidation}
        stateSelector={() => ({
          restApiServiceCall: config.restApiWriteServiceCall,
        })}
        fieldPathPrefix={`${fieldPathPrefix}.restApiWriteServiceCall`}
        required={true}
        title="Write Service Call"
        description="Configure the REST API service call for write operations (required)"
        nested={true}
      />

      {/* Read Service Call - Optional */}
      <FormSection
        title="Read Service Call"
        description="Configure the REST API service call for read operations (optional)"
        required={false}
        isAdded={hasReadServiceCall}
        onAdd={() => actions.addReadServiceCall()}
        onRemove={() => actions.removeReadServiceCall()}
        nested={true}
      >
        {hasReadServiceCall && config.restApiReadServiceCall && (
          <RestApiServiceCallForm
            useStore={readUseStore}
            useValidation={useValidation}
            stateSelector={() => ({
              restApiServiceCall: config.restApiReadServiceCall,
            })}
            fieldPathPrefix={`${fieldPathPrefix}.restApiReadServiceCall`}
            required={true}
            bare={true}
          />
        )}
      </FormSection>
    </div>
  );
}
