import { DeviceFrame } from "@/models";
import {
  createContactFunctionalProfileListSlice,
  ContactFunctionalProfileListSlice,
} from "./functional-profile-list/contact-functional-profile-list-slice";
import {
  createContactInterfaceDescriptionSlice,
  ContactInterfaceDescriptionSlice,
} from "./interface-description/interface-description-slice";

export interface ContactInterfaceSlice
  extends ContactFunctionalProfileListSlice,
    ContactInterfaceDescriptionSlice {}

/**
 * Creates a Contact interface slice for Device stores.
 */
export function createContactInterfaceSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ContactInterfaceSlice {
  const functionalProfileListSlice = createContactFunctionalProfileListSlice(set);
  const interfaceDescriptionSlice = createContactInterfaceDescriptionSlice(set);

  return {
    ...functionalProfileListSlice,
    ...interfaceDescriptionSlice,
  };
}
