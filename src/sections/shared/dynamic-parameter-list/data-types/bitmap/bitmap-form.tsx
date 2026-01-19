"use client";

import { BitmapProduct } from "@/models";
import { DataTypeProductBitmapForm } from "@/sections/shared/data-type-product/bitmap/bitmap-form";
import { DataTypeProductBitmapSlice } from "@/sections/shared/data-type-product/bitmap/bitmap-slice";
import { DynamicParameterListSlice } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-slice";
import { useMemo } from "react";

interface DynamicParameterListBitmapFormProps {
  listIndex: number;
  paramIndex: number;
  bitmap: BitmapProduct;
  actions: DynamicParameterListSlice;
  fieldPathPrefix: string;
  getError?: (fieldPath: string) => string | undefined;
}

export function DynamicParameterListBitmapForm({
  listIndex,
  paramIndex,
  bitmap,
  actions,
  fieldPathPrefix,
  getError,
}: DynamicParameterListBitmapFormProps) {
  // Create an adapter that maps parameter list actions to the shared bitmap slice interface
  const adaptedActions = useMemo<DataTypeProductBitmapSlice>(() => {
    return {
      setBitmapDataType: (bitmap) => actions.setParameterListBitmapDataType(listIndex, paramIndex, bitmap),
      addBitmapEntry: (entry) => actions.addParameterListBitmapEntry(listIndex, paramIndex, entry),
      removeBitmapEntry: (entryIndex) => actions.removeParameterListBitmapEntry(listIndex, paramIndex, entryIndex),
      updateBitmapEntryLiteral: (entryIndex, literal) =>
        actions.updateParameterListBitmapEntryLiteral(listIndex, paramIndex, entryIndex, literal),
      updateBitmapEntryHexMask: (entryIndex, hexMask) =>
        actions.updateParameterListBitmapEntryHexMask(listIndex, paramIndex, entryIndex, hexMask),
      updateBitmapEntryDescription: (entryIndex, description) =>
        actions.updateParameterListBitmapEntryDescription(listIndex, paramIndex, entryIndex, description),
      addEmptyBitmapEntry: () => actions.addEmptyParameterListBitmapEntry(listIndex, paramIndex),
    };
  }, [listIndex, paramIndex, actions]);

  const dataTypeFieldPath = `${fieldPathPrefix}.parameterListElement[${paramIndex}].dataType`;

  return (
    <DataTypeProductBitmapForm
      bitmap={bitmap}
      actions={adaptedActions}
      fieldPathPrefix={dataTypeFieldPath}
      getError={getError}
    />
  );
}
