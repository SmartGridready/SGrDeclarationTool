"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { ArrayField } from "@/components/forms/array-field";
import { GenericAttributeFunctionalProfile } from "@/models";
import { useFunctionalProfileFormContext, buildProfileFieldPath } from "@/context/functional-profile-form-context";

export function GenericAttributeListForm() {
  const { useProfileState, useValidation, pathPrefix, genericAttributeListActions } = useFunctionalProfileFormContext();

  const state = useProfileState((profile) => ({
    genericAttributes: profile?.genericAttributeList?.genericAttributeListElement,
  }));
  const isAdded = useProfileState((profile) => !!profile?.genericAttributeList);

  const { getError: getRawError } = useValidation();
  const getError = (fieldPath: string) => getRawError(buildProfileFieldPath(pathPrefix, fieldPath));

  const actions = genericAttributeListActions;

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
            error={getError(`genericAttributeList.genericAttributeListElement.${index}.name`)}
          />
        )}
      />
    </FormSection>
  );
}
