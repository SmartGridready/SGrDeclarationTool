"use client";

import { EnumMapProduct } from "@/models";
import { useDeviceFormContext } from "@/context/device-form-context";
import { DataTypeProductEnumForm } from "@/sections/shared/data-type-product/enum/enum-form";
import { DataTypeProductEnumSlice } from "@/sections/shared/data-type-product/enum/enum-slice";
import { useMemo } from "react";

interface GenericAttributeListNestedEnumFormProps {
  elementIndex: number;
  nestedElementIndex: number;
  enumMap: EnumMapProduct;
}

export function GenericAttributeListNestedEnumForm({
  elementIndex,
  nestedElementIndex,
  enumMap,
}: GenericAttributeListNestedEnumFormProps) {
  const { genericAttributeListActions } = useDeviceFormContext();

  // Create an adapter that maps generic attribute list actions to the shared enum slice interface
  const adaptedActions = useMemo<DataTypeProductEnumSlice>(() => {
    return {
      setEnumDataType: (enumMap) =>
        genericAttributeListActions.setGenericAttributeListNestedEnumDataType(
          elementIndex,
          nestedElementIndex,
          enumMap
        ),
      addEnumEntry: (entry) =>
        genericAttributeListActions.addGenericAttributeListNestedEnumEntry(
          elementIndex,
          nestedElementIndex,
          entry
        ),
      removeEnumEntry: (entryIndex) =>
        genericAttributeListActions.removeGenericAttributeListNestedEnumEntry(
          elementIndex,
          nestedElementIndex,
          entryIndex
        ),
      updateEnumEntryLiteral: (entryIndex, literal) =>
        genericAttributeListActions.updateGenericAttributeListNestedEnumEntryLiteral(
          elementIndex,
          nestedElementIndex,
          entryIndex,
          literal
        ),
      updateEnumEntryOrdinal: (entryIndex, ordinal) =>
        genericAttributeListActions.updateGenericAttributeListNestedEnumEntryOrdinal(
          elementIndex,
          nestedElementIndex,
          entryIndex,
          ordinal
        ),
      updateEnumEntryDescription: (entryIndex, description) =>
        genericAttributeListActions.updateGenericAttributeListNestedEnumEntryDescription(
          elementIndex,
          nestedElementIndex,
          entryIndex,
          description
        ),
      updateEnumHexMask: (hexMask) =>
        genericAttributeListActions.updateGenericAttributeListNestedEnumHexMask(
          elementIndex,
          nestedElementIndex,
          hexMask
        ),
      addEmptyEnumEntry: () =>
        genericAttributeListActions.addEmptyGenericAttributeListNestedEnumEntry(
          elementIndex,
          nestedElementIndex
        ),
    };
  }, [elementIndex, nestedElementIndex, genericAttributeListActions]);

  return (
    <DataTypeProductEnumForm
      enumMap={enumMap}
      actions={adaptedActions}
      fieldPathPrefix={`generic-attribute-${elementIndex}-nested-${nestedElementIndex}-enum`}
    />
  );
}
