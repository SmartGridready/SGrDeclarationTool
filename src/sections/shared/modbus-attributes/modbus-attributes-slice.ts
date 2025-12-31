import { ModbusAttributes, ModbusLayer6Deviation } from "@/models/product/modbus-types";
import { createScalingFactorSlice, ScalingFactorSlice } from "./scaling-factor/scaling-factor-slice";
import { createAccessProtectionSlice, AccessProtectionSlice } from "./access-protection/access-protection-slice";

export interface ModbusAttributesSlice extends ScalingFactorSlice, AccessProtectionSlice {
  addModbusAttributes: () => void;
  removeModbusAttributes: () => void;
  updateStepByIncrement: (stepByIncrement: number | undefined) => void;
  updateSunssf: (sunssf: number | undefined) => void;
  updatePollingLatencyMs: (pollingLatencyMs: number | undefined) => void;
  updateLayer6Deviation: (layer6Deviation: ModbusLayer6Deviation | undefined) => void;
}

/**
 * Creates a generic modbus attributes slice that works with any store state
 * @param set - The Zustand set function
 * @param getModbusAttributes - Function to get modbusAttributes from the store state
 * @param setModbusAttributes - Function to set modbusAttributes in the store state
 * @param isOptional - Whether modbusAttributes is optional (default: true)
 */
export function createModbusAttributesSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getModbusAttributes: (state: TState) => ModbusAttributes | undefined,
  setModbusAttributes: (state: TState, modbusAttributes: ModbusAttributes | undefined) => void,
  isOptional: boolean = true
): ModbusAttributesSlice {
  // Create a helper to get the modbus interface-like object for nested slices
  const getModbusInterface = (state: TState) => {
    const modbusAttributes = getModbusAttributes(state);
    return modbusAttributes ? { modbusAttributes } : undefined;
  };

  // Create nested slices
  const scalingFactorSlice = createScalingFactorSlice(set, getModbusInterface);
  const accessProtectionSlice = createAccessProtectionSlice(set, getModbusInterface);

  return {
    // Spread nested slice actions
    ...scalingFactorSlice,
    ...accessProtectionSlice,

    addModbusAttributes: () =>
      set((state) => {
        const current = getModbusAttributes(state);
        if (!current) {
          setModbusAttributes(state, {});
        }
      }),

    removeModbusAttributes: () =>
      set((state) => {
        if (isOptional) {
          setModbusAttributes(state, undefined);
        }
      }),

    updateStepByIncrement: (stepByIncrement) =>
      set((state) => {
        let modbusAttributes = getModbusAttributes(state);
        // Create object if it doesn't exist and we're setting a value
        if (!modbusAttributes && stepByIncrement !== undefined) {
          modbusAttributes = {};
          setModbusAttributes(state, modbusAttributes);
        }
        if (modbusAttributes) {
          modbusAttributes.stepByIncrement = stepByIncrement;
        }
      }),

    updateSunssf: (sunssf) =>
      set((state) => {
        let modbusAttributes = getModbusAttributes(state);
        if (!modbusAttributes && sunssf !== undefined) {
          modbusAttributes = {};
          setModbusAttributes(state, modbusAttributes);
        }
        if (modbusAttributes) {
          modbusAttributes.sunssf = sunssf;
        }
      }),

    updatePollingLatencyMs: (pollingLatencyMs) =>
      set((state) => {
        let modbusAttributes = getModbusAttributes(state);
        if (!modbusAttributes && pollingLatencyMs !== undefined) {
          modbusAttributes = {};
          setModbusAttributes(state, modbusAttributes);
        }
        if (modbusAttributes) {
          modbusAttributes.pollingLatencyMs = pollingLatencyMs;
        }
      }),

    updateLayer6Deviation: (layer6Deviation) =>
      set((state) => {
        let modbusAttributes = getModbusAttributes(state);
        if (!modbusAttributes && layer6Deviation !== undefined) {
          modbusAttributes = {};
          setModbusAttributes(state, modbusAttributes);
        }
        if (modbusAttributes) {
          modbusAttributes.layer6Deviation = layer6Deviation;
        }
      }),
  };
}
