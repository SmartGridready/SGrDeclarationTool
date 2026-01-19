"use client";

import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormSection } from "@/components/forms/form-section";
import { BitmapFunctionalProfile, BitmapEntryFunctionalProfile } from "@/models";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";

interface BitmapFormProps {
  dataPointIndex: number;
  bitmap: BitmapFunctionalProfile;
  getError?: (fieldPath: string) => string | undefined;
}

export function BitmapForm({ dataPointIndex, bitmap, getError }: BitmapFormProps) {
  const store = useProfileStore.getState();
  const dataPointListActions = store;

  const fieldPathPrefix = `dataPointList.dataPointListElement[${dataPointIndex}].dataPoint.dataType.bitmap`;

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
        onRemove={(entryIndex) => dataPointListActions.removeBitmapEntry(dataPointIndex, entryIndex)}
        emptyMessage="No bitmap entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`dataPoint-${dataPointIndex}-bitmap-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) => dataPointListActions.updateBitmapEntryLiteral(dataPointIndex, entryIndex, value)}
              placeholder="Enter bitmap literal"
              required={true}
              error={getError ? getError(`${fieldPathPrefix}.bitmapEntry[${entryIndex}].literal`) : undefined}
            />
            <InputField
              label="Description"
              name={`dataPoint-${dataPointIndex}-bitmap-${entryIndex}-description`}
              value={entry.description || ""}
              onChange={(value) =>
                dataPointListActions.updateBitmapEntryDescription(dataPointIndex, entryIndex, value || undefined)
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
