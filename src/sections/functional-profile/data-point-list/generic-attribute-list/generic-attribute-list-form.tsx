import { FormSection } from "@/sections/shared/components/forms/form-section";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { GenericAttributeFunctionalProfile } from "@/models";
import { DataPointGenericAttributeListSlice } from "./generic-attribute-list-slice";

interface DataPointGenericAttributeListFormProps {
  dataPointIndex: number;
  genericAttributeList:
    | { genericAttributeListElement?: GenericAttributeFunctionalProfile[] }
    | undefined;
  genericAttributeListSlice: DataPointGenericAttributeListSlice;
  getError: (path: string) => string | undefined;
  onAdd: () => void;
  onRemove: () => void;
}

export function DataPointGenericAttributeListForm({
  dataPointIndex,
  genericAttributeList,
  genericAttributeListSlice,
  getError,
  onAdd,
  onRemove,
}: DataPointGenericAttributeListFormProps) {
  return (
    <FormSection
      title="Generic Attribute List"
      description="Custom attributes for this data point"
      required={false}
      isAdded={!!genericAttributeList}
      onAdd={onAdd}
      onRemove={onRemove}
      nested
    >
      <ArrayField<GenericAttributeFunctionalProfile>
        label="Attributes"
        items={genericAttributeList?.genericAttributeListElement}
        onAdd={() => genericAttributeListSlice.addDataPointGenericAttribute(dataPointIndex)}
        onRemove={(attributeIndex) =>
          genericAttributeListSlice.removeDataPointGenericAttribute(dataPointIndex, attributeIndex)
        }
        emptyMessage="No attributes added"
        renderItem={(item, attributeIndex) => (
          <InputField
            label="Name"
            name={`dataPoint-${dataPointIndex}-genericAttribute-${attributeIndex}-name`}
            value={item.name}
            onChange={(value) =>
              genericAttributeListSlice.updateDataPointGenericAttributeName(
                dataPointIndex,
                attributeIndex,
                value
              )
            }
            placeholder="Enter attribute name"
            required={true}
            error={getError(
              `dataPointList.dataPointListElement.${dataPointIndex}.genericAttributeList.genericAttributeListElement.${attributeIndex}.name`
            )}
          />
        )}
      />
    </FormSection>
  );
}
