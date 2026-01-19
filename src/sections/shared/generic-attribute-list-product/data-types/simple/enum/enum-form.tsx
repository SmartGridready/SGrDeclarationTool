"use client";

import { EnumMapProduct } from "@/models";
import { DataTypeProductEnumForm } from "@/sections/shared/data-type-product/enum/enum-form";
import { DataTypeProductEnumSlice } from "@/sections/shared/data-type-product/enum/enum-slice";
import { GenericAttributeListProductSlice } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";
import { useMemo } from "react";

interface GenericAttributeListProductSimpleEnumFormProps {
  elementIndex: number;
  enumMap: EnumMapProduct;
  actions: GenericAttributeListProductSlice;
  fieldPathPrefix?: string;
  getError?: (fieldPath: string) => string | undefined;
}

export function GenericAttributeListProductSimpleEnumForm({
  elementIndex,
  enumMap,
  actions,
  fieldPathPrefix = "genericAttributeList",
  getError,
}: GenericAttributeListProductSimpleEnumFormProps) {
  // Create an adapter that maps generic attribute list actions to the shared enum slice interface
  const adaptedActions = useMemo<DataTypeProductEnumSlice>(() => {
    return {
      setEnumDataType: (enumMap) => actions.setGenericAttributeListSimpleEnumDataType(elementIndex, enumMap),
      addEnumEntry: (entry) => actions.addGenericAttributeListSimpleEnumEntry(elementIndex, entry),
      removeEnumEntry: (entryIndex) => actions.removeGenericAttributeListSimpleEnumEntry(elementIndex, entryIndex),
      updateEnumEntryLiteral: (entryIndex, literal) =>
        actions.updateGenericAttributeListSimpleEnumEntryLiteral(elementIndex, entryIndex, literal),
      updateEnumEntryOrdinal: (entryIndex, ordinal) =>
        actions.updateGenericAttributeListSimpleEnumEntryOrdinal(elementIndex, entryIndex, ordinal),
      updateEnumEntryDescription: (entryIndex, description) =>
        actions.updateGenericAttributeListSimpleEnumEntryDescription(elementIndex, entryIndex, description),
      updateEnumHexMask: (hexMask) => actions.updateGenericAttributeListSimpleEnumHexMask(elementIndex, hexMask),
      addEmptyEnumEntry: () => actions.addEmptyGenericAttributeListSimpleEnumEntry(elementIndex),
    };
  }, [elementIndex, actions]);

  const dataTypeFieldPath = `${fieldPathPrefix}.genericAttributeListElement[${elementIndex}].dataType`;

  return (
    <DataTypeProductEnumForm
      enumMap={enumMap}
      actions={adaptedActions}
      fieldPathPrefix={dataTypeFieldPath}
      getError={getError}
    />
  );
}
