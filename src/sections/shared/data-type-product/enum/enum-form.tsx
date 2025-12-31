"use client";

import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormSection } from "@/components/forms/form-section";
import { EnumMapProduct, EnumEntryProductRecord } from "@/models";
import { DataTypeProductEnumSlice } from "@/sections/shared/data-type-product/enum/enum-slice";

interface DataTypeProductEnumFormProps {
  enumMap: EnumMapProduct;
  actions: DataTypeProductEnumSlice;
  fieldPathPrefix?: string;
  title?: string;
  description?: string;
  nested?: boolean;
}

export function DataTypeProductEnumForm({
  enumMap,
  actions,
  fieldPathPrefix = "enum",
  title = "Enum Configuration",
  description = "Define enumeration entries with literal values, ordinals and optional hex mask",
  nested = true,
}: DataTypeProductEnumFormProps) {
  return (
    <FormSection title={title} description={description} nested={nested} required>
      <InputField
        label="Hex Mask"
        name={`${fieldPathPrefix}-hexMask`}
        value={enumMap.hexMask || ""}
        onChange={(value) => actions.updateEnumHexMask(value || undefined)}
        placeholder="Enter hex mask (e.g., 0xFF)"
      />
      <ArrayField<EnumEntryProductRecord>
        label="Enum Entries"
        items={enumMap.enumEntry}
        onAdd={() => actions.addEmptyEnumEntry()}
        onRemove={(entryIndex) => actions.removeEnumEntry(entryIndex)}
        emptyMessage="No enum entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`${fieldPathPrefix}-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) => actions.updateEnumEntryLiteral(entryIndex, value)}
              placeholder="Enter enum literal"
              required={true}
            />
            <InputField
              label="Ordinal"
              name={`${fieldPathPrefix}-${entryIndex}-ordinal`}
              type="number"
              value={entry.ordinal?.toString() || ""}
              onChange={(value) => actions.updateEnumEntryOrdinal(entryIndex, value ? parseInt(value, 10) : undefined)}
              placeholder="Enter ordinal number"
            />
            <InputField
              label="Description"
              name={`${fieldPathPrefix}-${entryIndex}-description`}
              value={entry.description || ""}
              onChange={(value) => actions.updateEnumEntryDescription(entryIndex, value || undefined)}
              placeholder="Enter description"
            />
          </>
        )}
      />
    </FormSection>
  );
}
