import { DeviceFrame } from "@/models";
import {
  BaudRate,
  ByteLength,
  Parity,
  StopBitLength,
  SerialInterfaceCapability,
} from "@/models/generic";

export interface SerialInterfaceCapabilitySlice {
  addBaudRateSupported: (baudRate: BaudRate) => void;
  removeBaudRateSupported: (index: number) => void;
  addByteLenSupported: (byteLen: ByteLength) => void;
  removeByteLenSupported: (index: number) => void;
  addParitySupported: (parity: Parity) => void;
  removeParitySupported: (index: number) => void;
  addStopBitLenSupported: (stopBitLen: StopBitLength) => void;
  removeStopBitLenSupported: (index: number) => void;
}

/**
 * Creates a serial interface capability slice for Device stores.
 */
export function createSerialInterfaceCapabilitySlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): SerialInterfaceCapabilitySlice {
  const getSerialInterfaceCapability = (state: TState): SerialInterfaceCapability | undefined => {
    return state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription?.modbusRtu
      ?.serialInterfaceCapability;
  };

  return {
    addBaudRateSupported: (baudRate) =>
      set((state) => {
        const capability = getSerialInterfaceCapability(state);
        if (capability) {
          if (!capability.baudRatesSupported) {
            capability.baudRatesSupported = [];
          }
          if (!capability.baudRatesSupported.includes(baudRate)) {
            capability.baudRatesSupported.push(baudRate);
          }
        }
      }),

    removeBaudRateSupported: (index) =>
      set((state) => {
        const capability = getSerialInterfaceCapability(state);
        if (capability?.baudRatesSupported) {
          capability.baudRatesSupported.splice(index, 1);
        }
      }),

    addByteLenSupported: (byteLen) =>
      set((state) => {
        const capability = getSerialInterfaceCapability(state);
        if (capability) {
          if (!capability.byteLenSupported) {
            capability.byteLenSupported = [];
          }
          if (!capability.byteLenSupported.includes(byteLen)) {
            capability.byteLenSupported.push(byteLen);
          }
        }
      }),

    removeByteLenSupported: (index) =>
      set((state) => {
        const capability = getSerialInterfaceCapability(state);
        if (capability?.byteLenSupported) {
          capability.byteLenSupported.splice(index, 1);
        }
      }),

    addParitySupported: (parity) =>
      set((state) => {
        const capability = getSerialInterfaceCapability(state);
        if (capability) {
          if (!capability.paritySupported) {
            capability.paritySupported = [];
          }
          if (!capability.paritySupported.includes(parity)) {
            capability.paritySupported.push(parity);
          }
        }
      }),

    removeParitySupported: (index) =>
      set((state) => {
        const capability = getSerialInterfaceCapability(state);
        if (capability?.paritySupported) {
          capability.paritySupported.splice(index, 1);
        }
      }),

    addStopBitLenSupported: (stopBitLen) =>
      set((state) => {
        const capability = getSerialInterfaceCapability(state);
        if (capability) {
          if (!capability.stopBitLenSupported) {
            capability.stopBitLenSupported = [];
          }
          if (!capability.stopBitLenSupported.includes(stopBitLen)) {
            capability.stopBitLenSupported.push(stopBitLen);
          }
        }
      }),

    removeStopBitLenSupported: (index) =>
      set((state) => {
        const capability = getSerialInterfaceCapability(state);
        if (capability?.stopBitLenSupported) {
          capability.stopBitLenSupported.splice(index, 1);
        }
      }),
  };
}
