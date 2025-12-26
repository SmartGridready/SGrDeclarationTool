import { DeviceFrame } from "@/models";
import { ModbusAttributes, ModbusLayer6Deviation } from "@/models/product/modbus-types";
import {
  createScalingFactorSlice,
  ScalingFactorSlice,
} from "./scaling-factor/scaling-factor-slice";
import {
  createAccessProtectionSlice,
  AccessProtectionSlice,
} from "./access-protection/access-protection-slice";

export interface ModbusAttributesSlice extends ScalingFactorSlice, AccessProtectionSlice {
  addModbusAttributes: () => void;
  removeModbusAttributes: () => void;
  updateStepByIncrement: (stepByIncrement: number | undefined) => void;
  updateSunssf: (sunssf: number | undefined) => void;
  updatePollingLatencyMs: (pollingLatencyMs: number | undefined) => void;
  updateLayer6Deviation: (layer6Deviation: ModbusLayer6Deviation | undefined) => void;
}

/**
 * Creates a modbus attributes slice for Device stores.
 */
export function createModbusAttributesSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusAttributesSlice {
  const getModbusAttributes = (state: TState) => {
    return state.device?.interfaceList?.modbusInterface;
  };

  // Create nested slices
  const scalingFactorSlice = createScalingFactorSlice(set, getModbusAttributes);
  const accessProtectionSlice = createAccessProtectionSlice(set, getModbusAttributes);

  return {
    // Spread nested slice actions
    ...scalingFactorSlice,
    ...accessProtectionSlice,

    addModbusAttributes: () =>
      set((state) => {
        const modbusInterface = getModbusAttributes(state);
        if (modbusInterface && !modbusInterface.modbusAttributes) {
          modbusInterface.modbusAttributes = {};
        }
      }),

    removeModbusAttributes: () =>
      set((state) => {
        const modbusInterface = getModbusAttributes(state);
        if (modbusInterface) {
          modbusInterface.modbusAttributes = undefined;
        }
      }),

    updateStepByIncrement: (stepByIncrement) =>
      set((state) => {
        const modbusInterface = getModbusAttributes(state);
        if (modbusInterface?.modbusAttributes) {
          modbusInterface.modbusAttributes.stepByIncrement = stepByIncrement;
        }
      }),

    updateSunssf: (sunssf) =>
      set((state) => {
        const modbusInterface = getModbusAttributes(state);
        if (modbusInterface?.modbusAttributes) {
          modbusInterface.modbusAttributes.sunssf = sunssf;
        }
      }),

    updatePollingLatencyMs: (pollingLatencyMs) =>
      set((state) => {
        const modbusInterface = getModbusAttributes(state);
        if (modbusInterface?.modbusAttributes) {
          modbusInterface.modbusAttributes.pollingLatencyMs = pollingLatencyMs;
        }
      }),

    updateLayer6Deviation: (layer6Deviation) =>
      set((state) => {
        const modbusInterface = getModbusAttributes(state);
        if (modbusInterface?.modbusAttributes) {
          modbusInterface.modbusAttributes.layer6Deviation = layer6Deviation;
        }
      }),
  };
}
