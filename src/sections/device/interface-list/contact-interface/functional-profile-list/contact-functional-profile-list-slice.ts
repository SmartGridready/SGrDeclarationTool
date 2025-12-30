import { DeviceFrame, InterfaceList } from "@/models";
import {
  ContactFunctionalProfile,
  ContactFunctionalProfileList,
  ContactInterface,
} from "@/models/product/contact-interface";
import { createEmptyContactFunctionalProfile } from "@/utils/factory-utils";
import {
  createFunctionalProfileBaseSlice,
  FunctionalProfileBaseSlice,
} from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import {
  createContactDataPointListSlice,
  ContactDataPointListSlice,
} from "./data-point-list/contact-data-point-list-slice";

/**
 * Type guard to check if interface list is Contact interface
 */
function isContactInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { contactInterface: ContactInterface } {
  return interfaceList !== undefined && "contactInterface" in interfaceList;
}

export interface ContactFunctionalProfileListSlice {
  // Functional profile list management
  addEmptyContactFunctionalProfile: () => void;
  removeContactFunctionalProfile: (index: number) => void;
  removeAllContactFunctionalProfiles: () => void;

  // Get slice for a specific functional profile
  getContactFunctionalProfileSlice: (index: number) => FunctionalProfileBaseSlice;

  // Get data point list slice for a specific functional profile
  getContactDataPointListSlice: (index: number) => ContactDataPointListSlice;
}

/**
 * Creates a Contact functional profile list slice for Device stores.
 */
export function createContactFunctionalProfileListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ContactFunctionalProfileListSlice {
  // Helper to get functional profile list
  const getFunctionalProfileList = (state: TState): ContactFunctionalProfileList | undefined => {
    const interfaceList = state.device?.interfaceList;
    return isContactInterface(interfaceList)
      ? interfaceList.contactInterface.functionalProfileList
      : undefined;
  };

  // Helper to get a specific functional profile
  const getFunctionalProfile = (
    state: TState,
    index: number
  ): ContactFunctionalProfile | undefined =>
    getFunctionalProfileList(state)?.functionalProfileListElement?.[index];

  return {
    addEmptyContactFunctionalProfile: () =>
      set((state) => {
        const interfaceList = state.device?.interfaceList;
        if (isContactInterface(interfaceList)) {
          const contactInterface = interfaceList.contactInterface;
          // Ensure functionalProfileList exists
          if (!contactInterface.functionalProfileList) {
            contactInterface.functionalProfileList = {
              functionalProfileListElement: [],
            };
          }
          contactInterface.functionalProfileList.functionalProfileListElement.push(
            createEmptyContactFunctionalProfile()
          );
        }
      }),

    removeContactFunctionalProfile: (index) =>
      set((state) => {
        const list = getFunctionalProfileList(state);
        if (list && list.functionalProfileListElement.length > index) {
          list.functionalProfileListElement.splice(index, 1);
        }
      }),

    removeAllContactFunctionalProfiles: () =>
      set((state) => {
        const list = getFunctionalProfileList(state);
        if (list) {
          list.functionalProfileListElement = [];
        }
      }),

    getContactFunctionalProfileSlice: (index: number): FunctionalProfileBaseSlice => {
      return createFunctionalProfileBaseSlice(set, (state) => {
        // Return the actual ContactFunctionalProfile object, not a copy
        // This allows the slice to modify genericAttributeList directly
        return getFunctionalProfile(state, index);
      });
    },

    getContactDataPointListSlice: (index: number): ContactDataPointListSlice => {
      return createContactDataPointListSlice(
        set,
        (state) => getFunctionalProfile(state, index),
        index
      );
    },
  };
}
