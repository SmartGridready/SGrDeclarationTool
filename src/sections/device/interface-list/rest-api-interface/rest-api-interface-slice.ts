import { DeviceFrame } from "@/models";
import {
  createRestApiFunctionalProfileListSlice,
  RestApiFunctionalProfileListSlice,
} from "./functional-profile-list/rest-api-functional-profile-list-slice";
import {
  createRestApiInterfaceDescriptionSlice,
  RestApiInterfaceDescriptionSlice,
} from "./interface-description/interface-description-slice";

export interface RestApiInterfaceSlice extends RestApiFunctionalProfileListSlice, RestApiInterfaceDescriptionSlice {}

/**
 * Creates a REST API interface slice for Device stores.
 */
export function createRestApiInterfaceSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): RestApiInterfaceSlice {
  const functionalProfileListSlice = createRestApiFunctionalProfileListSlice(set);
  const interfaceDescriptionSlice = createRestApiInterfaceDescriptionSlice(set);

  return {
    ...functionalProfileListSlice,
    ...interfaceDescriptionSlice,
  };
}
