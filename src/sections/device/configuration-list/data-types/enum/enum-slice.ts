import {
  EnumMapProduct,
  EnumEntryProductRecord,
  DeviceFrame,
  ConfigurationListElement,
} from "@/models";
import {
  createDataTypeProductEnumSlice,
  DataTypeProductEnumSlice,
} from "@/sections/shared/data-type-product/enum/enum-slice";

export interface ConfigurationListEnumSlice {
  setConfigurationListEnumDataType: (configIndex: number, enumMap: EnumMapProduct) => void;
  addConfigurationListEnumEntry: (configIndex: number, entry: EnumEntryProductRecord) => void;
  removeConfigurationListEnumEntry: (configIndex: number, entryIndex: number) => void;
  updateConfigurationListEnumEntryLiteral: (
    configIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateConfigurationListEnumEntryOrdinal: (
    configIndex: number,
    entryIndex: number,
    ordinal: number | undefined
  ) => void;
  updateConfigurationListEnumEntryDescription: (
    configIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  updateConfigurationListEnumHexMask: (configIndex: number, hexMask: string | undefined) => void;
  addEmptyConfigurationListEnumEntry: (configIndex: number) => void;
}

/**
 * Creates a configuration list enum slice that works with any store state.
 * Uses the shared createDataTypeProductEnumSlice internally for consistency.
 */
export function createConfigurationListEnumSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ConfigurationListEnumSlice {
  const getConfiguration = (
    state: TState,
    configIndex: number
  ): ConfigurationListElement | undefined => {
    return state.device?.configurationList?.configurationListElement?.[configIndex];
  };

  // Helper function to get a slice bound to specific configIndex
  const getSliceForIndex = (configIndex: number): DataTypeProductEnumSlice => {
    return createDataTypeProductEnumSlice(
      set,
      (state) => getConfiguration(state, configIndex)?.dataType,
      (state, dataType) => {
        const config = getConfiguration(state, configIndex);
        if (config) {
          config.dataType = dataType;
        }
      }
    );
  };

  return {
    setConfigurationListEnumDataType: (configIndex, enumMap) =>
      getSliceForIndex(configIndex).setEnumDataType(enumMap),

    addConfigurationListEnumEntry: (configIndex, entry) =>
      getSliceForIndex(configIndex).addEnumEntry(entry),

    removeConfigurationListEnumEntry: (configIndex, entryIndex) =>
      getSliceForIndex(configIndex).removeEnumEntry(entryIndex),

    updateConfigurationListEnumEntryLiteral: (configIndex, entryIndex, literal) =>
      getSliceForIndex(configIndex).updateEnumEntryLiteral(entryIndex, literal),

    updateConfigurationListEnumEntryOrdinal: (configIndex, entryIndex, ordinal) =>
      getSliceForIndex(configIndex).updateEnumEntryOrdinal(entryIndex, ordinal),

    updateConfigurationListEnumEntryDescription: (configIndex, entryIndex, description) =>
      getSliceForIndex(configIndex).updateEnumEntryDescription(entryIndex, description),

    updateConfigurationListEnumHexMask: (configIndex, hexMask) =>
      getSliceForIndex(configIndex).updateEnumHexMask(hexMask),

    addEmptyConfigurationListEnumEntry: (configIndex) =>
      getSliceForIndex(configIndex).addEmptyEnumEntry(),
  };
}
