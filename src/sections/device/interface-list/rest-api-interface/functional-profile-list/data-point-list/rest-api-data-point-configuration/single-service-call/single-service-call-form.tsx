"use client";

import { RestApiServiceCallForm } from "@/sections/shared/rest-api-service-call/rest-api-service-call-form";
import { useDeviceStore, DeviceStoreState } from "@/sections/device/device-store";
import { RestApiDataPointConfiguration } from "@/models/product/rest-api-types";
import { isSingleServiceCallConfig } from "./single-service-call-slice";

interface SingleServiceCallFormProps {
  config: RestApiDataPointConfiguration;
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  fieldPathPrefix: string;
}

export function SingleServiceCallForm({ config, useValidation, fieldPathPrefix }: SingleServiceCallFormProps) {
  if (!isSingleServiceCallConfig(config)) {
    return null;
  }

  return (
    <RestApiServiceCallForm<DeviceStoreState>
      useStore={useDeviceStore}
      useValidation={useValidation}
      stateSelector={() => ({
        restApiServiceCall: config.restApiServiceCall,
      })}
      fieldPathPrefix={`${fieldPathPrefix}.restApiServiceCall`}
      required={true}
      title="Service Call"
      description="Configure the REST API service call for this data point"
      nested={true}
    />
  );
}
