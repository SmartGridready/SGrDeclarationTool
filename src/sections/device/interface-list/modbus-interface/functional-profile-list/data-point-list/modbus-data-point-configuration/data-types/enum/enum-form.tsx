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
          actions.updateModbusDataPointEnumHexMask(
            functionalProfileIndex,
            dataPointIndex,
            value || undefined
          )
        }
        placeholder="Enter hex mask (e.g., 0xFF)"
      />
      <ArrayField<EnumEntry>
        label="Enum Entries"
        items={enumMap.enumEntry}
        onAdd={() =>
          actions.addEmptyModbusDataPointEnumEntry(functionalProfileIndex, dataPointIndex)
        }
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
                actions.updateModbusDataPointEnumEntryLiteral(
                  functionalProfileIndex,
                  dataPointIndex,
                  entryIndex,
                  value
                )
              }
              placeholder="Enter enum literal"
              required={true}
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
            />
          </>
        )}
      />
    </FormSection>
  );
}
