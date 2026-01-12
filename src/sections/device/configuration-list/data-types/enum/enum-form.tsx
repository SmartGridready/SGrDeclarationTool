"use client";

import { EnumMapProduct } from "@/models";
import { useDeviceStore } from "@/sections/device/device-store";
import { DataTypeProductEnumForm } from "@/sections/shared/data-type-product/enum/enum-form";
import { DataTypeProductEnumSlice } from "@/sections/shared/data-type-product/enum/enum-slice";
import { useMemo } from "react";

interface ConfigurationListEnumFormProps {
  configIndex: number;
  enumMap: EnumMapProduct;
}

export function ConfigurationListEnumForm({ configIndex, enumMap }: ConfigurationListEnumFormProps) {
  const store = useDeviceStore.getState();

  // Create an adapter that maps configuration list actions to the shared enum slice interface
  const adaptedActions = useMemo<DataTypeProductEnumSlice>(() => {
    return {
      setEnumDataType: (enumMap) => store.setConfigurationListEnumDataType(configIndex, enumMap),
      addEnumEntry: (entry) => store.addConfigurationListEnumEntry(configIndex, entry),
      removeEnumEntry: (entryIndex) => store.removeConfigurationListEnumEntry(configIndex, entryIndex),
      updateEnumEntryLiteral: (entryIndex, literal) =>
        store.updateConfigurationListEnumEntryLiteral(configIndex, entryIndex, literal),
      updateEnumEntryOrdinal: (entryIndex, ordinal) =>
        store.updateConfigurationListEnumEntryOrdinal(configIndex, entryIndex, ordinal),
      updateEnumEntryDescription: (entryIndex, description) =>
        store.updateConfigurationListEnumEntryDescription(configIndex, entryIndex, description),
      updateEnumHexMask: (hexMask) => store.updateConfigurationListEnumHexMask(configIndex, hexMask),
      addEmptyEnumEntry: () => store.addEmptyConfigurationListEnumEntry(configIndex),
    };
  }, [configIndex, store]);

  return (
    <DataTypeProductEnumForm
      enumMap={enumMap}
      actions={adaptedActions}
      fieldPathPrefix={`configuration-${configIndex}-enum`}
    />
  );
}
