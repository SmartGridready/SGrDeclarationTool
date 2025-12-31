import { DeviceFrame, InterfaceList } from "@/models";
import {
  GenericFunctionalProfile,
  GenericFunctionalProfileList,
  GenericInterface,
} from "@/models/product/generic-interface";
import { createEmptyGenericFunctionalProfile } from "@/utils/factory-utils";
import {
  createFunctionalProfileBaseSlice,
  FunctionalProfileBaseSlice,
} from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import {
  createGenericDataPointListSlice,
  GenericDataPointListSlice,
} from "./data-point-list/generic-data-point-list-slice";

/**
 * Type guard to check if interface list is Generic interface
 */
function isGenericInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { genericInterface: GenericInterface } {
  return interfaceList !== undefined && "genericInterface" in interfaceList;
}

export interface GenericFunctionalProfileListSlice {
  // Functional profile list management
  addEmptyGenericFunctionalProfile: () => void;
  removeGenericFunctionalProfile: (index: number) => void;
  removeAllGenericFunctionalProfiles: () => void;

  // Get slice for a specific functional profile
  getGenericFunctionalProfileSlice: (index: number) => FunctionalProfileBaseSlice;

  // Get data point list slice for a specific functional profile
  getGenericDataPointListSlice: (index: number) => GenericDataPointListSlice;
}

/**
 * Creates a Generic functional profile list slice for Device stores.
 */
export function createGenericFunctionalProfileListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): GenericFunctionalProfileListSlice {
  // Helper to get functional profile list
  const getFunctionalProfileList = (state: TState): GenericFunctionalProfileList | undefined => {
    const interfaceList = state.device?.interfaceList;
    return isGenericInterface(interfaceList) ? interfaceList.genericInterface.functionalProfileList : undefined;
  };

  // Helper to get a specific functional profile
  const getFunctionalProfile = (state: TState, index: number): GenericFunctionalProfile | undefined =>
    getFunctionalProfileList(state)?.functionalProfileListElement?.[index];

  return {
    addEmptyGenericFunctionalProfile: () =>
      set((state) => {
        const interfaceList = state.device?.interfaceList;
        if (isGenericInterface(interfaceList)) {
          const genericInterface = interfaceList.genericInterface;
          // Ensure functionalProfileList exists
          if (!genericInterface.functionalProfileList) {
            genericInterface.functionalProfileList = {
              functionalProfileListElement: [],
            };
          }
          genericInterface.functionalProfileList.functionalProfileListElement.push(
            createEmptyGenericFunctionalProfile()
          );
        }
      }),

    removeGenericFunctionalProfile: (index) =>
      set((state) => {
        const list = getFunctionalProfileList(state);
        if (list && list.functionalProfileListElement.length > index) {
          list.functionalProfileListElement.splice(index, 1);
        }
      }),

    removeAllGenericFunctionalProfiles: () =>
      set((state) => {
        const list = getFunctionalProfileList(state);
        if (list) {
          list.functionalProfileListElement = [];
        }
      }),

    getGenericFunctionalProfileSlice: (index: number): FunctionalProfileBaseSlice => {
      return createFunctionalProfileBaseSlice(set, (state) => {
        // Return the actual GenericFunctionalProfile object, not a copy
        // This allows the slice to modify genericAttributeList directly
        return getFunctionalProfile(state, index);
      });
    },

    getGenericDataPointListSlice: (index: number): GenericDataPointListSlice => {
      return createGenericDataPointListSlice(set, (state) => getFunctionalProfile(state, index), index);
    },
  };
}
