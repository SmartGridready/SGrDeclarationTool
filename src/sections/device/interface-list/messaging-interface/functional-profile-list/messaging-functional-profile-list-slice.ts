import { DeviceFrame } from "@/models";
import { MessagingFunctionalProfile, MessagingFunctionalProfileList } from "@/models/product/messaging-interface";
import { createEmptyMessagingFunctionalProfile } from "@/utils/factory-utils";
import {
  createFunctionalProfileBaseSlice,
  FunctionalProfileBaseSlice,
} from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import {
  createMessagingDataPointListSlice,
  MessagingDataPointListSlice,
} from "./data-point-list/messaging-data-point-list-slice";

export interface MessagingFunctionalProfileListSlice {
  // Functional profile list management
  addEmptyMessagingFunctionalProfile: () => void;
  removeMessagingFunctionalProfile: (index: number) => void;
  removeAllMessagingFunctionalProfiles: () => void;

  // Get slice for a specific functional profile
  getMessagingFunctionalProfileSlice: (index: number) => FunctionalProfileBaseSlice;

  // Get data point list slice for a specific functional profile
  getMessagingDataPointListSlice: (index: number) => MessagingDataPointListSlice;
}

/**
 * Creates a Messaging functional profile list slice for Device stores.
 */
export function createMessagingFunctionalProfileListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): MessagingFunctionalProfileListSlice {
  // Helper to get functional profile list
  const getFunctionalProfileList = (state: TState): MessagingFunctionalProfileList | undefined => {
    const interfaceList = state.device?.interfaceList;
    if (!interfaceList) return undefined;
    // Direct field access with 'in' operator instead of type guard
    return "messagingInterface" in interfaceList ? interfaceList.messagingInterface?.functionalProfileList : undefined;
  };

  // Helper to get a specific functional profile
  const getFunctionalProfile = (state: TState, index: number): MessagingFunctionalProfile | undefined =>
    getFunctionalProfileList(state)?.functionalProfileListElement?.[index];

  return {
    addEmptyMessagingFunctionalProfile: () =>
      set((state) => {
        const interfaceList = state.device?.interfaceList;
        if (interfaceList && "messagingInterface" in interfaceList) {
          const messagingInterface = interfaceList.messagingInterface;
          if (!messagingInterface) return;
          // Ensure functionalProfileList exists
          if (!messagingInterface.functionalProfileList) {
            messagingInterface.functionalProfileList = {
              functionalProfileListElement: [],
            };
          }
          messagingInterface.functionalProfileList.functionalProfileListElement.push(
            createEmptyMessagingFunctionalProfile()
          );
        }
      }),

    removeMessagingFunctionalProfile: (index) =>
      set((state) => {
        const list = getFunctionalProfileList(state);
        if (list && list.functionalProfileListElement.length > index) {
          list.functionalProfileListElement.splice(index, 1);
        }
      }),

    removeAllMessagingFunctionalProfiles: () =>
      set((state) => {
        const list = getFunctionalProfileList(state);
        if (list) {
          list.functionalProfileListElement = [];
        }
      }),

    getMessagingFunctionalProfileSlice: (index: number): FunctionalProfileBaseSlice => {
      return createFunctionalProfileBaseSlice(set, (state) => {
        // Return the actual MessagingFunctionalProfile object, not a copy
        // This allows the slice to modify genericAttributeList directly
        return getFunctionalProfile(state, index);
      });
    },

    getMessagingDataPointListSlice: (index: number): MessagingDataPointListSlice => {
      return createMessagingDataPointListSlice(set, (state) => getFunctionalProfile(state, index), index);
    },
  };
}
