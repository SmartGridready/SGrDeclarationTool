"use client";

import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormSection } from "@/components/forms/form-section";
import { EnumMapProduct, EnumEntryProductRecord } from "@/models";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";

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

  return (
    <FormSection
      title="Enum Configuration"
      description="Define enumeration entries with literal values, ordinals and optional hex mask"
      nested
      required
    >
      <InputField
        label="Hex Mask"
        name={`dataPoint-${dataPointIndex}-param-${paramIndex}-enum-hexMask`}
        value={enumMap.hexMask || ""}
        onChange={(value) =>
          dataPointListActions.updateParameterListEnumHexMask(
            dataPointIndex,
            paramIndex,
            value || undefined
          )
        }
        placeholder="Enter hex mask (e.g., 0xFF)"
      />
      <ArrayField<EnumEntryProductRecord>
        label="Enum Entries"
        items={enumMap.enumEntry}
        onAdd={() =>
          dataPointListActions.addEmptyParameterListEnumEntry(dataPointIndex, paramIndex)
        }
        onRemove={(entryIndex) =>
          dataPointListActions.removeParameterListEnumEntry(dataPointIndex, paramIndex, entryIndex)
        }
        emptyMessage="No enum entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`dataPoint-${dataPointIndex}-param-${paramIndex}-enum-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) =>
                dataPointListActions.updateParameterListEnumEntryLiteral(
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
                dataPointListActions.updateParameterListEnumEntryOrdinal(
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
                dataPointListActions.updateParameterListEnumEntryDescription(
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
