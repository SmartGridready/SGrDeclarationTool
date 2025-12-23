"use client";

import { EnumMapProduct } from "@/models";
import { DataTypeProductEnumForm } from "@/sections/shared/data-type-product/enum/enum-form";
import { DataTypeProductEnumSlice } from "@/sections/shared/data-type-product/enum/enum-slice";
import { DynamicParameterListSlice } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-slice";
import { useMemo } from "react";

interface DynamicParameterListEnumFormProps {
  dataPointIndex: number;
  paramIndex: number;
  enumMap: EnumMapProduct;
  actions: DynamicParameterListSlice;
  fieldPathPrefix: string;
}

export function DynamicParameterListEnumForm({
  dataPointIndex,
  paramIndex,
  enumMap,
  actions,
  fieldPathPrefix,
}: DynamicParameterListEnumFormProps) {
  // Create an adapter that maps parameter list actions to the shared enum slice interface
  const adaptedActions = useMemo<DataTypeProductEnumSlice>(() => {
    return {
      setEnumDataType: (enumMap) =>
        actions.setParameterListEnumDataType(dataPointIndex, paramIndex, enumMap),
      addEnumEntry: (entry) => actions.addParameterListEnumEntry(dataPointIndex, paramIndex, entry),
      removeEnumEntry: (entryIndex) =>
        actions.removeParameterListEnumEntry(dataPointIndex, paramIndex, entryIndex),
      updateEnumEntryLiteral: (entryIndex, literal) =>
        actions.updateParameterListEnumEntryLiteral(
          dataPointIndex,
          paramIndex,
          entryIndex,
          literal
        ),
      updateEnumEntryOrdinal: (entryIndex, ordinal) =>
        actions.updateParameterListEnumEntryOrdinal(
          dataPointIndex,
          paramIndex,
          entryIndex,
          ordinal
        ),
      updateEnumEntryDescription: (entryIndex, description) =>
        actions.updateParameterListEnumEntryDescription(
          dataPointIndex,
          paramIndex,
          entryIndex,
          description
        ),
      updateEnumHexMask: (hexMask) =>
        actions.updateParameterListEnumHexMask(dataPointIndex, paramIndex, hexMask),
      addEmptyEnumEntry: () => actions.addEmptyParameterListEnumEntry(dataPointIndex, paramIndex),
    };
  }, [dataPointIndex, paramIndex, actions]);

  return (
    <DataTypeProductEnumForm
      enumMap={enumMap}
      actions={adaptedActions}
      fieldPathPrefix={`${fieldPathPrefix}-param-${paramIndex}-enum`}
    />
  );
}
