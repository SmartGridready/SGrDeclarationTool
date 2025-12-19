"use client";

import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormSection } from "@/components/forms/form-section";
import { BitmapFunctionalProfile, BitmapEntryFunctionalProfile } from "@/models";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";

interface BitmapFormProps {
  dataPointIndex: number;
  bitmap: BitmapFunctionalProfile;
}

export function BitmapForm({ dataPointIndex, bitmap }: BitmapFormProps) {
  const { dataPointListActions } = useFunctionalProfileFormContext();

  return (
    <FormSection
      title="Bitmap Configuration"
      description="Define bitmap entries with literal values and descriptions"
      nested
      required
    >
      <ArrayField<BitmapEntryFunctionalProfile>
        label="Bitmap Entries"
        items={bitmap.bitmapEntry}
        onAdd={() => dataPointListActions.addEmptyBitmapEntry(dataPointIndex)}
        onRemove={(entryIndex) =>
          dataPointListActions.removeBitmapEntry(dataPointIndex, entryIndex)
        }
        emptyMessage="No bitmap entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`dataPoint-${dataPointIndex}-bitmap-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) =>
                dataPointListActions.updateBitmapEntryLiteral(dataPointIndex, entryIndex, value)
              }
              placeholder="Enter bitmap literal"
              required={true}
            />
            <InputField
              label="Description"
              name={`dataPoint-${dataPointIndex}-bitmap-${entryIndex}-description`}
              value={entry.description || ""}
              onChange={(value) =>
                dataPointListActions.updateBitmapEntryDescription(
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
