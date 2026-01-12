"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useShallow } from "zustand/react/shallow";
import { InterfaceList } from "@/models";
import { RestApiInterface } from "@/models/product/rest-api-interface";
import {
  RestApiInterfaceSelection,
  REST_API_INTERFACE_SELECTION_VALUES,
  RestApiAuthenticationMethod,
  REST_API_AUTHENTICATION_METHOD_VALUES,
} from "@/models/product/rest-api-types";
import { BOOLEAN_OPTIONS } from "@/models/generic";
import { createFormOptions } from "@/models/form-options-helper";
import { RestApiBasicForm } from "./rest-api-basic/rest-api-basic-form";
import { RestApiBearerForm } from "./rest-api-bearer/rest-api-bearer-form";

const REST_API_INTERFACE_SELECTION_OPTIONS = createFormOptions(REST_API_INTERFACE_SELECTION_VALUES);
const REST_API_AUTHENTICATION_METHOD_OPTIONS = createFormOptions(REST_API_AUTHENTICATION_METHOD_VALUES);
const VERIFY_CERTIFICATE_OPTIONS = BOOLEAN_OPTIONS;

/**
 * Type guard to check if interface list is REST API interface
 */
function isRestApiInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { restApiInterface: RestApiInterface } {
  return interfaceList !== undefined && "restApiInterface" in interfaceList;
}

export function RestApiInterfaceDescriptionForm() {
  const interfaceList = useDeviceStore(useShallow((state) => state.device?.interfaceList));
  const restApiInterfaceDescription = isRestApiInterface(interfaceList)
    ? interfaceList.restApiInterface.restApiInterfaceDescription
    : undefined;
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  if (!restApiInterfaceDescription) {
    return null;
  }

  const fieldPath = (field: string) => `interfaceList.restApiInterface.restApiInterfaceDescription.${field}`;

  const authMethod = restApiInterfaceDescription.restApiAuthenticationMethod;
  const showBasicAuth = authMethod === "BasicSecurityScheme";
  const showBearerAuth = authMethod === "BearerSecurityScheme";

  return (
    <FormSection
      title="REST API Interface Description"
      description="Configure the REST API interface connection settings"
      required={true}
      nested={true}
    >
      <FormGroup>
        <SelectField
          label="Interface Selection"
          name="restApiInterfaceSelection"
          required={true}
          options={REST_API_INTERFACE_SELECTION_OPTIONS}
          value={restApiInterfaceDescription.restApiInterfaceSelection}
          onChange={(value) => store.updateRestApiInterfaceSelection(value as RestApiInterfaceSelection)}
          error={getError(fieldPath("restApiInterfaceSelection"))}
        />
        <InputField
          label="REST API URI"
          name="restApiUri"
          required={true}
          value={restApiInterfaceDescription.restApiUri}
          onChange={(value) => store.updateRestApiUri(value)}
          placeholder="https://api.example.com"
          error={getError(fieldPath("restApiUri"))}
        />
      </FormGroup>

      <FormGroup>
        <SelectField
          label="Authentication Method"
          name="restApiAuthenticationMethod"
          required={false}
          placeholder="None (no authentication)"
          options={REST_API_AUTHENTICATION_METHOD_OPTIONS}
          value={restApiInterfaceDescription.restApiAuthenticationMethod ?? ""}
          onChange={(value) => store.updateRestApiAuthenticationMethod(value as RestApiAuthenticationMethod)}
          error={getError(fieldPath("restApiAuthenticationMethod"))}
        />
        <SelectField
          label="Verify Certificate"
          name="restApiVerifyCertificate"
          required={false}
          placeholder="Not specified"
          options={VERIFY_CERTIFICATE_OPTIONS}
          value={restApiInterfaceDescription.restApiVerifyCertificate ?? ""}
          onChange={(value) => store.updateRestApiVerifyCertificate(value || undefined)}
          error={getError(fieldPath("restApiVerifyCertificate"))}
        />
      </FormGroup>

      {showBasicAuth && <RestApiBasicForm />}
      {showBearerAuth && <RestApiBearerForm />}
    </FormSection>
  );
}
