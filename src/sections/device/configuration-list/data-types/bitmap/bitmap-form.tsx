"use client";

import { BitmapProduct } from "@/models";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { DataTypeProductBitmapForm } from "@/sections/shared/data-type-product/bitmap/bitmap-form";
import { DataTypeProductBitmapSlice } from "@/sections/shared/data-type-product/bitmap/bitmap-slice";
import { useMemo } from "react";

interface ConfigurationListBitmapFormProps {
  configIndex: number;
  bitmap: BitmapProduct;
}

export function ConfigurationListBitmapForm({ configIndex, bitmap }: ConfigurationListBitmapFormProps) {
  const store = useDeviceStore.getState();
  const { getError } = useDeviceValidation();

  // Create an adapter that maps configuration list actions to the shared bitmap slice interface
  const adaptedActions = useMemo<DataTypeProductBitmapSlice>(() => {
    return {
      setBitmapDataType: (bitmap) => store.setConfigurationListBitmapDataType(configIndex, bitmap),
      addBitmapEntry: (entry) => store.addConfigurationListBitmapEntry(configIndex, entry),
      removeBitmapEntry: (entryIndex) => store.removeConfigurationListBitmapEntry(configIndex, entryIndex),
      updateBitmapEntryLiteral: (entryIndex, literal) =>
        store.updateConfigurationListBitmapEntryLiteral(configIndex, entryIndex, literal),
      updateBitmapEntryHexMask: (entryIndex, hexMask) =>
        store.updateConfigurationListBitmapEntryHexMask(configIndex, entryIndex, hexMask),
      updateBitmapEntryDescription: (entryIndex, description) =>
        store.updateConfigurationListBitmapEntryDescription(configIndex, entryIndex, description),
      addEmptyBitmapEntry: () => store.addEmptyConfigurationListBitmapEntry(configIndex),
    };
  }, [configIndex, store]);

  const dataTypeFieldPath = `configurationList.configurationListElement[${configIndex}].dataType`;

  return (
    <DataTypeProductBitmapForm
      bitmap={bitmap}
      actions={adaptedActions}
      fieldPathPrefix={dataTypeFieldPath}
      getError={getError}
    />
  );
}
