"use client";

import { FormSection } from "@/components/forms/form-section";
import { useFormSection } from "@/hooks/use-form-section";
import { RestApiServiceCallSlice } from "./rest-api-service-call-slice";
import { RestApiServiceCall } from "@/models/product/rest-api-types";
import { RequestBasicForm } from "./request-basic/request-basic-form";
import { RequestHeaderForm } from "./request-header/request-header-form";
import { RequestQueryForm } from "./request-query/request-query-form";
import { RequestFormForm } from "./request-form/request-form-form";
import { ResponseQueryForm } from "./response-query/response-query-form";
import { ValueMappingForm } from "./value-mapping/value-mapping-form";

interface RestApiServiceCallFormProps<TStoreState extends RestApiServiceCallSlice> {
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  stateSelector: (store: TStoreState) => {
    restApiServiceCall?: RestApiServiceCall;
  };
  isAddedSelector?: (store: TStoreState) => boolean;
  fieldPathPrefix?: string;
  required?: boolean;
  title?: string;
  description?: string;
  nested?: boolean;
}

export function RestApiServiceCallForm<TStoreState extends RestApiServiceCallSlice>({
  useStore,
  useValidation,
  stateSelector,
  isAddedSelector,
  fieldPathPrefix = "restApiServiceCall",
  required = false,
  title = "REST API Service Call",
  description = "Configure the REST API service call settings",
  nested = false,
}: RestApiServiceCallFormProps<TStoreState>) {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } = useFormSection<
    TStoreState,
    {
      restApiServiceCall?: RestApiServiceCall;
    },
    RestApiServiceCallSlice & Record<string, unknown>
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => store as RestApiServiceCallSlice & Record<string, unknown>,
    isAddedSelector: required ? undefined : isAddedSelector,
    onAdd: required
      ? undefined
      : (actions) => {
          // Initialize with required requestMethod
          actions.updateRequestMethod("GET");
        },
    onRemove: required
      ? undefined
      : (actions) => {
          // Note: The actual removal should be handled by the parent component
          // This is just a placeholder
        },
  });

  const serviceCall = state.restApiServiceCall;

  return (
    <FormSection
      title={title}
      description={description}
      required={required}
      isAdded={required ? true : isAdded}
      onAdd={required ? undefined : handleAdd}
      onRemove={required ? undefined : handleRemove}
      nested={nested}
    >
      {serviceCall && (
        <div className="space-y-6">
          <RequestBasicForm
            serviceCall={serviceCall}
            actions={actions}
            fieldPathPrefix={fieldPathPrefix}
            getError={getError}
          />

          <RequestHeaderForm
            serviceCall={serviceCall}
            actions={actions}
            fieldPathPrefix={fieldPathPrefix}
            getError={getError}
          />

          <RequestQueryForm
            serviceCall={serviceCall}
            actions={actions}
            fieldPathPrefix={fieldPathPrefix}
            getError={getError}
          />

          <RequestFormForm
            serviceCall={serviceCall}
            actions={actions}
            fieldPathPrefix={fieldPathPrefix}
            getError={getError}
          />

          <ResponseQueryForm
            responseQuery={serviceCall.responseQuery}
            actions={actions}
            fieldPathPrefix={fieldPathPrefix}
            getError={getError}
          />

          <ValueMappingForm
            serviceCall={serviceCall}
            actions={actions}
            fieldPathPrefix={fieldPathPrefix}
            getError={getError}
          />
        </div>
      )}
    </FormSection>
  );
}
