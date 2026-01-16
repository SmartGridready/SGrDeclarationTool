"use client";

import { FormSection } from "@/components/forms/form-section";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";

export function RestApiBasicForm() {
  // Granular selector for REST API basic auth
  const restApiBasic = useDeviceField(
    (d) => d?.interfaceList?.restApiInterface?.restApiInterfaceDescription?.restApiBasic
  );
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  const fieldPath = (field: string) =>
    `interfaceList.restApiInterface.restApiInterfaceDescription.restApiBasic.${field}`;

  const handleAdd = () => {
    store.addRestApiBasic();
  };

  const handleRemove = () => {
    store.removeRestApiBasic();
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
            onChange={(value) => store.updateRestBasicUsername(value)}
            error={getError(fieldPath("restBasicUsername"))}
          />
          <InputField
            label="Password"
            name="restBasicPassword"
            required={true}
            value={restApiBasic.restBasicPassword}
            onChange={(value) => store.updateRestBasicPassword(value)}
            error={getError(fieldPath("restBasicPassword"))}
          />
        </FormGroup>
      )}
    </FormSection>
  );
}
