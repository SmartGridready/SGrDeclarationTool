import { DeviceFrame, ModbusDataPoint, BitmapProduct, BitmapEntryProduct } from "@/models";
import { createEmptyBitmapEntryProduct } from "@/utils/factory-utils";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface ModbusDataPointBitmapSlice {
  setModbusDataPointBitmapDataType: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    bitmap: BitmapProduct
  ) => void;
  addModbusDataPointBitmapEntry: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    entry: BitmapEntryProduct
  ) => void;
  removeModbusDataPointBitmapEntry: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    entryIndex: number
  ) => void;
  updateModbusDataPointBitmapEntryLiteral: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateModbusDataPointBitmapEntryHexMask: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    entryIndex: number,
    hexMask: string
  ) => void;
  updateModbusDataPointBitmapEntryDescription: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  addEmptyModbusDataPointBitmapEntry: (functionalProfileIndex: number, dataPointIndex: number) => void;
}

/**
 * Creates a modbus data point bitmap slice that works with any store state.
 * Works directly with ModbusDataType which uses BitmapProduct (from generic).
 */
export function createModbusDataPointBitmapSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusDataPointBitmapSlice {
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
    setModbusDataPointBitmapDataType: (functionalProfileIndex, dataPointIndex, bitmap) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        if (dataPoint) {
          if (!dataPoint.modbusDataPointConfiguration) {
            dataPoint.modbusDataPointConfiguration = {
              modbusDataType: { bitmap: bitmap },
              address: 0,
              registerType: "HoldRegister",
              numberOfRegisters: 1,
            };
          } else {
            dataPoint.modbusDataPointConfiguration.modbusDataType = { bitmap: bitmap };
          }
        }
      });
    },

    addModbusDataPointBitmapEntry: (functionalProfileIndex, dataPointIndex, entry) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        if (modbusDataType && "bitmap" in modbusDataType) {
          const entries = ensureArray(modbusDataType.bitmap.bitmapEntry, () => []);
          entries.push(entry);
          modbusDataType.bitmap.bitmapEntry = entries;
        }
      });
    },

    removeModbusDataPointBitmapEntry: (functionalProfileIndex, dataPointIndex, entryIndex) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        if (modbusDataType && "bitmap" in modbusDataType) {
          const bitmapType = modbusDataType.bitmap;
          removeArrayItem(bitmapType.bitmapEntry, entryIndex, () => {
            bitmapType.bitmapEntry = [];
          });
        }
      });
    },

    updateModbusDataPointBitmapEntryLiteral: (functionalProfileIndex, dataPointIndex, entryIndex, literal) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        const entry = modbusDataType && "bitmap" in modbusDataType && modbusDataType.bitmap.bitmapEntry?.[entryIndex];
        if (entry) entry.literal = literal;
      });
    },

    updateModbusDataPointBitmapEntryHexMask: (functionalProfileIndex, dataPointIndex, entryIndex, hexMask) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        const entry = modbusDataType && "bitmap" in modbusDataType && modbusDataType.bitmap.bitmapEntry?.[entryIndex];
        if (entry) entry.hexMask = hexMask;
      });
    },

    updateModbusDataPointBitmapEntryDescription: (functionalProfileIndex, dataPointIndex, entryIndex, description) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        const entry = modbusDataType && "bitmap" in modbusDataType && modbusDataType.bitmap.bitmapEntry?.[entryIndex];
        if (entry) entry.description = description;
      });
    },

    addEmptyModbusDataPointBitmapEntry: (functionalProfileIndex, dataPointIndex) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        if (modbusDataType && "bitmap" in modbusDataType) {
          const entries = ensureArray(modbusDataType.bitmap.bitmapEntry, () => []);
          entries.push(createEmptyBitmapEntryProduct());
          modbusDataType.bitmap.bitmapEntry = entries;
        }
      });
    },
  };
}
