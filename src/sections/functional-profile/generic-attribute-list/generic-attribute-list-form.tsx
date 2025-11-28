import { FormSection } from "@/sections/shared/components/forms/form-section";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { useFormSection } from "@/sections/shared/hooks/use-form-section";
import { GenericAttributeFunctionalProfile } from "@/models";

export function GenericAttributeListForm() {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } = useFormSection({
    stateSelector: (store) => ({
      genericAttributes: store.profile?.genericAttributeList?.genericAttributeListElement,
    }),
    actionsSelector: (store) => ({
      addEmptyGenericAttribute: store.addEmptyGenericAttribute,
      removeGenericAttribute: store.removeGenericAttribute,
      removeAllGenericAttributes: store.removeAllGenericAttributes,
      updateGenericAttributeName: store.updateGenericAttributeName,
    }),
    isAddedSelector: (store) => !!store.profile?.genericAttributeList,
    onAdd: (actions) => actions.addEmptyGenericAttribute(),
    onRemove: (actions) => actions.removeAllGenericAttributes(),
  });

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
