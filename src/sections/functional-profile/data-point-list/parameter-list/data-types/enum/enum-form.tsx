import { InputField } from "@/sections/shared/components/forms/input-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormSection } from "@/sections/shared/components/forms/form-section";
import { EnumMapProduct, EnumEntryProductRecord } from "@/models";
import { ParameterListEnumSlice } from "@/sections/functional-profile/data-point-list/parameter-list/data-types/enum/enum-slice";

interface ParameterListEnumFormProps {
  dataPointIndex: number;
  paramIndex: number;
  enumMap: EnumMapProduct;
  enumSlice: ParameterListEnumSlice;
}

export function ParameterListEnumForm({
  dataPointIndex,
  paramIndex,
  enumMap,
  enumSlice,
}: ParameterListEnumFormProps) {
  return (
    <FormSection title="Enum Configuration" nested>
      <InputField
        label="Hex Mask"
        name={`dataPoint-${dataPointIndex}-param-${paramIndex}-enum-hexMask`}
        value={enumMap.hexMask || ""}
        onChange={(value) =>
          enumSlice.updateParameterListEnumHexMask(dataPointIndex, paramIndex, value || undefined)
        }
        placeholder="Enter hex mask (e.g., 0xFF)"
      />
      <ArrayField<EnumEntryProductRecord>
        label="Enum Entries"
        items={enumMap.enumEntry}
        onAdd={() => enumSlice.addEmptyParameterListEnumEntry(dataPointIndex, paramIndex)}
        onRemove={(entryIndex) =>
          enumSlice.removeParameterListEnumEntry(dataPointIndex, paramIndex, entryIndex)
        }
        emptyMessage="No enum entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`dataPoint-${dataPointIndex}-param-${paramIndex}-enum-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) =>
                enumSlice.updateParameterListEnumEntryLiteral(
                  dataPointIndex,
                  paramIndex,
                  entryIndex,
                  value
                )
              }
              placeholder="Enter enum literal"
              required={true}
            />
            <InputField
              label="Ordinal"
              name={`dataPoint-${dataPointIndex}-param-${paramIndex}-enum-${entryIndex}-ordinal`}
              type="number"
              value={entry.ordinal?.toString() || ""}
              onChange={(value) =>
                enumSlice.updateParameterListEnumEntryOrdinal(
                  dataPointIndex,
                  paramIndex,
                  entryIndex,
                  value ? parseInt(value, 10) : undefined
                )
              }
              placeholder="Enter ordinal number"
            />
            <InputField
              label="Description"
              name={`dataPoint-${dataPointIndex}-param-${paramIndex}-enum-${entryIndex}-description`}
              value={entry.description || ""}
              onChange={(value) =>
                enumSlice.updateParameterListEnumEntryDescription(
                  dataPointIndex,
                  paramIndex,
                  entryIndex,
                  value || undefined
                )
              }
              placeholder="Enter description"
            />
          </>
        )}
      />
    </FormSection>
  );
}
