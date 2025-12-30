import { DeviceFrame } from "@/models";
import {
  createMessagingFunctionalProfileListSlice,
  MessagingFunctionalProfileListSlice,
} from "./functional-profile-list/messaging-functional-profile-list-slice";

export type MessagingInterfaceSlice = MessagingFunctionalProfileListSlice;

/**
 * Creates a Messaging interface slice for Device stores.
 */
export function createMessagingInterfaceSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): MessagingInterfaceSlice {
  const functionalProfileListSlice = createMessagingFunctionalProfileListSlice(set);

  return {
    ...functionalProfileListSlice,
  };
}
