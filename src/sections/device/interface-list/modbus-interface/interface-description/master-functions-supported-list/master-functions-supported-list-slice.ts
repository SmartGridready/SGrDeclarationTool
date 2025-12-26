import { DeviceFrame } from "@/models";
import {
  MasterFunctionsSupported,
  MasterFunctionsSupportedList,
} from "@/models/product/modbus-types";

export interface MasterFunctionsSupportedListSlice {
  addMasterFunctionsSupportedList: () => void;
  removeMasterFunctionsSupportedList: () => void;
  addMasterFunctionSupported: (functionSupported: MasterFunctionsSupported) => void;
  removeMasterFunctionSupported: (index: number) => void;
  updateMasterFunctionSupported: (
    index: number,
    functionSupported: MasterFunctionsSupported
  ) => void;
}

/**
 * Creates a master functions supported list slice for Device stores.
 */
export function createMasterFunctionsSupportedListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): MasterFunctionsSupportedListSlice {
  const getMasterFunctionsSupportedList = (
    state: TState
  ): MasterFunctionsSupportedList | undefined => {
    return state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription
      ?.masterFunctionsSupportedList;
  };

  return {
    addMasterFunctionsSupportedList: () =>
      set((state) => {
        const description =
          state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription;
        if (description && !description.masterFunctionsSupportedList) {
          description.masterFunctionsSupportedList = {
            masterFunctionsSupported: [],
          };
        }
      }),

    removeMasterFunctionsSupportedList: () =>
      set((state) => {
        const description =
          state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription;
        if (description) {
          description.masterFunctionsSupportedList = undefined;
        }
      }),

    addMasterFunctionSupported: (functionSupported) =>
      set((state) => {
        const list = getMasterFunctionsSupportedList(state);
        if (list) {
          if (!list.masterFunctionsSupported) {
            list.masterFunctionsSupported = [];
          }
          list.masterFunctionsSupported.push(functionSupported);
        }
      }),

    removeMasterFunctionSupported: (index) =>
      set((state) => {
        const list = getMasterFunctionsSupportedList(state);
        if (list?.masterFunctionsSupported) {
          list.masterFunctionsSupported.splice(index, 1);
          if (list.masterFunctionsSupported.length === 0) {
            const description =
              state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription;
            if (description) {
              description.masterFunctionsSupportedList = undefined;
            }
          }
        }
      }),

    updateMasterFunctionSupported: (index, functionSupported) =>
      set((state) => {
        const list = getMasterFunctionsSupportedList(state);
        if (list?.masterFunctionsSupported && list.masterFunctionsSupported[index] !== undefined) {
          list.masterFunctionsSupported[index] = functionSupported;
        }
      }),
  };
}
