"use client";

import { BitmapProduct } from "@/models";
import { useDeviceFormContext } from "@/context/device-form-context";
import { DataTypeProductBitmapForm } from "@/sections/shared/data-type-product/bitmap/bitmap-form";
import { DataTypeProductBitmapSlice } from "@/sections/shared/data-type-product/bitmap/bitmap-slice";
import { useMemo } from "react";

interface ConfigurationListBitmapFormProps {
  configIndex: number;
  bitmap: BitmapProduct;
}

export function ConfigurationListBitmapForm({
  configIndex,
  bitmap,
}: ConfigurationListBitmapFormProps) {
  const { configurationListActions } = useDeviceFormContext();

  // Create an adapter that maps configuration list actions to the shared bitmap slice interface
  const adaptedActions = useMemo<DataTypeProductBitmapSlice>(() => {
    return {
      setBitmapDataType: (bitmap) =>
        configurationListActions.setConfigurationListBitmapDataType(configIndex, bitmap),
      addBitmapEntry: (entry) =>
        configurationListActions.addConfigurationListBitmapEntry(configIndex, entry),
      removeBitmapEntry: (entryIndex) =>
        configurationListActions.removeConfigurationListBitmapEntry(configIndex, entryIndex),
      updateBitmapEntryLiteral: (entryIndex, literal) =>
        configurationListActions.updateConfigurationListBitmapEntryLiteral(
          configIndex,
          entryIndex,
          literal
        ),
      updateBitmapEntryHexMask: (entryIndex, hexMask) =>
        configurationListActions.updateConfigurationListBitmapEntryHexMask(
          configIndex,
          entryIndex,
          hexMask
        ),
      updateBitmapEntryDescription: (entryIndex, description) =>
        configurationListActions.updateConfigurationListBitmapEntryDescription(
          configIndex,
          entryIndex,
          description
        ),
      addEmptyBitmapEntry: () =>
        configurationListActions.addEmptyConfigurationListBitmapEntry(configIndex),
    };
  }, [configIndex, configurationListActions]);

  return (
    <DataTypeProductBitmapForm
      bitmap={bitmap}
      actions={adaptedActions}
      fieldPathPrefix={`configuration-${configIndex}-bitmap`}
    />
  );
}
