import { DeviceFrame } from "@/models";
import {
  ModbusFunctionalProfile,
  ModbusFunctionalProfileList,
} from "@/models/product/modbus-interface";
import { createEmptyModbusFunctionalProfile } from "@/utils/factory-utils";
import {
  createFunctionalProfileBaseSlice,
  FunctionalProfileBaseSlice,
} from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import {
  createModbusDataPointListSlice,
  ModbusDataPointListSlice,
} from "./data-point-list/modbus-data-point-list-slice";
import {
  createModbusAttributesSlice,
  ModbusAttributesSlice,
} from "./modbus-attributes/modbus-attributes-slice";

export interface ModbusFunctionalProfileListSlice {
  // Functional profile list management
  addEmptyFunctionalProfile: () => void;
  removeFunctionalProfile: (index: number) => void;
  removeAllFunctionalProfiles: () => void;

  // Get slice for a specific functional profile
  getFunctionalProfileSlice: (index: number) => FunctionalProfileBaseSlice;

  // Get data point list slice for a specific functional profile
  getModbusDataPointListSlice: (index: number) => ModbusDataPointListSlice;

  // Get modbus attributes slice for a specific functional profile
  getModbusAttributesSlice: (index: number) => ModbusAttributesSlice;
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
        }
      }),

    removeAllFunctionalProfiles: () =>
      set((state) => {
        const list = getFunctionalProfileList(state);
        if (list) {
          list.functionalProfileListElement = [];
        }
      }),

    getFunctionalProfileSlice: (index: number): FunctionalProfileBaseSlice => {
      return createFunctionalProfileBaseSlice(set, (state) => {
        // Return the actual ModbusFunctionalProfile object, not a copy
        // This allows the slice to modify genericAttributeList directly
        return getFunctionalProfile(state, index);
      });
    },

    getModbusDataPointListSlice: (index: number): ModbusDataPointListSlice => {
      return createModbusDataPointListSlice(
        set,
        (state) => getFunctionalProfile(state, index),
        index
      );
    },

    getModbusAttributesSlice: (index: number): ModbusAttributesSlice => {
      return createModbusAttributesSlice(set, (state) => getFunctionalProfile(state, index));
    },
  };
}
