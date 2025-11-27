import { InputField } from "@/sections/shared/components/forms/input-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormSection } from "@/sections/shared/components/forms/form-section";
import {
  EnumMapFunctionalProfile,
  EnumEntryRecordFunctionalProfile,
} from "@/models";
import { EnumSlice } from "./enum-slice";

interface EnumFormProps {
  dataPointIndex: number;
  enumMap: EnumMapFunctionalProfile;
  enumSlice: EnumSlice;
}

export function EnumForm({
  dataPointIndex,
  enumMap,
  enumSlice,
}: EnumFormProps) {
  return (
    <FormSection title="Enum Configuration" nested>
      <InputField
        label="Hex Mask"
        name={`dataPoint-${dataPointIndex}-enum-hexMask`}
        value={enumMap.hexMask || ""}
        onChange={(value) =>
          enumSlice.updateEnumHexMask(dataPointIndex, value || undefined)
        }
        placeholder="Enter hex mask (e.g., 0xFF)"
      />
      <ArrayField<EnumEntryRecordFunctionalProfile>
        label="Enum Entries"
        items={enumMap.enumEntry}
        onAdd={() => enumSlice.addEmptyEnumEntry(dataPointIndex)}
        onRemove={(entryIndex) =>
          enumSlice.removeEnumEntry(dataPointIndex, entryIndex)
        }
        emptyMessage="No enum entries added"
        renderItem={(entry, entryIndex) => (
          <>
            <InputField
              label="Literal"
              name={`dataPoint-${dataPointIndex}-enum-${entryIndex}-literal`}
              value={entry.literal}
              onChange={(value) =>
                enumSlice.updateEnumEntryLiteral(
                  dataPointIndex,
                  entryIndex,
                  value
                )
              }
              placeholder="Enter enum literal"
              required={true}
            />
            <InputField
              label="Description"
              name={`dataPoint-${dataPointIndex}-enum-${entryIndex}-description`}
              value={entry.description || ""}
              onChange={(value) =>
                enumSlice.updateEnumEntryDescription(
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
