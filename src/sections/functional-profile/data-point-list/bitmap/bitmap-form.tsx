import { InputField } from "@/sections/shared/components/forms/input-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormSection } from "@/sections/shared/components/forms/form-section";
import {
  BitmapFunctionalProfile,
  BitmapEntryFunctionalProfile,
} from "@/models";
import { BitmapSlice } from "@/sections/functional-profile/data-point-list/bitmap/bitmap-slice";

interface BitmapFormProps {
  dataPointIndex: number;
  bitmap: BitmapFunctionalProfile;
  bitmapSlice: BitmapSlice;
}

export function BitmapForm({
  dataPointIndex,
  bitmap,
  bitmapSlice,
}: BitmapFormProps) {
  return (
    <FormSection title="Bitmap Configuration" nested>
      <ArrayField<BitmapEntryFunctionalProfile>
        label="Bitmap Entries"
        items={bitmap.bitmapEntry}
        onAdd={() => bitmapSlice.addEmptyBitmapEntry(dataPointIndex)}
        onRemove={(entryIndex) =>
          bitmapSlice.removeBitmapEntry(dataPointIndex, entryIndex)
        }
        emptyMessage="No bitmap entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`dataPoint-${dataPointIndex}-bitmap-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) =>
                bitmapSlice.updateBitmapEntryLiteral(
                  dataPointIndex,
                  entryIndex,
                  value
                )
              }
              placeholder="Enter bitmap literal"
              required={true}
            />
            <InputField
              label="Description"
              name={`dataPoint-${dataPointIndex}-bitmap-${entryIndex}-description`}
              value={entry.description || ""}
              onChange={(value) =>
                bitmapSlice.updateBitmapEntryDescription(
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
