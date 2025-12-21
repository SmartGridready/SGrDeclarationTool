"use client";

import { BitmapProduct } from "@/models";
import { useDeviceFormContext } from "@/context/device-form-context";
import { DataTypeProductBitmapForm } from "@/sections/shared/data-type-product/bitmap/bitmap-form";
import { DataTypeProductBitmapSlice } from "@/sections/shared/data-type-product/bitmap/bitmap-slice";
import { useMemo } from "react";

interface GenericAttributeListSimpleBitmapFormProps {
  elementIndex: number;
  bitmap: BitmapProduct;
}

export function GenericAttributeListSimpleBitmapForm({
  elementIndex,
  bitmap,
}: GenericAttributeListSimpleBitmapFormProps) {
  const { genericAttributeListActions } = useDeviceFormContext();

  // Create an adapter that maps generic attribute list actions to the shared bitmap slice interface
  const adaptedActions = useMemo<DataTypeProductBitmapSlice>(() => {
    return {
      setBitmapDataType: (bitmap) =>
        genericAttributeListActions.setGenericAttributeListSimpleBitmapDataType(
          elementIndex,
          bitmap
        ),
      addBitmapEntry: (entry) =>
        genericAttributeListActions.addGenericAttributeListSimpleBitmapEntry(elementIndex, entry),
      removeBitmapEntry: (entryIndex) =>
        genericAttributeListActions.removeGenericAttributeListSimpleBitmapEntry(
          elementIndex,
          entryIndex
        ),
      updateBitmapEntryLiteral: (entryIndex, literal) =>
        genericAttributeListActions.updateGenericAttributeListSimpleBitmapEntryLiteral(
          elementIndex,
          entryIndex,
          literal
        ),
      updateBitmapEntryHexMask: (entryIndex, hexMask) =>
        genericAttributeListActions.updateGenericAttributeListSimpleBitmapEntryHexMask(
          elementIndex,
          entryIndex,
          hexMask
        ),
      updateBitmapEntryDescription: (entryIndex, description) =>
        genericAttributeListActions.updateGenericAttributeListSimpleBitmapEntryDescription(
          elementIndex,
          entryIndex,
          description
        ),
      addEmptyBitmapEntry: () =>
        genericAttributeListActions.addEmptyGenericAttributeListSimpleBitmapEntry(elementIndex),
    };
  }, [elementIndex, genericAttributeListActions]);

  return (
    <DataTypeProductBitmapForm
      bitmap={bitmap}
      actions={adaptedActions}
      fieldPathPrefix={`generic-attribute-${elementIndex}-simple-bitmap`}
    />
  );
}
