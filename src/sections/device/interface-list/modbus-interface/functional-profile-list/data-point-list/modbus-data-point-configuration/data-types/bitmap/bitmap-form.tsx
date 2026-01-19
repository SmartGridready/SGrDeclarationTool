"use client";

import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormSection } from "@/components/forms/form-section";
import { BitmapProduct, BitmapEntryProduct } from "@/models";
import { ModbusDataPointBitmapSlice } from "./bitmap-slice";

interface ModbusDataPointBitmapFormProps {
  functionalProfileIndex: number;
  dataPointIndex: number;
  bitmap: BitmapProduct;
  actions: ModbusDataPointBitmapSlice;
  fieldPathPrefix?: string;
  getError?: (fieldPath: string) => string | undefined;
  title?: string;
  description?: string;
  nested?: boolean;
}

export function ModbusDataPointBitmapForm({
  functionalProfileIndex,
  dataPointIndex,
  bitmap,
  actions,
  fieldPathPrefix = "bitmap",
  getError,
  title = "Bitmap Configuration",
  description = "Define bitmap entries with literal values, hex masks and descriptions",
  nested = true,
}: ModbusDataPointBitmapFormProps) {
  return (
    <FormSection title={title} description={description} nested={nested} required>
      <ArrayField<BitmapEntryProduct>
        label="Bitmap Entries"
        items={bitmap.bitmapEntry}
        onAdd={() => actions.addEmptyModbusDataPointBitmapEntry(functionalProfileIndex, dataPointIndex)}
        onRemove={(entryIndex) =>
          actions.removeModbusDataPointBitmapEntry(functionalProfileIndex, dataPointIndex, entryIndex)
        }
        emptyMessage="No bitmap entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`${fieldPathPrefix}-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) =>
                actions.updateModbusDataPointBitmapEntryLiteral(
                  functionalProfileIndex,
                  dataPointIndex,
                  entryIndex,
                  value
                )
              }
              placeholder="Enter bitmap literal"
              required={true}
              error={getError ? getError(`${fieldPathPrefix}.bitmapEntry[${entryIndex}].literal`) : undefined}
            />
            <InputField
              label="Hex Mask"
              name={`${fieldPathPrefix}-${entryIndex}-hexMask`}
              value={entry.hexMask}
              onChange={(value) =>
                actions.updateModbusDataPointBitmapEntryHexMask(
                  functionalProfileIndex,
                  dataPointIndex,
                  entryIndex,
                  value
                )
              }
              placeholder="Enter hex mask (e.g., 0xFF)"
              required={true}
              error={getError ? getError(`${fieldPathPrefix}.bitmapEntry[${entryIndex}].hexMask`) : undefined}
            />
            <InputField
              label="Description"
              name={`${fieldPathPrefix}-${entryIndex}-description`}
              value={entry.description || ""}
              onChange={(value) =>
                actions.updateModbusDataPointBitmapEntryDescription(
                  functionalProfileIndex,
                  dataPointIndex,
                  entryIndex,
                  value || undefined
                )
              }
              placeholder="Enter description"
              error={getError ? getError(`${fieldPathPrefix}.bitmapEntry[${entryIndex}].description`) : undefined}
            />
          </>
        )}
      />
    </FormSection>
  );
}
