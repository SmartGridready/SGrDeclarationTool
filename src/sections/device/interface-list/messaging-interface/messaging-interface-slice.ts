import { DeviceFrame } from "@/models";
import {
  createMessagingFunctionalProfileListSlice,
  MessagingFunctionalProfileListSlice,
} from "./functional-profile-list/messaging-functional-profile-list-slice";
import {
  createMessagingInterfaceDescriptionSlice,
  MessagingInterfaceDescriptionSlice,
} from "./interface-description/interface-description-slice";

export interface MessagingInterfaceSlice
  extends MessagingFunctionalProfileListSlice,
    MessagingInterfaceDescriptionSlice {}

/**
 * Creates a Messaging interface slice for Device stores.
 */
export function createMessagingInterfaceSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): MessagingInterfaceSlice {
  const functionalProfileListSlice = createMessagingFunctionalProfileListSlice(set);
  const interfaceDescriptionSlice = createMessagingInterfaceDescriptionSlice(set);

  return {
    ...functionalProfileListSlice,
    ...interfaceDescriptionSlice,
  };
}
