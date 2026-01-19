"use client";

import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormSection } from "@/components/forms/form-section";
import { EnumMapFunctionalProfile, EnumEntryRecordFunctionalProfile } from "@/models";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";

interface EnumFormProps {
  dataPointIndex: number;
  enumMap: EnumMapFunctionalProfile;
  getError?: (fieldPath: string) => string | undefined;
}

export function EnumForm({ dataPointIndex, enumMap, getError }: EnumFormProps) {
  const store = useProfileStore.getState();
  const dataPointListActions = store;

  const fieldPathPrefix = `dataPointList.dataPointListElement[${dataPointIndex}].dataPoint.dataType.enum`;

  return (
    <FormSection
      title="Enum Configuration"
      description="Define enumeration entries with literal values and optional hex mask"
      nested
      required
    >
      <InputField
        label="Hex Mask"
        name={`dataPoint-${dataPointIndex}-enum-hexMask`}
        value={enumMap.hexMask || ""}
        onChange={(value) => dataPointListActions.updateEnumHexMask(dataPointIndex, value || undefined)}
        placeholder="Enter hex mask (e.g., 0xFF)"
        error={getError ? getError(`${fieldPathPrefix}.hexMask`) : undefined}
      />
      <ArrayField<EnumEntryRecordFunctionalProfile>
        label="Enum Entries"
        items={enumMap.enumEntry}
        onAdd={() => dataPointListActions.addEmptyEnumEntry(dataPointIndex)}
        onRemove={(entryIndex) => dataPointListActions.removeEnumEntry(dataPointIndex, entryIndex)}
        emptyMessage="No enum entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`dataPoint-${dataPointIndex}-enum-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) => dataPointListActions.updateEnumEntryLiteral(dataPointIndex, entryIndex, value)}
              placeholder="Enter enum literal"
              required={true}
              error={getError ? getError(`${fieldPathPrefix}.enumEntry[${entryIndex}].literal`) : undefined}
            />
            <InputField
              label="Description"
              name={`dataPoint-${dataPointIndex}-enum-${entryIndex}-description`}
              value={entry.description || ""}
              onChange={(value) =>
                dataPointListActions.updateEnumEntryDescription(dataPointIndex, entryIndex, value || undefined)
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
