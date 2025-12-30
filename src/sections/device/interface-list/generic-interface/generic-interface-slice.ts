import { DeviceFrame } from "@/models";
import {
  createGenericFunctionalProfileListSlice,
  GenericFunctionalProfileListSlice,
} from "./functional-profile-list/generic-functional-profile-list-slice";

export type GenericInterfaceSlice = GenericFunctionalProfileListSlice;

/**
 * Creates a Generic interface slice for Device stores.
 */
export function createGenericInterfaceSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): GenericInterfaceSlice {
  const functionalProfileListSlice = createGenericFunctionalProfileListSlice(set);

  return {
    ...functionalProfileListSlice,
  };
}
