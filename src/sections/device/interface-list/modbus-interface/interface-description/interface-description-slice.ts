import { DeviceFrame } from "@/models";
import { ModbusInterfaceSelection, BitOrder } from "@/models/product/modbus-types";
import { createModbusTcpSlice, ModbusTcpSlice } from "./modbus-tcp/modbus-tcp-slice";
import { createModbusRtuSlice, ModbusRtuSlice } from "./modbus-rtu/modbus-rtu-slice";
import {
  createMasterFunctionsSupportedListSlice,
  MasterFunctionsSupportedListSlice,
} from "./master-functions-supported-list/master-functions-supported-list-slice";

export interface ModbusInterfaceDescriptionSlice
  extends ModbusTcpSlice,
    ModbusRtuSlice,
    MasterFunctionsSupportedListSlice {
  updateModbusInterfaceSelection: (selection: ModbusInterfaceSelection) => void;
  updateFirstRegisterAddressIsOne: (value: boolean) => void;
  updateBitOrder: (bitOrder: BitOrder) => void;
}

/**
 * Creates a modbus interface description slice for Device stores.
 */
export function createModbusInterfaceDescriptionSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusInterfaceDescriptionSlice {
  const getModbusInterfaceDescription = (state: TState) => {
    return state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription;
  };

  // Create nested slices
  const modbusTcpSlice = createModbusTcpSlice(set);
  const modbusRtuSlice = createModbusRtuSlice(set);
  const masterFunctionsSupportedListSlice = createMasterFunctionsSupportedListSlice(set);

  return {
    // Spread nested slice actions
    ...modbusTcpSlice,
    ...modbusRtuSlice,
    ...masterFunctionsSupportedListSlice,

    updateModbusInterfaceSelection: (selection) =>
      set((state) => {
        const description = getModbusInterfaceDescription(state);
        if (description) {
          description.modbusInterfaceSelection = selection;
        }
      }),

    updateFirstRegisterAddressIsOne: (value) =>
      set((state) => {
        const description = getModbusInterfaceDescription(state);
        if (description) {
          description.firstRegisterAddressIsOne = value;
        }
      }),

    updateBitOrder: (bitOrder) =>
      set((state) => {
        const description = getModbusInterfaceDescription(state);
        if (description) {
          description.bitOrder = bitOrder;
        }
      }),
  };
}
