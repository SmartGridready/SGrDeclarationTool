import { InputField } from "@/sections/shared/components/forms/input-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormSection } from "@/sections/shared/components/forms/form-section";
import { BitmapProduct, BitmapEntryProduct } from "@/models";
import { ParameterListBitmapSlice } from "@/sections/functional-profile/data-point-list/parameter-list/data-types/bitmap/bitmap-slice";

interface ParameterListBitmapFormProps {
  dataPointIndex: number;
  paramIndex: number;
  bitmap: BitmapProduct;
  bitmapSlice: ParameterListBitmapSlice;
}

export function ParameterListBitmapForm({
  dataPointIndex,
  paramIndex,
  bitmap,
  bitmapSlice,
}: ParameterListBitmapFormProps) {
  return (
    <FormSection title="Bitmap Configuration" nested>
      <ArrayField<BitmapEntryProduct>
        label="Bitmap Entries"
        items={bitmap.bitmapEntry}
        onAdd={() => bitmapSlice.addEmptyParameterListBitmapEntry(dataPointIndex, paramIndex)}
        onRemove={(entryIndex) =>
          bitmapSlice.removeParameterListBitmapEntry(dataPointIndex, paramIndex, entryIndex)
        }
        emptyMessage="No bitmap entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`dataPoint-${dataPointIndex}-param-${paramIndex}-bitmap-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) =>
                bitmapSlice.updateParameterListBitmapEntryLiteral(
                  dataPointIndex,
                  paramIndex,
                  entryIndex,
                  value
                )
              }
              placeholder="Enter bitmap literal"
              required={true}
            />
            <InputField
              label="Hex Mask"
              name={`dataPoint-${dataPointIndex}-param-${paramIndex}-bitmap-${entryIndex}-hexMask`}
              value={entry.hexMask}
              onChange={(value) =>
                bitmapSlice.updateParameterListBitmapEntryHexMask(
                  dataPointIndex,
                  paramIndex,
                  entryIndex,
                  value
                )
              }
              placeholder="Enter hex mask (e.g., 0xFF)"
              required={true}
            />
            <InputField
              label="Description"
              name={`dataPoint-${dataPointIndex}-param-${paramIndex}-bitmap-${entryIndex}-description`}
              value={entry.description || ""}
              onChange={(value) =>
                bitmapSlice.updateParameterListBitmapEntryDescription(
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
