"use client";

import { EnumMapProduct } from "@/models";
import { DataTypeProductEnumForm } from "@/sections/shared/data-type-product/enum/enum-form";
import { DataTypeProductEnumSlice } from "@/sections/shared/data-type-product/enum/enum-slice";
import { GenericAttributeListProductSlice } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";
import { useMemo } from "react";

interface GenericAttributeListProductNestedEnumFormProps {
  elementIndex: number;
  nestedElementIndex: number;
  enumMap: EnumMapProduct;
  actions: GenericAttributeListProductSlice;
  fieldPathPrefix?: string;
  getError?: (fieldPath: string) => string | undefined;
}

export function GenericAttributeListProductNestedEnumForm({
  elementIndex,
  nestedElementIndex,
  enumMap,
  actions,
  fieldPathPrefix = "genericAttributeList",
  getError,
}: GenericAttributeListProductNestedEnumFormProps) {
  // Create an adapter that maps generic attribute list actions to the shared enum slice interface
  const adaptedActions = useMemo<DataTypeProductEnumSlice>(() => {
    return {
      setEnumDataType: (enumMap) =>
        actions.setGenericAttributeListNestedEnumDataType(elementIndex, nestedElementIndex, enumMap),
      addEnumEntry: (entry) => actions.addGenericAttributeListNestedEnumEntry(elementIndex, nestedElementIndex, entry),
      removeEnumEntry: (entryIndex) =>
        actions.removeGenericAttributeListNestedEnumEntry(elementIndex, nestedElementIndex, entryIndex),
      updateEnumEntryLiteral: (entryIndex, literal) =>
        actions.updateGenericAttributeListNestedEnumEntryLiteral(elementIndex, nestedElementIndex, entryIndex, literal),
      updateEnumEntryOrdinal: (entryIndex, ordinal) =>
        actions.updateGenericAttributeListNestedEnumEntryOrdinal(elementIndex, nestedElementIndex, entryIndex, ordinal),
      updateEnumEntryDescription: (entryIndex, description) =>
        actions.updateGenericAttributeListNestedEnumEntryDescription(
          elementIndex,
          nestedElementIndex,
          entryIndex,
          description
        ),
      updateEnumHexMask: (hexMask) =>
        actions.updateGenericAttributeListNestedEnumHexMask(elementIndex, nestedElementIndex, hexMask),
      addEmptyEnumEntry: () => actions.addEmptyGenericAttributeListNestedEnumEntry(elementIndex, nestedElementIndex),
    };
  }, [elementIndex, nestedElementIndex, actions]);

  const dataTypeFieldPath = `${fieldPathPrefix}.genericAttributeListElement[${elementIndex}].genericAttributeList.genericAttributeListElement[${nestedElementIndex}].dataType`;

  return (
    <DataTypeProductEnumForm
      enumMap={enumMap}
      actions={adaptedActions}
      fieldPathPrefix={dataTypeFieldPath}
      getError={getError}
    />
  );
}
