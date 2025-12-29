"use client";

import { FormSection } from "@/components/forms/form-section";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
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

export function RestApiBasicForm() {
  const { useDeviceState, useValidation, restApiInterfaceDescriptionActions, pathPrefix } =
    useDeviceFormContext();

  const restApiBasic = useDeviceState((d) => {
    const interfaceList = d?.interfaceList;
    return isRestApiInterface(interfaceList)
      ? interfaceList.restApiInterface.restApiInterfaceDescription?.restApiBasic
      : undefined;
  });
  const { getError } = useValidation();

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(
      pathPrefix,
      `interfaceList.restApiInterface.restApiInterfaceDescription.restApiBasic.${field}`
    );

  const handleAdd = () => {
    restApiInterfaceDescriptionActions.addRestApiBasic();
  };

  const handleRemove = () => {
    restApiInterfaceDescriptionActions.removeRestApiBasic();
  };

  return (
    <FormSection
      title="Basic Authentication"
      description="Configure username and password for basic authentication"
      required={false}
      isAdded={!!restApiBasic}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      {restApiBasic && (
        <FormGroup>
          <InputField
            label="Username"
            name="restBasicUsername"
            required={true}
            value={restApiBasic.restBasicUsername}
            onChange={(value) => restApiInterfaceDescriptionActions.updateRestBasicUsername(value)}
            error={getError(fieldPath("restBasicUsername"))}
          />
          <InputField
            label="Password"
            name="restBasicPassword"
            required={true}
            value={restApiBasic.restBasicPassword}
            onChange={(value) => restApiInterfaceDescriptionActions.updateRestBasicPassword(value)}
            error={getError(fieldPath("restBasicPassword"))}
          />
        </FormGroup>
      )}
    </FormSection>
  );
}
