"use client";

import { FormSection } from "@/components/forms/form-section";
import { RestApiServiceCallForm } from "@/sections/shared/rest-api-service-call/rest-api-service-call-form";
import { RestApiDataPointConfiguration } from "@/models/product/rest-api-types";
import { isReadWriteServiceCallConfig, ReadWriteServiceCallSlice } from "./read-write-service-call-slice";
import { createSliceAdapter } from "@/hooks/use-form-section";

interface ReadWriteServiceCallFormProps {
  config: RestApiDataPointConfiguration;
  actions: ReadWriteServiceCallSlice;
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  fieldPathPrefix: string;
}

export function ReadWriteServiceCallForm({
  config,
  actions,
  useValidation,
  fieldPathPrefix,
}: ReadWriteServiceCallFormProps) {
  if (!isReadWriteServiceCallConfig(config)) {
    return null;
  }

  const hasWriteServiceCall = !!config.restApiWriteServiceCall;

  // Get the service call slices from the actions and create adapters
  const readUseStore = createSliceAdapter(actions.getReadServiceCallSlice());
  const writeUseStore = createSliceAdapter(actions.getWriteServiceCallSlice());

  return (
    <div className="space-y-6">
      {/* Read Service Call - Required */}
      <RestApiServiceCallForm
        useStore={readUseStore}
        useValidation={useValidation}
        stateSelector={() => ({
          restApiServiceCall: config.restApiReadServiceCall,
        })}
        fieldPathPrefix={`${fieldPathPrefix}.restApiReadServiceCall`}
        required={true}
        title="Read Service Call"
        description="Configure the REST API service call for read operations (required)"
        nested={true}
      />

      {/* Write Service Call - Optional */}
      <FormSection
        title="Write Service Call"
        description="Configure the REST API service call for write operations (optional)"
        required={false}
        isAdded={hasWriteServiceCall}
        onAdd={() => actions.addWriteServiceCall()}
        onRemove={() => actions.removeWriteServiceCall()}
        nested={true}
      >
        {hasWriteServiceCall && config.restApiWriteServiceCall && (
          <RestApiServiceCallForm
            useStore={writeUseStore}
            useValidation={useValidation}
            stateSelector={() => ({
              restApiServiceCall: config.restApiWriteServiceCall,
            })}
            fieldPathPrefix={`${fieldPathPrefix}.restApiWriteServiceCall`}
            required={true}
            bare={true}
          />
        )}
      </FormSection>
    </div>
  );
}
