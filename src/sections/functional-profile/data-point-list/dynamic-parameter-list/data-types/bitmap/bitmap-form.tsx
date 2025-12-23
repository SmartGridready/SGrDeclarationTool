"use client";

import { BitmapProduct } from "@/models";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";
import { DataTypeProductBitmapForm } from "@/sections/shared/data-type-product/bitmap/bitmap-form";
import { DataTypeProductBitmapSlice } from "@/sections/shared/data-type-product/bitmap/bitmap-slice";
import { useMemo } from "react";

interface ParameterListBitmapFormProps {
  dataPointIndex: number;
  paramIndex: number;
  bitmap: BitmapProduct;
}

export function ParameterListBitmapForm({
  dataPointIndex,
  paramIndex,
  bitmap,
}: ParameterListBitmapFormProps) {
  const { dataPointListActions } = useFunctionalProfileFormContext();

  // Create an adapter that maps parameter list actions to the shared bitmap slice interface
  const adaptedActions = useMemo<DataTypeProductBitmapSlice>(() => {
    return {
      setBitmapDataType: (bitmap) =>
        dataPointListActions.setParameterListBitmapDataType(dataPointIndex, paramIndex, bitmap),
      addBitmapEntry: (entry) =>
        dataPointListActions.addParameterListBitmapEntry(dataPointIndex, paramIndex, entry),
      removeBitmapEntry: (entryIndex) =>
        dataPointListActions.removeParameterListBitmapEntry(dataPointIndex, paramIndex, entryIndex),
      updateBitmapEntryLiteral: (entryIndex, literal) =>
        dataPointListActions.updateParameterListBitmapEntryLiteral(
          dataPointIndex,
          paramIndex,
          entryIndex,
          literal
        ),
      updateBitmapEntryHexMask: (entryIndex, hexMask) =>
        dataPointListActions.updateParameterListBitmapEntryHexMask(
          dataPointIndex,
          paramIndex,
          entryIndex,
          hexMask
        ),
      updateBitmapEntryDescription: (entryIndex, description) =>
        dataPointListActions.updateParameterListBitmapEntryDescription(
          dataPointIndex,
          paramIndex,
          entryIndex,
          description
        ),
      addEmptyBitmapEntry: () =>
        dataPointListActions.addEmptyParameterListBitmapEntry(dataPointIndex, paramIndex),
    };
  }, [dataPointIndex, paramIndex, dataPointListActions]);

  return (
    <DataTypeProductBitmapForm
      bitmap={bitmap}
      actions={adaptedActions}
      fieldPathPrefix={`dataPoint-${dataPointIndex}-param-${paramIndex}-bitmap`}
    />
  );
}
