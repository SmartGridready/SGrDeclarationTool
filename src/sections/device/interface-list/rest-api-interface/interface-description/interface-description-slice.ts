import { DeviceFrame } from "@/models";
import { RestApiInterfaceSelection, RestApiAuthenticationMethod } from "@/models/product/rest-api-types";
import { createRestApiBasicSlice, RestApiBasicSlice } from "./rest-api-basic/rest-api-basic-slice";
import { createRestApiBearerSlice, RestApiBearerSlice } from "./rest-api-bearer/rest-api-bearer-slice";

export interface RestApiInterfaceDescriptionSlice extends RestApiBasicSlice, RestApiBearerSlice {
  updateRestApiInterfaceSelection: (selection: RestApiInterfaceSelection) => void;
  updateRestApiUri: (uri: string) => void;
  updateRestApiAuthenticationMethod: (method: RestApiAuthenticationMethod | undefined) => void;
  updateRestApiVerifyCertificate: (value: string | undefined) => void;
}

/**
 * Creates a REST API interface description slice for Device stores.
 */
export function createRestApiInterfaceDescriptionSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): RestApiInterfaceDescriptionSlice {
  const getRestApiInterfaceDescription = (state: TState) => {
    const interfaceList = state.device?.interfaceList;
    if (!interfaceList) return undefined;
    // Direct field access with 'in' operator instead of type guard
    return "restApiInterface" in interfaceList
      ? interfaceList.restApiInterface?.restApiInterfaceDescription
      : undefined;
  };

  // Create nested slices
  const restApiBasicSlice = createRestApiBasicSlice(set);
  const restApiBearerSlice = createRestApiBearerSlice(set);

  return {
    // Spread nested slice actions
    ...restApiBasicSlice,
    ...restApiBearerSlice,

    updateRestApiInterfaceSelection: (selection) =>
      set((state) => {
        const description = getRestApiInterfaceDescription(state);
        if (description) {
          description.restApiInterfaceSelection = selection;
        }
      }),

    updateRestApiUri: (uri) =>
      set((state) => {
        const description = getRestApiInterfaceDescription(state);
        if (description) {
          description.restApiUri = uri;
        }
      }),

    updateRestApiAuthenticationMethod: (method) =>
      set((state) => {
        const description = getRestApiInterfaceDescription(state);
        if (description) {
          description.restApiAuthenticationMethod = method;
          // Clear auth-specific fields when changing method
          if (method !== "BasicSecurityScheme") {
            description.restApiBasic = undefined;
          }
          if (method !== "BearerSecurityScheme") {
            description.restApiBearer = undefined;
          }
        }
      }),

    updateRestApiVerifyCertificate: (value) =>
      set((state) => {
        const description = getRestApiInterfaceDescription(state);
        if (description) {
          description.restApiVerifyCertificate = value || undefined;
        }
      }),
  };
}
