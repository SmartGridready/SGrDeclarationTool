import { BitmapProduct, BitmapEntryProduct, DeviceFrame, ConfigurationListElement } from "@/models";
import {
  createDataTypeProductBitmapSlice,
  DataTypeProductBitmapSlice,
} from "@/sections/shared/data-type-product/bitmap/bitmap-slice";

export interface ConfigurationListBitmapSlice {
  setConfigurationListBitmapDataType: (configIndex: number, bitmap: BitmapProduct) => void;
  addConfigurationListBitmapEntry: (configIndex: number, entry: BitmapEntryProduct) => void;
  removeConfigurationListBitmapEntry: (configIndex: number, entryIndex: number) => void;
  updateConfigurationListBitmapEntryLiteral: (
    configIndex: number,
    entryIndex: number,
    literal: string
  ) => void;
  updateConfigurationListBitmapEntryHexMask: (
    configIndex: number,
    entryIndex: number,
    hexMask: string
  ) => void;
  updateConfigurationListBitmapEntryDescription: (
    configIndex: number,
    entryIndex: number,
    description: string | undefined
  ) => void;
  addEmptyConfigurationListBitmapEntry: (configIndex: number) => void;
}

/**
 * Creates a configuration list bitmap slice that works with any store state.
 * Uses the shared createDataTypeProductBitmapSlice internally for consistency.
 */
export function createConfigurationListBitmapSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ConfigurationListBitmapSlice {
  const getConfiguration = (
    state: TState,
    configIndex: number
  ): ConfigurationListElement | undefined => {
    return state.device?.configurationList?.configurationListElement?.[configIndex];
  };

  // Helper function to get a slice bound to specific configIndex
  const getSliceForIndex = (configIndex: number): DataTypeProductBitmapSlice => {
    return createDataTypeProductBitmapSlice(
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
    setConfigurationListBitmapDataType: (configIndex, bitmap) =>
      getSliceForIndex(configIndex).setBitmapDataType(bitmap),

    addConfigurationListBitmapEntry: (configIndex, entry) =>
      getSliceForIndex(configIndex).addBitmapEntry(entry),

    removeConfigurationListBitmapEntry: (configIndex, entryIndex) =>
      getSliceForIndex(configIndex).removeBitmapEntry(entryIndex),

    updateConfigurationListBitmapEntryLiteral: (configIndex, entryIndex, literal) =>
      getSliceForIndex(configIndex).updateBitmapEntryLiteral(entryIndex, literal),

    updateConfigurationListBitmapEntryHexMask: (configIndex, entryIndex, hexMask) =>
      getSliceForIndex(configIndex).updateBitmapEntryHexMask(entryIndex, hexMask),

    updateConfigurationListBitmapEntryDescription: (configIndex, entryIndex, description) =>
      getSliceForIndex(configIndex).updateBitmapEntryDescription(entryIndex, description),

    addEmptyConfigurationListBitmapEntry: (configIndex) =>
      getSliceForIndex(configIndex).addEmptyBitmapEntry(),
  };
}
