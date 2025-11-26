import { useShallow } from "zustand/react/shallow";
import { FormSection } from "@/sections/shared/components/forms/form-section";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { GenericAttributeFunctionalProfile } from "@/models";
import { useProfileValidation } from "@/sections/shared/hooks/use-profile-validation";

/**
 * Selects generic attribute list state and actions with shallow comparison to prevent infinite loops.
 * (Prevents unnecessary re-renders)
 */
function useGenericAttributeList() {
  return useProfileStore(
    useShallow((state) => ({
      // State
      genericAttributes:
        state.profile?.genericAttributeList?.genericAttributeListElement,
      hasGenericAttributeList: !!state.profile?.genericAttributeList,
      // Actions
      addEmptyGenericAttribute: state.addEmptyGenericAttribute,
      removeGenericAttribute: state.removeGenericAttribute,
      removeAllGenericAttributes: state.removeAllGenericAttributes,
      updateGenericAttributeName: state.updateGenericAttributeName,
    }))
  );
}

export function GenericAttributeListForm() {
  const {
    genericAttributes,
    hasGenericAttributeList,
    addEmptyGenericAttribute,
    removeGenericAttribute,
    removeAllGenericAttributes,
    updateGenericAttributeName,
  } = useGenericAttributeList();

  const { getError } = useProfileValidation();

  const handleAdd = () => {
    addEmptyGenericAttribute();
  };

  const handleRemove = () => {
    removeAllGenericAttributes();
  };

  return (
    <FormSection
      title={"Generic Attribute List"}
      description={"Custom attributes for the functional profile"}
      required={false}
      isAdded={hasGenericAttributeList}
      onAdd={handleAdd}
      onRemove={handleRemove}
    >
      <ArrayField<GenericAttributeFunctionalProfile>
        label="Attributes"
        items={genericAttributes}
        onAdd={addEmptyGenericAttribute}
        onRemove={removeGenericAttribute}
        emptyMessage="No attributes added"
        renderItem={(item, index) => (
          <InputField
            label="Name"
            name={`genericAttribute-${index}-name`}
            value={item.name}
            onChange={(value) => updateGenericAttributeName(index, value)}
            placeholder="Enter attribute name"
            required={true}
            error={getError(
              `genericAttributeList.genericAttributeListElement.${index}.name`
            )}
          />
        )}
      />
    </FormSection>
  );
}
