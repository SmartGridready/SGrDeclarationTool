import { DeviceFrame, ModbusDataPoint } from "@/models";
import { ModbusBoolean } from "@/models/product/modbus-types";

export interface ModbusDataPointBooleanSlice {
  setModbusDataPointBooleanDataType: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    boolean: ModbusBoolean
  ) => void;
  updateModbusDataPointBooleanTrueValue: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    trueValue: number | undefined
  ) => void;
  updateModbusDataPointBooleanFalseValue: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    falseValue: number | undefined
  ) => void;
}

/**
 * Creates a modbus data point boolean slice that works with any store state.
 * Works directly with ModbusDataType which uses ModbusBoolean.
 * ModbusBoolean can be EmptyType, { trueValue: number }, or { falseValue: number }.
 */
export function createModbusDataPointBooleanSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusDataPointBooleanSlice {
  const getDataPoint = (
    state: TState,
    functionalProfileIndex: number,
    dataPointIndex: number
  ): ModbusDataPoint | undefined => {
    return state.device?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement?.[
      functionalProfileIndex
    ]?.dataPointList?.dataPointListElement?.[dataPointIndex];
  };

  return {
    setModbusDataPointBooleanDataType: (functionalProfileIndex, dataPointIndex, boolean) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        if (dataPoint) {
          if (!dataPoint.modbusDataPointConfiguration) {
            dataPoint.modbusDataPointConfiguration = {
              modbusDataType: { boolean: boolean },
              address: 0,
              registerType: "HoldRegister",
              numberOfRegisters: 1,
            };
          } else {
            dataPoint.modbusDataPointConfiguration.modbusDataType = { boolean: boolean };
          }
        }
      });
    },

    updateModbusDataPointBooleanTrueValue: (functionalProfileIndex, dataPointIndex, trueValue) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        if (modbusDataType && "boolean" in modbusDataType) {
          if (trueValue !== undefined) {
            // Check if falseValue exists, keep it if it does
            const hasFalseValue = typeof modbusDataType.boolean === "object" && "falseValue" in modbusDataType.boolean;
            if (hasFalseValue) {
              modbusDataType.boolean = {
                trueValue: trueValue,
                falseValue: (modbusDataType.boolean as { falseValue: number }).falseValue,
              };
            } else {
              modbusDataType.boolean = { trueValue: trueValue };
            }
          } else {
            // Remove trueValue, keep falseValue if it exists, otherwise set to empty
            const hasFalseValue = typeof modbusDataType.boolean === "object" && "falseValue" in modbusDataType.boolean;
            if (hasFalseValue) {
              modbusDataType.boolean = {
                falseValue: (modbusDataType.boolean as { falseValue: number }).falseValue,
              };
            } else {
              modbusDataType.boolean = {};
            }
          }
        }
      });
    },

    updateModbusDataPointBooleanFalseValue: (functionalProfileIndex, dataPointIndex, falseValue) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        if (modbusDataType && "boolean" in modbusDataType) {
          if (falseValue !== undefined) {
            // Check if trueValue exists, keep it if it does
            const hasTrueValue = typeof modbusDataType.boolean === "object" && "trueValue" in modbusDataType.boolean;
            if (hasTrueValue) {
              modbusDataType.boolean = {
                trueValue: (modbusDataType.boolean as { trueValue: number }).trueValue,
                falseValue: falseValue,
              };
            } else {
              modbusDataType.boolean = { falseValue: falseValue };
            }
          } else {
            // Remove falseValue, keep trueValue if it exists, otherwise set to empty
            const hasTrueValue = typeof modbusDataType.boolean === "object" && "trueValue" in modbusDataType.boolean;
            if (hasTrueValue) {
              modbusDataType.boolean = {
                trueValue: (modbusDataType.boolean as { trueValue: number }).trueValue,
              };
            } else {
              modbusDataType.boolean = {};
            }
          }
        }
      });
    },
  };
}
