"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { GenericAttributeFunctionalProfile } from "@/models";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { useShallow } from "zustand/react/shallow";

export function GenericAttributeListForm() {
  const state = useProfileStore(
    useShallow((store) => ({
      genericAttributes: store.profile?.genericAttributeList?.genericAttributeListElement,
    }))
  );
  const isAdded = useProfileStore(useShallow((store) => !!store.profile?.genericAttributeList));

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
        items={state.genericAttributes}
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
            error={getError(`genericAttributeList.genericAttributeListElement[${index}].name`)}
          />
        )}
      />
    </FormSection>
  );
}
