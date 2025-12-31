"use client";

import { EnumMapProduct } from "@/models";
import { useDeviceFormContext } from "@/context/device-form-context";
import { DataTypeProductEnumForm } from "@/sections/shared/data-type-product/enum/enum-form";
import { DataTypeProductEnumSlice } from "@/sections/shared/data-type-product/enum/enum-slice";
import { useMemo } from "react";

interface ConfigurationListEnumFormProps {
  configIndex: number;
  enumMap: EnumMapProduct;
}

export function ConfigurationListEnumForm({ configIndex, enumMap }: ConfigurationListEnumFormProps) {
  const { configurationListActions } = useDeviceFormContext();

  // Create an adapter that maps configuration list actions to the shared enum slice interface
  const adaptedActions = useMemo<DataTypeProductEnumSlice>(() => {
    return {
      setEnumDataType: (enumMap) => configurationListActions.setConfigurationListEnumDataType(configIndex, enumMap),
      addEnumEntry: (entry) => configurationListActions.addConfigurationListEnumEntry(configIndex, entry),
      removeEnumEntry: (entryIndex) =>
        configurationListActions.removeConfigurationListEnumEntry(configIndex, entryIndex),
      updateEnumEntryLiteral: (entryIndex, literal) =>
        configurationListActions.updateConfigurationListEnumEntryLiteral(configIndex, entryIndex, literal),
      updateEnumEntryOrdinal: (entryIndex, ordinal) =>
        configurationListActions.updateConfigurationListEnumEntryOrdinal(configIndex, entryIndex, ordinal),
      updateEnumEntryDescription: (entryIndex, description) =>
        configurationListActions.updateConfigurationListEnumEntryDescription(configIndex, entryIndex, description),
      updateEnumHexMask: (hexMask) => configurationListActions.updateConfigurationListEnumHexMask(configIndex, hexMask),
      addEmptyEnumEntry: () => configurationListActions.addEmptyConfigurationListEnumEntry(configIndex),
    };
  }, [configIndex, configurationListActions]);

  return (
    <DataTypeProductEnumForm
      enumMap={enumMap}
      actions={adaptedActions}
      fieldPathPrefix={`configuration-${configIndex}-enum`}
    />
  );
}
