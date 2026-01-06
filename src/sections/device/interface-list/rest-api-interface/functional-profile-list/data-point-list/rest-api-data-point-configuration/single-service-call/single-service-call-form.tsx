"use client";

import { RestApiServiceCallForm } from "@/sections/shared/rest-api-service-call/rest-api-service-call-form";
import { RestApiDataPointConfiguration } from "@/models/product/rest-api-types";
import { isSingleServiceCallConfig, SingleServiceCallSlice } from "./single-service-call-slice";
import { createSliceAdapter } from "@/hooks/use-form-section";

interface SingleServiceCallFormProps {
  config: RestApiDataPointConfiguration;
  actions: SingleServiceCallSlice;
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  fieldPathPrefix: string;
}

export function SingleServiceCallForm({ config, actions, useValidation, fieldPathPrefix }: SingleServiceCallFormProps) {
  if (!isSingleServiceCallConfig(config)) {
    return null;
  }

  const useStore = createSliceAdapter(actions);

  return (
    <RestApiServiceCallForm<SingleServiceCallSlice>
      useStore={useStore}
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
