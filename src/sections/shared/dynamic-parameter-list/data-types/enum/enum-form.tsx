"use client";

import { EnumMapProduct } from "@/models";
import { DataTypeProductEnumForm } from "@/sections/shared/data-type-product/enum/enum-form";
import { DataTypeProductEnumSlice } from "@/sections/shared/data-type-product/enum/enum-slice";
import { DynamicParameterListSlice } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-slice";
import { useMemo } from "react";

interface DynamicParameterListEnumFormProps {
  listIndex: number;
  paramIndex: number;
  enumMap: EnumMapProduct;
  actions: DynamicParameterListSlice;
  fieldPathPrefix: string;
  getError?: (fieldPath: string) => string | undefined;
}

export function DynamicParameterListEnumForm({
  listIndex,
  paramIndex,
  enumMap,
  actions,
  fieldPathPrefix,
  getError,
}: DynamicParameterListEnumFormProps) {
  // Create an adapter that maps parameter list actions to the shared enum slice interface
  const adaptedActions = useMemo<DataTypeProductEnumSlice>(() => {
    return {
      setEnumDataType: (enumMap) => actions.setParameterListEnumDataType(listIndex, paramIndex, enumMap),
      addEnumEntry: (entry) => actions.addParameterListEnumEntry(listIndex, paramIndex, entry),
      removeEnumEntry: (entryIndex) => actions.removeParameterListEnumEntry(listIndex, paramIndex, entryIndex),
      updateEnumEntryLiteral: (entryIndex, literal) =>
        actions.updateParameterListEnumEntryLiteral(listIndex, paramIndex, entryIndex, literal),
      updateEnumEntryOrdinal: (entryIndex, ordinal) =>
        actions.updateParameterListEnumEntryOrdinal(listIndex, paramIndex, entryIndex, ordinal),
      updateEnumEntryDescription: (entryIndex, description) =>
        actions.updateParameterListEnumEntryDescription(listIndex, paramIndex, entryIndex, description),
      updateEnumHexMask: (hexMask) => actions.updateParameterListEnumHexMask(listIndex, paramIndex, hexMask),
      addEmptyEnumEntry: () => actions.addEmptyParameterListEnumEntry(listIndex, paramIndex),
    };
  }, [listIndex, paramIndex, actions]);

  const dataTypeFieldPath = `${fieldPathPrefix}.parameterListElement[${paramIndex}].dataType`;

  return (
    <DataTypeProductEnumForm
      enumMap={enumMap}
      actions={adaptedActions}
      fieldPathPrefix={dataTypeFieldPath}
      getError={getError}
    />
  );
}
