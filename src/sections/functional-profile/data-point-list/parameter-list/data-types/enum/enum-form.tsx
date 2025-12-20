"use client";

import { EnumMapProduct } from "@/models";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";
import { DataTypeProductEnumForm } from "@/sections/shared/data-type-product/enum/enum-form";
import { DataTypeProductEnumSlice } from "@/sections/shared/data-type-product/enum/enum-slice";
import { useMemo } from "react";

interface ParameterListEnumFormProps {
  dataPointIndex: number;
  paramIndex: number;
  enumMap: EnumMapProduct;
}

export function ParameterListEnumForm({
  dataPointIndex,
  paramIndex,
  enumMap,
}: ParameterListEnumFormProps) {
  const { dataPointListActions } = useFunctionalProfileFormContext();

  // Create an adapter that maps parameter list actions to the shared enum slice interface
  const adaptedActions = useMemo<DataTypeProductEnumSlice>(() => {
    return {
      setEnumDataType: (enumMap) =>
        dataPointListActions.setParameterListEnumDataType(dataPointIndex, paramIndex, enumMap),
      addEnumEntry: (entry) =>
        dataPointListActions.addParameterListEnumEntry(dataPointIndex, paramIndex, entry),
      removeEnumEntry: (entryIndex) =>
        dataPointListActions.removeParameterListEnumEntry(dataPointIndex, paramIndex, entryIndex),
      updateEnumEntryLiteral: (entryIndex, literal) =>
        dataPointListActions.updateParameterListEnumEntryLiteral(
          dataPointIndex,
          paramIndex,
          entryIndex,
          literal
        ),
      updateEnumEntryOrdinal: (entryIndex, ordinal) =>
        dataPointListActions.updateParameterListEnumEntryOrdinal(
          dataPointIndex,
          paramIndex,
          entryIndex,
          ordinal
        ),
      updateEnumEntryDescription: (entryIndex, description) =>
        dataPointListActions.updateParameterListEnumEntryDescription(
          dataPointIndex,
          paramIndex,
          entryIndex,
          description
        ),
      updateEnumHexMask: (hexMask) =>
        dataPointListActions.updateParameterListEnumHexMask(dataPointIndex, paramIndex, hexMask),
      addEmptyEnumEntry: () =>
        dataPointListActions.addEmptyParameterListEnumEntry(dataPointIndex, paramIndex),
    };
  }, [dataPointIndex, paramIndex, dataPointListActions]);

  return (
    <DataTypeProductEnumForm
      enumMap={enumMap}
      actions={adaptedActions}
      fieldPathPrefix={`dataPoint-${dataPointIndex}-param-${paramIndex}-enum`}
    />
  );
}
