"use client";

import { BitmapProduct } from "@/models";
import { useDeviceFormContext } from "@/context/device-form-context";
import { DataTypeProductBitmapForm } from "@/sections/shared/data-type-product/bitmap/bitmap-form";
import { DataTypeProductBitmapSlice } from "@/sections/shared/data-type-product/bitmap/bitmap-slice";
import { useMemo } from "react";

interface GenericAttributeListNestedBitmapFormProps {
  elementIndex: number;
  nestedElementIndex: number;
  bitmap: BitmapProduct;
}

export function GenericAttributeListNestedBitmapForm({
  elementIndex,
  nestedElementIndex,
  bitmap,
}: GenericAttributeListNestedBitmapFormProps) {
  const { genericAttributeListActions } = useDeviceFormContext();

  // Create an adapter that maps generic attribute list actions to the shared bitmap slice interface
  const adaptedActions = useMemo<DataTypeProductBitmapSlice>(() => {
    return {
      setBitmapDataType: (bitmap) =>
        genericAttributeListActions.setGenericAttributeListNestedBitmapDataType(
          elementIndex,
          nestedElementIndex,
          bitmap
        ),
      addBitmapEntry: (entry) =>
        genericAttributeListActions.addGenericAttributeListNestedBitmapEntry(
          elementIndex,
          nestedElementIndex,
          entry
        ),
      removeBitmapEntry: (entryIndex) =>
        genericAttributeListActions.removeGenericAttributeListNestedBitmapEntry(
          elementIndex,
          nestedElementIndex,
          entryIndex
        ),
      updateBitmapEntryLiteral: (entryIndex, literal) =>
        genericAttributeListActions.updateGenericAttributeListNestedBitmapEntryLiteral(
          elementIndex,
          nestedElementIndex,
          entryIndex,
          literal
        ),
      updateBitmapEntryHexMask: (entryIndex, hexMask) =>
        genericAttributeListActions.updateGenericAttributeListNestedBitmapEntryHexMask(
          elementIndex,
          nestedElementIndex,
          entryIndex,
          hexMask
        ),
      updateBitmapEntryDescription: (entryIndex, description) =>
        genericAttributeListActions.updateGenericAttributeListNestedBitmapEntryDescription(
          elementIndex,
          nestedElementIndex,
          entryIndex,
          description
        ),
      addEmptyBitmapEntry: () =>
        genericAttributeListActions.addEmptyGenericAttributeListNestedBitmapEntry(
          elementIndex,
          nestedElementIndex
        ),
    };
  }, [elementIndex, nestedElementIndex, genericAttributeListActions]);

  return (
    <DataTypeProductBitmapForm
      bitmap={bitmap}
      actions={adaptedActions}
      fieldPathPrefix={`generic-attribute-${elementIndex}-nested-${nestedElementIndex}-bitmap`}
    />
  );
}
