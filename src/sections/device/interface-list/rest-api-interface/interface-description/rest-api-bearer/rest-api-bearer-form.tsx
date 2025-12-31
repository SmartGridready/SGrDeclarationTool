"use client";

import { FormSection } from "@/components/forms/form-section";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { RestApiServiceCallForm } from "@/sections/shared/rest-api-service-call/rest-api-service-call-form";
import { useDeviceStore, DeviceStoreState } from "@/sections/device/device-store";
import { InterfaceList } from "@/models";
import { RestApiInterface } from "@/models/product/rest-api-interface";

/**
 * Type guard to check if interface list is REST API interface
 */
function isRestApiInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { restApiInterface: RestApiInterface } {
  return interfaceList !== undefined && "restApiInterface" in interfaceList;
}

export function RestApiBearerForm() {
  const { useDeviceState, useValidation, restApiInterfaceDescriptionActions, pathPrefix } = useDeviceFormContext();

  const restApiBearer = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isRestApiInterface(interfaceList)
      ? interfaceList.restApiInterface.restApiInterfaceDescription?.restApiBearer
      : undefined;
  });

  const handleAdd = () => {
    restApiInterfaceDescriptionActions.addRestApiBearer();
  };

  const handleRemove = () => {
    restApiInterfaceDescriptionActions.removeRestApiBearer();
  };

  const fieldPathPrefix = buildDeviceFieldPath(
    pathPrefix,
    "interfaceList.restApiInterface.restApiInterfaceDescription.restApiBearer.restApiServiceCall"
  );

  return (
    <FormSection
      title="Bearer Authentication"
      description="Configure bearer token authentication using a service call"
      required={false}
      isAdded={!!restApiBearer}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      {restApiBearer && (
        <RestApiServiceCallForm<DeviceStoreState>
          useStore={useDeviceStore}
          useValidation={useValidation}
          stateSelector={(store) => {
            const interfaceList = store.device?.interfaceList;
            return {
              restApiServiceCall: isRestApiInterface(interfaceList)
                ? interfaceList.restApiInterface.restApiInterfaceDescription?.restApiBearer?.restApiServiceCall
                : undefined,
            };
          }}
          fieldPathPrefix={fieldPathPrefix}
          required={true}
          title="Bearer Service Call"
          description="Configure the service call to obtain the bearer token"
          nested={true}
        />
      )}
    </FormSection>
  );
}
