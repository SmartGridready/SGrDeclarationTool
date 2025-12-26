import { ScalingFactor } from "@/models/generic";

export interface ScalingFactorSlice {
  addScalingFactor: () => void;
  removeScalingFactor: () => void;
  updateMultiplicator: (multiplicator: number) => void;
  updatePowerOf10: (powerOf10: number) => void;
}

/**
 * Creates a generic scaling factor slice that works with any store state
 * @param set - The Zustand set function
 * @param getModbusInterface - Function to get modbus interface-like object with modbusAttributes from the store state
 */
export function createScalingFactorSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getModbusInterface: (
    state: TState
  ) => { modbusAttributes?: { scalingFactor?: ScalingFactor } } | undefined
): ScalingFactorSlice {
  const getScalingFactor = (state: TState): ScalingFactor | undefined => {
    return getModbusInterface(state)?.modbusAttributes?.scalingFactor;
  };

  return {
    addScalingFactor: () =>
      set((state) => {
        const modbusInterface = getModbusInterface(state);
        if (modbusInterface) {
          if (!modbusInterface.modbusAttributes) {
            modbusInterface.modbusAttributes = {};
          }
          if (!modbusInterface.modbusAttributes.scalingFactor) {
            modbusInterface.modbusAttributes.scalingFactor = {
              multiplicator: 0,
              powerof10: 0,
            };
          }
        }
      }),

    removeScalingFactor: () =>
      set((state) => {
        const modbusInterface = getModbusInterface(state);
        if (modbusInterface?.modbusAttributes) {
          modbusInterface.modbusAttributes.scalingFactor = undefined;
        }
      }),

    updateMultiplicator: (multiplicator) =>
      set((state) => {
        const scalingFactor = getScalingFactor(state);
        if (scalingFactor) {
          scalingFactor.multiplicator = multiplicator;
        }
      }),

    updatePowerOf10: (powerOf10) =>
      set((state) => {
        const scalingFactor = getScalingFactor(state);
        if (scalingFactor) {
          scalingFactor.powerof10 = powerOf10;
        }
      }),
  };
}
