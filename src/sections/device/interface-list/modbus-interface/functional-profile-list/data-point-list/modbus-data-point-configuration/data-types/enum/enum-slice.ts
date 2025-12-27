import { DeviceFrame, ModbusDataPoint, Enum, EnumEntry } from "@/models";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface ModbusDataPointEnumSlice {
  setModbusDataPointEnumDataType: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    enumMap: Enum
  ) => void;
  addModbusDataPointEnumEntry: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    entry: EnumEntry
  ) => void;
  removeModbusDataPointEnumEntry: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    entryIndex: number
  ) => void;
  updateModbusDataPointEnumEntryLiteral: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateModbusDataPointEnumEntryOrdinal: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    entryIndex: number,
    ordinal: number
  ) => void;
  updateModbusDataPointEnumEntryDescription: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  updateModbusDataPointEnumHexMask: (
    functionalProfileIndex: number,
    dataPointIndex: number,
    hexMask: string | undefined
  ) => void;
  addEmptyModbusDataPointEnumEntry: (
    functionalProfileIndex: number,
    dataPointIndex: number
  ) => void;
}

/**
 * Creates a modbus data point enum slice that works with any store state.
 * Works directly with ModbusDataType which uses Enum (from generic).
 */
export function createModbusDataPointEnumSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusDataPointEnumSlice {
  const getDataPoint = (
    state: TState,
    functionalProfileIndex: number,
    dataPointIndex: number
  ): ModbusDataPoint | undefined => {
    return state.device?.interfaceList?.modbusInterface?.functionalProfileList
      ?.functionalProfileListElement?.[functionalProfileIndex]?.dataPointList
      ?.dataPointListElement?.[dataPointIndex];
  };

  return {
    setModbusDataPointEnumDataType: (functionalProfileIndex, dataPointIndex, enumMap) => {
      // Direct implementation since we need to work with Enum, not EnumMapProduct
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        if (dataPoint) {
          if (!dataPoint.modbusDataPointConfiguration) {
            dataPoint.modbusDataPointConfiguration = {
              modbusDataType: { enum: enumMap },
              address: 0,
              registerType: "HoldRegister",
              numberOfRegisters: 1,
            };
          } else {
            dataPoint.modbusDataPointConfiguration.modbusDataType = { enum: enumMap };
          }
        }
      });
    },

    addModbusDataPointEnumEntry: (functionalProfileIndex, dataPointIndex, entry) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        if (modbusDataType && "enum" in modbusDataType) {
          const enumType = modbusDataType.enum;
          const entries = ensureArray(enumType.enumEntry, () => []);
          entries.push(entry);
          enumType.enumEntry = entries;
        }
      });
    },

    removeModbusDataPointEnumEntry: (functionalProfileIndex, dataPointIndex, entryIndex) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        if (modbusDataType && "enum" in modbusDataType) {
          const enumType = modbusDataType.enum;
          removeArrayItem(enumType.enumEntry, entryIndex, () => {
            enumType.enumEntry = [];
          });
        }
      });
    },

    updateModbusDataPointEnumEntryLiteral: (
      functionalProfileIndex,
      dataPointIndex,
      entryIndex,
      literal
    ) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        const entry =
          modbusDataType && "enum" in modbusDataType && modbusDataType.enum.enumEntry?.[entryIndex];
        if (entry) entry.literal = literal;
      });
    },

    updateModbusDataPointEnumEntryOrdinal: (
      functionalProfileIndex,
      dataPointIndex,
      entryIndex,
      ordinal
    ) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        const entry =
          modbusDataType && "enum" in modbusDataType && modbusDataType.enum.enumEntry?.[entryIndex];
        if (entry) entry.ordinal = ordinal;
      });
    },

    updateModbusDataPointEnumEntryDescription: (
      functionalProfileIndex,
      dataPointIndex,
      entryIndex,
      description
    ) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        const entry =
          modbusDataType && "enum" in modbusDataType && modbusDataType.enum.enumEntry?.[entryIndex];
        if (entry) entry.description = description;
      });
    },

    updateModbusDataPointEnumHexMask: (functionalProfileIndex, dataPointIndex, hexMask) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        if (modbusDataType && "enum" in modbusDataType) {
          modbusDataType.enum.hexMask = hexMask;
        }
      });
    },

    addEmptyModbusDataPointEnumEntry: (functionalProfileIndex, dataPointIndex) => {
      set((state) => {
        const dataPoint = getDataPoint(state, functionalProfileIndex, dataPointIndex);
        const modbusDataType = dataPoint?.modbusDataPointConfiguration?.modbusDataType;
        if (modbusDataType && "enum" in modbusDataType) {
          const enumType = modbusDataType.enum;
          const entries = ensureArray(enumType.enumEntry, () => []);
          entries.push({ literal: "", ordinal: 0 });
          enumType.enumEntry = entries;
        }
      });
    },
  };
}
