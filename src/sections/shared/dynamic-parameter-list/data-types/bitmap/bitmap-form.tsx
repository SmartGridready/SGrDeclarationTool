"use client";

import { BitmapProduct } from "@/models";
import { DataTypeProductBitmapForm } from "@/sections/shared/data-type-product/bitmap/bitmap-form";
import { DataTypeProductBitmapSlice } from "@/sections/shared/data-type-product/bitmap/bitmap-slice";
import { DynamicParameterListSlice } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-slice";
import { useMemo } from "react";

interface DynamicParameterListBitmapFormProps {
  dataPointIndex: number;
  paramIndex: number;
  bitmap: BitmapProduct;
  actions: DynamicParameterListSlice;
  fieldPathPrefix: string;
}

export function DynamicParameterListBitmapForm({
  dataPointIndex,
  paramIndex,
  bitmap,
  actions,
  fieldPathPrefix,
}: DynamicParameterListBitmapFormProps) {
  // Create an adapter that maps parameter list actions to the shared bitmap slice interface
  const adaptedActions = useMemo<DataTypeProductBitmapSlice>(() => {
    return {
      setBitmapDataType: (bitmap) =>
        actions.setParameterListBitmapDataType(dataPointIndex, paramIndex, bitmap),
      addBitmapEntry: (entry) =>
        actions.addParameterListBitmapEntry(dataPointIndex, paramIndex, entry),
      removeBitmapEntry: (entryIndex) =>
        actions.removeParameterListBitmapEntry(dataPointIndex, paramIndex, entryIndex),
      updateBitmapEntryLiteral: (entryIndex, literal) =>
        actions.updateParameterListBitmapEntryLiteral(
          dataPointIndex,
          paramIndex,
          entryIndex,
          literal
        ),
      updateBitmapEntryHexMask: (entryIndex, hexMask) =>
        actions.updateParameterListBitmapEntryHexMask(
          dataPointIndex,
          paramIndex,
          entryIndex,
          hexMask
        ),
      updateBitmapEntryDescription: (entryIndex, description) =>
        actions.updateParameterListBitmapEntryDescription(
          dataPointIndex,
          paramIndex,
          entryIndex,
          description
        ),
      addEmptyBitmapEntry: () =>
        actions.addEmptyParameterListBitmapEntry(dataPointIndex, paramIndex),
    };
  }, [dataPointIndex, paramIndex, actions]);

  return (
    <DataTypeProductBitmapForm
      bitmap={bitmap}
      actions={adaptedActions}
      fieldPathPrefix={`${fieldPathPrefix}-param-${paramIndex}-bitmap`}
    />
  );
}
