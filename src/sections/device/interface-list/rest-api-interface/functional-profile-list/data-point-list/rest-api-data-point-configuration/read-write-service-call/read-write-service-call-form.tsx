"use client";

import { FormSection } from "@/components/forms/form-section";
import { RestApiServiceCallForm } from "@/sections/shared/rest-api-service-call/rest-api-service-call-form";
import { useDeviceStore, DeviceStoreState } from "@/sections/device/device-store";
import { RestApiDataPointConfiguration } from "@/models/product/rest-api-types";
import { isReadWriteServiceCallConfig, ReadWriteServiceCallSlice } from "./read-write-service-call-slice";

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

  return (
    <div className="space-y-6">
      {/* Read Service Call - Required */}
      <RestApiServiceCallForm<DeviceStoreState>
        useStore={useDeviceStore}
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
          <RestApiServiceCallForm<DeviceStoreState>
            useStore={useDeviceStore}
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
