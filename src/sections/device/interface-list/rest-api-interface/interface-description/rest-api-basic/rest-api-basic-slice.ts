import { DeviceFrame, InterfaceList } from "@/models";
import { RestApiInterface } from "@/models/product/rest-api-interface";

export interface RestApiBasicSlice {
  addRestApiBasic: () => void;
  removeRestApiBasic: () => void;
  updateRestBasicUsername: (username: string) => void;
  updateRestBasicPassword: (password: string) => void;
}

/**
 * Creates a REST API basic authentication slice for Device stores.
 */
export function createRestApiBasicSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): RestApiBasicSlice {
  const getRestApiInterfaceDescription = (state: TState) => {
    const interfaceList = state.device?.interfaceList;
    if (!interfaceList) return undefined;
    // Direct field access with 'in' operator instead of type guard
    return "restApiInterface" in interfaceList
      ? interfaceList.restApiInterface?.restApiInterfaceDescription
      : undefined;
  };

  return {
    addRestApiBasic: () =>
      set((state) => {
        const description = getRestApiInterfaceDescription(state);
        if (description && !description.restApiBasic) {
          description.restApiBasic = {
            restBasicUsername: "",
            restBasicPassword: "",
          };
        }
      }),

    removeRestApiBasic: () =>
      set((state) => {
        const description = getRestApiInterfaceDescription(state);
        if (description) {
          description.restApiBasic = undefined;
        }
      }),

    updateRestBasicUsername: (username) =>
      set((state) => {
        const description = getRestApiInterfaceDescription(state);
        if (description?.restApiBasic) {
          description.restApiBasic.restBasicUsername = username;
        }
      }),

    updateRestBasicPassword: (password) =>
      set((state) => {
        const description = getRestApiInterfaceDescription(state);
        if (description?.restApiBasic) {
          description.restApiBasic.restBasicPassword = password;
        }
      }),
  };
}
