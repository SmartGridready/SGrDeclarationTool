"use client";

import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormSection } from "@/components/forms/form-section";
import { BitmapProduct, BitmapEntryProduct } from "@/models";
import { DataTypeProductBitmapSlice } from "@/sections/shared/data-type-product/bitmap/bitmap-slice";

interface DataTypeProductBitmapFormProps {
  bitmap: BitmapProduct;
  actions: DataTypeProductBitmapSlice;
  fieldPathPrefix?: string;
  title?: string;
  description?: string;
  nested?: boolean;
}

export function DataTypeProductBitmapForm({
  bitmap,
  actions,
  fieldPathPrefix = "bitmap",
  title = "Bitmap Configuration",
  description = "Define bitmap entries with literal values, hex masks and descriptions",
  nested = true,
}: DataTypeProductBitmapFormProps) {
  return (
    <FormSection title={title} description={description} nested={nested} required>
      <ArrayField<BitmapEntryProduct>
        label="Bitmap Entries"
        items={bitmap.bitmapEntry}
        onAdd={() => actions.addEmptyBitmapEntry()}
        onRemove={(entryIndex) => actions.removeBitmapEntry(entryIndex)}
        emptyMessage="No bitmap entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`${fieldPathPrefix}-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) => actions.updateBitmapEntryLiteral(entryIndex, value)}
              placeholder="Enter bitmap literal"
              required={true}
            />
            <InputField
              label="Hex Mask"
              name={`${fieldPathPrefix}-${entryIndex}-hexMask`}
              value={entry.hexMask}
              onChange={(value) => actions.updateBitmapEntryHexMask(entryIndex, value)}
              placeholder="Enter hex mask (e.g., 0xFF)"
              required={true}
            />
            <InputField
              label="Description"
              name={`${fieldPathPrefix}-${entryIndex}-description`}
              value={entry.description || ""}
              onChange={(value) =>
                actions.updateBitmapEntryDescription(entryIndex, value || undefined)
              }
              placeholder="Enter description"
            />
          </>
        )}
      />
    </FormSection>
  );
}
