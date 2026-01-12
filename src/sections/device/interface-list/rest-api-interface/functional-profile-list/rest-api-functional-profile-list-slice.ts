import { DeviceFrame } from "@/models";
import { RestApiFunctionalProfile, RestApiFunctionalProfileList } from "@/models/product/rest-api-interface";
import { createEmptyRestApiFunctionalProfile } from "@/utils/factory-utils";
import {
  createFunctionalProfileBaseSlice,
  FunctionalProfileBaseSlice,
} from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import {
  createRestApiDataPointListSlice,
  RestApiDataPointListSlice,
} from "./data-point-list/rest-api-data-point-list-slice";

export interface RestApiFunctionalProfileListSlice {
  // Functional profile list management
  addEmptyRestApiFunctionalProfile: () => void;
  removeRestApiFunctionalProfile: (index: number) => void;
  removeAllRestApiFunctionalProfiles: () => void;

  // Get slice for a specific functional profile
  getRestApiFunctionalProfileSlice: (index: number) => FunctionalProfileBaseSlice;

  // Get data point list slice for a specific functional profile
  getRestApiDataPointListSlice: (index: number) => RestApiDataPointListSlice;
}

/**
 * Creates a REST API functional profile list slice for Device stores.
 */
export function createRestApiFunctionalProfileListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): RestApiFunctionalProfileListSlice {
  // Helper to get functional profile list
  const getFunctionalProfileList = (state: TState): RestApiFunctionalProfileList | undefined => {
    const interfaceList = state.device?.interfaceList;
    if (!interfaceList || !("restApiInterface" in interfaceList) || !interfaceList.restApiInterface) return undefined;
    // Direct field access with 'in' operator instead of type guard
    return interfaceList.restApiInterface.functionalProfileList;
  };

  // Helper to get a specific functional profile
  const getFunctionalProfile = (state: TState, index: number): RestApiFunctionalProfile | undefined =>
    getFunctionalProfileList(state)?.functionalProfileListElement?.[index];

  return {
    addEmptyRestApiFunctionalProfile: () =>
      set((state) => {
        const interfaceList = state.device?.interfaceList;
        if (interfaceList && "restApiInterface" in interfaceList && interfaceList.restApiInterface) {
          const restApiInterface = interfaceList.restApiInterface;
          // Ensure functionalProfileList exists
          if (!restApiInterface.functionalProfileList) {
            restApiInterface.functionalProfileList = {
              functionalProfileListElement: [],
            };
          }
          restApiInterface.functionalProfileList.functionalProfileListElement.push(
            createEmptyRestApiFunctionalProfile()
          );
        }
      }),

    removeRestApiFunctionalProfile: (index) =>
      set((state) => {
        const list = getFunctionalProfileList(state);
        if (list && list.functionalProfileListElement.length > index) {
          list.functionalProfileListElement.splice(index, 1);
        }
      }),

    removeAllRestApiFunctionalProfiles: () =>
      set((state) => {
        const list = getFunctionalProfileList(state);
        if (list) {
          list.functionalProfileListElement = [];
        }
      }),

    getRestApiFunctionalProfileSlice: (index: number): FunctionalProfileBaseSlice => {
      return createFunctionalProfileBaseSlice(set, (state) => {
        // Return the actual RestApiFunctionalProfile object, not a copy
        // This allows the slice to modify genericAttributeList directly
        return getFunctionalProfile(state, index);
      });
    },

    getRestApiDataPointListSlice: (index: number): RestApiDataPointListSlice => {
      return createRestApiDataPointListSlice(set, (state) => getFunctionalProfile(state, index), index);
    },
  };
}
