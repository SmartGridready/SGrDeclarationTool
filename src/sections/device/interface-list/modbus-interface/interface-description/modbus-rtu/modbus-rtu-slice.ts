import { DeviceFrame } from "@/models";
import { ModbusRtu } from "@/models/product/modbus-types";
import { UnsignedIntParameter, SerialInterfaceCapability } from "@/models/generic";
import {
  createSerialInterfaceCapabilitySlice,
  SerialInterfaceCapabilitySlice,
} from "./serial-interface-capability/serial-interface-capability-slice";

export interface ModbusRtuSlice extends SerialInterfaceCapabilitySlice {
  addModbusRtu: () => void;
  removeModbusRtu: () => void;
  updateSlaveAddr: (slaveAddr: UnsignedIntParameter) => void;
  updatePortName: (portName: string) => void;
  updateBaudRateSelected: (baudRateSelected: string) => void;
  updateByteLenSelected: (byteLenSelected: string) => void;
  updateParitySelected: (paritySelected: string) => void;
  updateStopBitLenSelected: (stopBitLenSelected: string) => void;
  updateSerialInterfaceCapability: (capability: SerialInterfaceCapability) => void;
}

/**
 * Creates a modbus RTU slice for Device stores.
 */
export function createModbusRtuSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusRtuSlice {
  const getModbusRtu = (state: TState): ModbusRtu | undefined => {
    return state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription?.modbusRtu;
  };

  // Create serial interface capability slice
  const serialInterfaceCapabilitySlice = createSerialInterfaceCapabilitySlice(set);

  return {
    // Spread serial interface capability actions
    ...serialInterfaceCapabilitySlice,
    addModbusRtu: () =>
      set((state) => {
        const description =
          state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription;
        if (description && !description.modbusRtu) {
          description.modbusRtu = {
            slaveAddr: "",
            portName: "",
            baudRateSelected: "",
            byteLenSelected: "",
            paritySelected: "",
            stopBitLenSelected: "",
            serialInterfaceCapability: {
              baudRatesSupported: [],
              byteLenSupported: [],
              paritySupported: [],
              stopBitLenSupported: [],
            },
          };
        }
      }),

    removeModbusRtu: () =>
      set((state) => {
        const description =
          state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription;
        if (description) {
          description.modbusRtu = undefined;
        }
      }),

    updateSlaveAddr: (slaveAddr) =>
      set((state) => {
        const modbusRtu = getModbusRtu(state);
        if (modbusRtu) {
          modbusRtu.slaveAddr = slaveAddr;
        }
      }),

    updatePortName: (portName) =>
      set((state) => {
        const modbusRtu = getModbusRtu(state);
        if (modbusRtu) {
          modbusRtu.portName = portName;
        }
      }),

    updateBaudRateSelected: (baudRateSelected) =>
      set((state) => {
        const modbusRtu = getModbusRtu(state);
        if (modbusRtu) {
          modbusRtu.baudRateSelected = baudRateSelected;
        }
      }),

    updateByteLenSelected: (byteLenSelected) =>
      set((state) => {
        const modbusRtu = getModbusRtu(state);
        if (modbusRtu) {
          modbusRtu.byteLenSelected = byteLenSelected;
        }
      }),

    updateParitySelected: (paritySelected) =>
      set((state) => {
        const modbusRtu = getModbusRtu(state);
        if (modbusRtu) {
          modbusRtu.paritySelected = paritySelected;
        }
      }),

    updateStopBitLenSelected: (stopBitLenSelected) =>
      set((state) => {
        const modbusRtu = getModbusRtu(state);
        if (modbusRtu) {
          modbusRtu.stopBitLenSelected = stopBitLenSelected;
        }
      }),

    updateSerialInterfaceCapability: (capability) =>
      set((state) => {
        const modbusRtu = getModbusRtu(state);
        if (modbusRtu) {
          modbusRtu.serialInterfaceCapability = capability;
        }
      }),
  };
}
