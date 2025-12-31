import { DeviceFrame, ModbusDataPoint } from "@/models";
import { ModbusDataType, RegisterType, BitRank } from "@/models/product/modbus-types";
import { createModbusDataPointEnumSlice, ModbusDataPointEnumSlice } from "./data-types/enum/enum-slice";
import { createModbusDataPointBitmapSlice, ModbusDataPointBitmapSlice } from "./data-types/bitmap/bitmap-slice";
import { createModbusDataPointBooleanSlice, ModbusDataPointBooleanSlice } from "./data-types/boolean/boolean-slice";

export interface ModbusDataPointConfigurationSlice
  extends ModbusDataPointEnumSlice,
    ModbusDataPointBitmapSlice,
    ModbusDataPointBooleanSlice {
  // Configuration management
  addModbusDataPointConfiguration: (functionalProfileIndex: number, dataPointIndex: number) => void;
  removeModbusDataPointConfiguration: (functionalProfileIndex: number, dataPointIndex: number) => void;

  // Configuration field updates
  updateModbusDataType: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    modbusDataType: ModbusDataType
  ) => void;
  updateAddress: (functionalProfileIndex: number, dataPointIndex: number, address: number) => void;
  updateBitRank: (functionalProfileIndex: number, dataPointIndex: number, bitRank: BitRank | undefined) => void;
  updateRegisterType: (functionalProfileIndex: number, dataPointIndex: number, registerType: RegisterType) => void;
  updateNumberOfRegisters: (functionalProfileIndex: number, dataPointIndex: number, numberOfRegisters: number) => void;
}

/**
 * Creates a modbus data point configuration slice for Device stores.
 */
export function createModbusDataPointConfigurationSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusDataPointConfigurationSlice {
  const getDataPoint = (
    state: TState,
    functionalProfileIndex: number,
    dataPointIndex: number
  ): ModbusDataPoint | undefined => {
    return state.device?.interfaceList?.modbusInterface?.functionalProfileList?.functionalProfileListElement?.[
      functionalProfileIndex
    ]?.dataPointList?.dataPointListElement?.[dataPointIndex];
  };

  // Create data type slices
  const enumSlice = createModbusDataPointEnumSlice(set);
  const bitmapSlice = createModbusDataPointBitmapSlice(set);
  const booleanSlice = createModbusDataPointBooleanSlice(set);

  return {
    // Spread data type slices
    ...enumSlice,
    ...bitmapSlice,
    ...booleanSlice,

    addModbusDataPointConfiguration: (functionalProfileIndex, dataPointIndex) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        if (dataPoint && !dataPoint.modbusDataPointConfiguration) {
          dataPoint.modbusDataPointConfiguration = {
            modbusDataType: { float64: {} },
            address: 0,
            registerType: "HoldRegister",
            numberOfRegisters: 1,
          };
        }
      });
    },

    removeModbusDataPointConfiguration: (functionalProfileIndex, dataPointIndex) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        if (dataPoint) {
          delete dataPoint.modbusDataPointConfiguration;
        }
      });
    },

    updateModbusDataType: (functionalProfileIndex, dataPointIndex, modbusDataType) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        if (dataPoint?.modbusDataPointConfiguration) {
          dataPoint.modbusDataPointConfiguration.modbusDataType = modbusDataType;
        }
      });
    },

    updateAddress: (functionalProfileIndex, dataPointIndex, address) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        if (dataPoint?.modbusDataPointConfiguration) {
          dataPoint.modbusDataPointConfiguration.address = address;
        }
      });
    },

    updateBitRank: (functionalProfileIndex, dataPointIndex, bitRank) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        if (dataPoint?.modbusDataPointConfiguration) {
          if (bitRank !== undefined) {
            dataPoint.modbusDataPointConfiguration.bitRank = bitRank;
          } else {
            delete dataPoint.modbusDataPointConfiguration.bitRank;
          }
        }
      });
    },

    updateRegisterType: (functionalProfileIndex, dataPointIndex, registerType) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        if (dataPoint?.modbusDataPointConfiguration) {
          dataPoint.modbusDataPointConfiguration.registerType = registerType;
        }
      });
    },

    updateNumberOfRegisters: (functionalProfileIndex, dataPointIndex, numberOfRegisters) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        if (dataPoint?.modbusDataPointConfiguration) {
          dataPoint.modbusDataPointConfiguration.numberOfRegisters = numberOfRegisters;
        }
      });
    },
  };
}
