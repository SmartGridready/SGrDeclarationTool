import { DeviceFrame } from "@/models";
import {
  createRestApiFunctionalProfileListSlice,
  RestApiFunctionalProfileListSlice,
} from "./functional-profile-list/rest-api-functional-profile-list-slice";

export type RestApiInterfaceSlice = RestApiFunctionalProfileListSlice;

/**
 * Creates a REST API interface slice for Device stores.
 */
export function createRestApiInterfaceSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): RestApiInterfaceSlice {
  const functionalProfileListSlice = createRestApiFunctionalProfileListSlice(set);

  return {
    ...functionalProfileListSlice,
  };
}
