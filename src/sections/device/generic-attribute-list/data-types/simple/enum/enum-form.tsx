"use client";

import { EnumMapProduct } from "@/models";
import { useDeviceFormContext } from "@/context/device-form-context";
import { DataTypeProductEnumForm } from "@/sections/shared/data-type-product/enum/enum-form";
import { DataTypeProductEnumSlice } from "@/sections/shared/data-type-product/enum/enum-slice";
import { useMemo } from "react";

interface GenericAttributeListSimpleEnumFormProps {
  elementIndex: number;
  enumMap: EnumMapProduct;
}

export function GenericAttributeListSimpleEnumForm({
  elementIndex,
  enumMap,
}: GenericAttributeListSimpleEnumFormProps) {
  const { genericAttributeListActions } = useDeviceFormContext();

  // Create an adapter that maps generic attribute list actions to the shared enum slice interface
  const adaptedActions = useMemo<DataTypeProductEnumSlice>(() => {
    return {
      setEnumDataType: (enumMap) =>
        genericAttributeListActions.setGenericAttributeListSimpleEnumDataType(
          elementIndex,
          enumMap
        ),
      addEnumEntry: (entry) =>
        genericAttributeListActions.addGenericAttributeListSimpleEnumEntry(elementIndex, entry),
      removeEnumEntry: (entryIndex) =>
        genericAttributeListActions.removeGenericAttributeListSimpleEnumEntry(
          elementIndex,
          entryIndex
        ),
      updateEnumEntryLiteral: (entryIndex, literal) =>
        genericAttributeListActions.updateGenericAttributeListSimpleEnumEntryLiteral(
          elementIndex,
          entryIndex,
          literal
        ),
      updateEnumEntryOrdinal: (entryIndex, ordinal) =>
        genericAttributeListActions.updateGenericAttributeListSimpleEnumEntryOrdinal(
          elementIndex,
          entryIndex,
          ordinal
        ),
      updateEnumEntryDescription: (entryIndex, description) =>
        genericAttributeListActions.updateGenericAttributeListSimpleEnumEntryDescription(
          elementIndex,
          entryIndex,
          description
        ),
      updateEnumHexMask: (hexMask) =>
        genericAttributeListActions.updateGenericAttributeListSimpleEnumHexMask(
          elementIndex,
          hexMask
        ),
      addEmptyEnumEntry: () =>
        genericAttributeListActions.addEmptyGenericAttributeListSimpleEnumEntry(elementIndex),
    };
  }, [elementIndex, genericAttributeListActions]);

  return (
    <DataTypeProductEnumForm
      enumMap={enumMap}
      actions={adaptedActions}
      fieldPathPrefix={`generic-attribute-${elementIndex}-simple-enum`}
    />
  );
}
