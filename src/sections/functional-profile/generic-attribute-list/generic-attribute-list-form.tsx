"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { GenericAttributeFunctionalProfile } from "@/models";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { useProfileField } from "@/hooks/use-store-field";

export function GenericAttributeListForm() {
  // Granular selectors for targeted re-renders
  const genericAttributes = useProfileField((p) => p?.genericAttributeList?.genericAttributeListElement);
  const isAdded = useProfileField((p) => !!p?.genericAttributeList);

  const { getError } = useProfileValidation();
  const store = useProfileStore.getState();
  const actions = store;

  const handleAdd = () => actions.addEmptyGenericAttribute();
  const handleRemove = () => actions.removeAllGenericAttributes();

  return (
    <FormSection
      title={"Generic Attribute List"}
      description={"Custom attributes for the functional profile"}
      required={false}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
    >
      <ArrayField<GenericAttributeFunctionalProfile>
        label="Attributes"
        items={genericAttributes}
        onAdd={actions.addEmptyGenericAttribute}
        onRemove={actions.removeGenericAttribute}
        emptyMessage="No attributes added"
        renderItem={(item, index) => (
          <InputField
            label="Name"
            name={`genericAttribute-${index}-name`}
            value={item.name}
            onChange={(value) => actions.updateGenericAttributeName(index, value)}
            placeholder="Enter attribute name"
            required={true}
            error={getError(`genericAttributeList.genericAttributeListElement.${index}.name`)}
          />
        )}
      />
    </FormSection>
  );
}
