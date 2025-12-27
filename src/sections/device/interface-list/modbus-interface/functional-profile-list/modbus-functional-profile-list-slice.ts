import { DeviceFrame } from "@/models";
import {
  ModbusFunctionalProfile,
  ModbusFunctionalProfileList,
} from "@/models/product/modbus-interface";
import {
  createFunctionalProfileBaseSlice,
  FunctionalProfileBaseSlice,
} from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import {
  createModbusDataPointListSlice,
  ModbusDataPointListSlice,
} from "./data-point-list/modbus-data-point-list-slice";

export interface ModbusFunctionalProfileListSlice {
  // Functional profile list management
  addEmptyFunctionalProfile: () => void;
  removeFunctionalProfile: (index: number) => void;
  removeAllFunctionalProfiles: () => void;

  // Get slice for a specific functional profile
  getFunctionalProfileSlice: (index: number) => FunctionalProfileBaseSlice;

  // Get data point list slice for a specific functional profile
  getDataPointListSlice: (index: number) => ModbusDataPointListSlice;
}

/**
 * Creates a new empty ModbusFunctionalProfile
 */
function createEmptyModbusFunctionalProfile(): ModbusFunctionalProfile {
  return {
    functionalProfile: {
      functionalProfileName: "",
      functionalProfileIdentification: {
        specificationOwnerIdentification: "",
        functionalProfileCategory: "Battery",
        functionalProfileType: "",
        levelOfOperation: "1",
        versionNumber: {
          primaryVersionNumber: 0,
          secondaryVersionNumber: 0,
          subReleaseVersionNumber: 0,
        },
      },
    },
    dataPointList: {
      dataPointListElement: [],
    },
  };
}

/**
 * Creates a modbus functional profile list slice for Device stores.
 */
export function createModbusFunctionalProfileListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusFunctionalProfileListSlice {
  // Helper to get functional profile list
  const getFunctionalProfileList = (state: TState): ModbusFunctionalProfileList | undefined =>
    state.device?.interfaceList?.modbusInterface?.functionalProfileList;

  // Helper to get a specific functional profile
  const getFunctionalProfile = (
    state: TState,
    index: number
  ): ModbusFunctionalProfile | undefined =>
    getFunctionalProfileList(state)?.functionalProfileListElement?.[index];

  // Cache for functional profile slices
  const functionalProfileSliceCache = new Map<number, FunctionalProfileBaseSlice>();

  // Cache for data point list slices
  const dataPointListSliceCache = new Map<number, ModbusDataPointListSlice>();

  return {
    addEmptyFunctionalProfile: () =>
      set((state) => {
        const modbusInterface = state.device?.interfaceList?.modbusInterface;
        if (modbusInterface) {
          // Ensure functionalProfileList exists
          if (!modbusInterface.functionalProfileList) {
            modbusInterface.functionalProfileList = {
              functionalProfileListElement: [],
            };
          }
          modbusInterface.functionalProfileList.functionalProfileListElement.push(
            createEmptyModbusFunctionalProfile()
          );
        }
      }),

    removeFunctionalProfile: (index) =>
      set((state) => {
        const list = getFunctionalProfileList(state);
        if (list && list.functionalProfileListElement.length > index) {
          list.functionalProfileListElement.splice(index, 1);
          // Clear cache for removed and subsequent indices
          functionalProfileSliceCache.delete(index);
          dataPointListSliceCache.delete(index);
        }
      }),

    removeAllFunctionalProfiles: () =>
      set((state) => {
        const list = getFunctionalProfileList(state);
        if (list) {
          list.functionalProfileListElement = [];
          functionalProfileSliceCache.clear();
          dataPointListSliceCache.clear();
        }
      }),

    getFunctionalProfileSlice: (index: number): FunctionalProfileBaseSlice => {
      // Create slice on demand and cache it
      if (!functionalProfileSliceCache.has(index)) {
        const slice = createFunctionalProfileBaseSlice(set, (state) => {
          // Return the actual ModbusFunctionalProfile object, not a copy
          // This allows the slice to modify genericAttributeList directly
          return getFunctionalProfile(state, index);
        });
        functionalProfileSliceCache.set(index, slice);
      }
      return functionalProfileSliceCache.get(index)!;
    },

    getDataPointListSlice: (index: number): ModbusDataPointListSlice => {
      // Create slice on demand and cache it
      if (!dataPointListSliceCache.has(index)) {
        const slice = createModbusDataPointListSlice(set, (state) =>
          getFunctionalProfile(state, index)
        );
        dataPointListSliceCache.set(index, slice);
      }
      return dataPointListSliceCache.get(index)!;
    },
  };
}
