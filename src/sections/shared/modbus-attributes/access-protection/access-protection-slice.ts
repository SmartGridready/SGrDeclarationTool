import { AccessProtectionEnabled, ModbusExceptionCode } from "@/models/product/modbus-types";

export interface AccessProtectionSlice {
  addAccessProtection: () => void;
  removeAccessProtection: () => void;
  updateIsEnabled: (isEnabled: boolean) => void;
  addModbusExceptionCode: (exceptionCode: ModbusExceptionCode) => void;
  removeModbusExceptionCode: (index: number) => void;
  updateModbusExceptionCode: (index: number, exceptionCode: ModbusExceptionCode) => void;
}

/**
 * Creates a generic access protection slice that works with any store state
 * @param set - The Zustand set function
 * @param getModbusInterface - Function to get modbus interface-like object with modbusAttributes from the store state
 */
export function createAccessProtectionSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getModbusInterface: (
    state: TState
  ) => { modbusAttributes?: { accessProtection?: AccessProtectionEnabled } } | undefined
): AccessProtectionSlice {
  const getAccessProtection = (state: TState): AccessProtectionEnabled | undefined => {
    return getModbusInterface(state)?.modbusAttributes?.accessProtection;
  };

  return {
    addAccessProtection: () =>
      set((state) => {
        const modbusInterface = getModbusInterface(state);
        if (modbusInterface) {
          if (!modbusInterface.modbusAttributes) {
            modbusInterface.modbusAttributes = {};
          }
          if (!modbusInterface.modbusAttributes.accessProtection) {
            // minOccurs="1" requires at least one exception code
            modbusInterface.modbusAttributes.accessProtection = {
              modbusExceptionCode: ["IllegalFunction"], // Default to first available code
              isEnabled: false,
            };
          }
        }
      }),

    removeAccessProtection: () =>
      set((state) => {
        const modbusInterface = getModbusInterface(state);
        if (modbusInterface?.modbusAttributes) {
          modbusInterface.modbusAttributes.accessProtection = undefined;
        }
      }),

    updateIsEnabled: (isEnabled) =>
      set((state) => {
        const accessProtection = getAccessProtection(state);
        if (accessProtection) {
          accessProtection.isEnabled = isEnabled;
        }
      }),

    addModbusExceptionCode: (exceptionCode) =>
      set((state) => {
        const accessProtection = getAccessProtection(state);
        if (accessProtection) {
          if (!accessProtection.modbusExceptionCode) {
            accessProtection.modbusExceptionCode = [];
          }
          if (!accessProtection.modbusExceptionCode.includes(exceptionCode)) {
            accessProtection.modbusExceptionCode.push(exceptionCode);
          }
        }
      }),

    removeModbusExceptionCode: (index) =>
      set((state) => {
        const accessProtection = getAccessProtection(state);
        const modbusInterface = getModbusInterface(state);
        if (accessProtection?.modbusExceptionCode) {
          accessProtection.modbusExceptionCode.splice(index, 1);
          if (accessProtection.modbusExceptionCode.length === 0 && modbusInterface?.modbusAttributes) {
            modbusInterface.modbusAttributes.accessProtection = undefined;
          }
        }
      }),

    updateModbusExceptionCode: (index, exceptionCode) =>
      set((state) => {
        const accessProtection = getAccessProtection(state);
        if (accessProtection?.modbusExceptionCode && accessProtection.modbusExceptionCode[index] !== undefined) {
          accessProtection.modbusExceptionCode[index] = exceptionCode;
        }
      }),
  };
}
