"use client";

import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormSection } from "@/components/forms/form-section";
import { Enum, EnumEntry } from "@/models";
import { ModbusDataPointEnumSlice } from "./enum-slice";

interface ModbusDataPointEnumFormProps {
  functionalProfileIndex: number;
  dataPointIndex: number;
  enumMap: Enum;
  actions: ModbusDataPointEnumSlice;
  fieldPathPrefix?: string;
  getError?: (fieldPath: string) => string | undefined;
  title?: string;
  description?: string;
  nested?: boolean;
}

export function ModbusDataPointEnumForm({
  functionalProfileIndex,
  dataPointIndex,
  enumMap,
  actions,
  fieldPathPrefix = "enum",
  getError,
  title = "Enum Configuration",
  description = "Define enumeration entries with literal values, ordinals and optional hex mask",
  nested = true,
}: ModbusDataPointEnumFormProps) {
  return (
    <FormSection title={title} description={description} nested={nested} required>
      <InputField
        label="Hex Mask"
        name={`${fieldPathPrefix}-hexMask`}
        value={enumMap.hexMask || ""}
        onChange={(value) =>
          actions.updateModbusDataPointEnumHexMask(functionalProfileIndex, dataPointIndex, value || undefined)
        }
        placeholder="Enter hex mask (e.g., 0xFF)"
        error={getError ? getError(`${fieldPathPrefix}.hexMask`) : undefined}
      />
      <ArrayField<EnumEntry>
        label="Enum Entries"
        items={enumMap.enumEntry}
        onAdd={() => actions.addEmptyModbusDataPointEnumEntry(functionalProfileIndex, dataPointIndex)}
        onRemove={(entryIndex) =>
          actions.removeModbusDataPointEnumEntry(functionalProfileIndex, dataPointIndex, entryIndex)
        }
        emptyMessage="No enum entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`${fieldPathPrefix}-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) =>
                actions.updateModbusDataPointEnumEntryLiteral(functionalProfileIndex, dataPointIndex, entryIndex, value)
              }
              placeholder="Enter enum literal"
              required={true}
              error={getError ? getError(`${fieldPathPrefix}.enumEntry[${entryIndex}].literal`) : undefined}
            />
            <InputField
              label="Ordinal"
              name={`${fieldPathPrefix}-${entryIndex}-ordinal`}
              type="number"
              value={entry.ordinal?.toString() || ""}
              onChange={(value) =>
                actions.updateModbusDataPointEnumEntryOrdinal(
                  functionalProfileIndex,
                  dataPointIndex,
                  entryIndex,
                  value ? parseInt(value, 10) : 0
                )
              }
              placeholder="Enter ordinal number"
              required={true}
              error={getError ? getError(`${fieldPathPrefix}.enumEntry[${entryIndex}].ordinal`) : undefined}
            />
            <InputField
              label="Description"
              name={`${fieldPathPrefix}-${entryIndex}-description`}
              value={entry.description || ""}
              onChange={(value) =>
                actions.updateModbusDataPointEnumEntryDescription(
                  functionalProfileIndex,
                  dataPointIndex,
                  entryIndex,
                  value || undefined
                )
              }
              placeholder="Enter description"
              error={getError ? getError(`${fieldPathPrefix}.enumEntry[${entryIndex}].description`) : undefined}
            />
          </>
        )}
      />
    </FormSection>
  );
}
