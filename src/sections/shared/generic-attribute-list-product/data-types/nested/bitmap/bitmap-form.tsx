"use client";

import { BitmapProduct } from "@/models";
import { DataTypeProductBitmapForm } from "@/sections/shared/data-type-product/bitmap/bitmap-form";
import { DataTypeProductBitmapSlice } from "@/sections/shared/data-type-product/bitmap/bitmap-slice";
import { GenericAttributeListProductSlice } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";
import { useMemo } from "react";

interface GenericAttributeListProductNestedBitmapFormProps {
  elementIndex: number;
  nestedElementIndex: number;
  bitmap: BitmapProduct;
  actions: GenericAttributeListProductSlice;
  fieldPathPrefix?: string;
}

export function GenericAttributeListProductNestedBitmapForm({
  elementIndex,
  nestedElementIndex,
  bitmap,
  actions,
  fieldPathPrefix = "generic-attribute",
}: GenericAttributeListProductNestedBitmapFormProps) {
  // Create an adapter that maps generic attribute list actions to the shared bitmap slice interface
  const adaptedActions = useMemo<DataTypeProductBitmapSlice>(() => {
    return {
      setBitmapDataType: (bitmap) =>
        actions.setGenericAttributeListNestedBitmapDataType(
          elementIndex,
          nestedElementIndex,
          bitmap
        ),
      addBitmapEntry: (entry) =>
        actions.addGenericAttributeListNestedBitmapEntry(elementIndex, nestedElementIndex, entry),
      removeBitmapEntry: (entryIndex) =>
        actions.removeGenericAttributeListNestedBitmapEntry(
          elementIndex,
          nestedElementIndex,
          entryIndex
        ),
      updateBitmapEntryLiteral: (entryIndex, literal) =>
        actions.updateGenericAttributeListNestedBitmapEntryLiteral(
          elementIndex,
          nestedElementIndex,
          entryIndex,
          literal
        ),
      updateBitmapEntryHexMask: (entryIndex, hexMask) =>
        actions.updateGenericAttributeListNestedBitmapEntryHexMask(
          elementIndex,
          nestedElementIndex,
          entryIndex,
          hexMask
        ),
      updateBitmapEntryDescription: (entryIndex, description) =>
        actions.updateGenericAttributeListNestedBitmapEntryDescription(
          elementIndex,
          nestedElementIndex,
          entryIndex,
          description
        ),
      addEmptyBitmapEntry: () =>
        actions.addEmptyGenericAttributeListNestedBitmapEntry(elementIndex, nestedElementIndex),
    };
  }, [elementIndex, nestedElementIndex, actions]);

  return (
    <DataTypeProductBitmapForm
      bitmap={bitmap}
      actions={adaptedActions}
      fieldPathPrefix={`${fieldPathPrefix}-${elementIndex}-nested-${nestedElementIndex}-bitmap`}
    />
  );
}
