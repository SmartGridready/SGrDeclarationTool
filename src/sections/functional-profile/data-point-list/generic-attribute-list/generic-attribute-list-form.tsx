"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { GenericAttributeFunctionalProfile } from "@/models";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";

interface DataPointGenericAttributeListFormProps {
  dataPointIndex: number;
  genericAttributeList: { genericAttributeListElement?: GenericAttributeFunctionalProfile[] } | undefined;
  getError: (path: string) => string | undefined;
  onAdd: () => void;
  onRemove: () => void;
}

export function DataPointGenericAttributeListForm({
  dataPointIndex,
  genericAttributeList,
  getError,
  onAdd,
  onRemove,
}: DataPointGenericAttributeListFormProps) {
  const store = useProfileStore.getState();
  const dataPointListActions = store;

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
        onAdd={() => dataPointListActions.addDataPointGenericAttribute(dataPointIndex)}
        onRemove={(attributeIndex) =>
          dataPointListActions.removeDataPointGenericAttribute(dataPointIndex, attributeIndex)
        }
        emptyMessage="No attributes added"
        renderItem={(item, attributeIndex) => (
          <InputField
            label="Name"
            name={`dataPoint-${dataPointIndex}-genericAttribute-${attributeIndex}-name`}
            value={item.name}
            onChange={(value) =>
              dataPointListActions.updateDataPointGenericAttributeName(dataPointIndex, attributeIndex, value)
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
