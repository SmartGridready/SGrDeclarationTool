"use client";

import { BitmapProduct } from "@/models";
import { DataTypeProductBitmapForm } from "@/sections/shared/data-type-product/bitmap/bitmap-form";
import { DataTypeProductBitmapSlice } from "@/sections/shared/data-type-product/bitmap/bitmap-slice";
import { GenericAttributeListProductSlice } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";
import { useMemo } from "react";

interface GenericAttributeListProductSimpleBitmapFormProps {
  elementIndex: number;
  bitmap: BitmapProduct;
  actions: GenericAttributeListProductSlice;
  fieldPathPrefix?: string;
  getError?: (fieldPath: string) => string | undefined;
}

export function GenericAttributeListProductSimpleBitmapForm({
  elementIndex,
  bitmap,
  actions,
  fieldPathPrefix = "genericAttributeList",
  getError,
}: GenericAttributeListProductSimpleBitmapFormProps) {
  // Create an adapter that maps generic attribute list actions to the shared bitmap slice interface
  const adaptedActions = useMemo<DataTypeProductBitmapSlice>(() => {
    return {
      setBitmapDataType: (bitmap) => actions.setGenericAttributeListSimpleBitmapDataType(elementIndex, bitmap),
      addBitmapEntry: (entry) => actions.addGenericAttributeListSimpleBitmapEntry(elementIndex, entry),
      removeBitmapEntry: (entryIndex) => actions.removeGenericAttributeListSimpleBitmapEntry(elementIndex, entryIndex),
      updateBitmapEntryLiteral: (entryIndex, literal) =>
        actions.updateGenericAttributeListSimpleBitmapEntryLiteral(elementIndex, entryIndex, literal),
      updateBitmapEntryHexMask: (entryIndex, hexMask) =>
        actions.updateGenericAttributeListSimpleBitmapEntryHexMask(elementIndex, entryIndex, hexMask),
      updateBitmapEntryDescription: (entryIndex, description) =>
        actions.updateGenericAttributeListSimpleBitmapEntryDescription(elementIndex, entryIndex, description),
      addEmptyBitmapEntry: () => actions.addEmptyGenericAttributeListSimpleBitmapEntry(elementIndex),
    };
  }, [elementIndex, actions]);

  const dataTypeFieldPath = `${fieldPathPrefix}.genericAttributeListElement[${elementIndex}].dataType`;

  return (
    <DataTypeProductBitmapForm
      bitmap={bitmap}
      actions={adaptedActions}
      fieldPathPrefix={dataTypeFieldPath}
      getError={getError}
    />
  );
}
