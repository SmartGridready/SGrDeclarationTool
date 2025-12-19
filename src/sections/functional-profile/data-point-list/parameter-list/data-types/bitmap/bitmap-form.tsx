"use client";

import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormSection } from "@/components/forms/form-section";
import { BitmapProduct, BitmapEntryProduct } from "@/models";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";

interface ParameterListBitmapFormProps {
  dataPointIndex: number;
  paramIndex: number;
  bitmap: BitmapProduct;
}

export function ParameterListBitmapForm({
  dataPointIndex,
  paramIndex,
  bitmap,
}: ParameterListBitmapFormProps) {
  const { dataPointListActions } = useFunctionalProfileFormContext();

  return (
    <FormSection
      title="Bitmap Configuration"
      description="Define bitmap entries with literal values, hex masks and descriptions"
      nested
      required
    >
      <ArrayField<BitmapEntryProduct>
        label="Bitmap Entries"
        items={bitmap.bitmapEntry}
        onAdd={() =>
          dataPointListActions.addEmptyParameterListBitmapEntry(dataPointIndex, paramIndex)
        }
        onRemove={(entryIndex) =>
          dataPointListActions.removeParameterListBitmapEntry(
            dataPointIndex,
            paramIndex,
            entryIndex
          )
        }
        emptyMessage="No bitmap entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`dataPoint-${dataPointIndex}-param-${paramIndex}-bitmap-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) =>
                dataPointListActions.updateParameterListBitmapEntryLiteral(
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
                dataPointListActions.updateParameterListBitmapEntryHexMask(
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
                dataPointListActions.updateParameterListBitmapEntryDescription(
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
