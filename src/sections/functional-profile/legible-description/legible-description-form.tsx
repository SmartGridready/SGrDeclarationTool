import { FormSection } from "@/sections/shared/components/forms/form-section";
import { TextareaField } from "@/sections/shared/components/forms/textarea-field";
import { SelectField } from "@/sections/shared/components/forms/select-field";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { LANGUAGE_OPTIONS } from "@/sections/functional-profile/legible-description/legible-description-form-options";
import { useFormSection } from "@/sections/shared/hooks/use-form-section";
import { LegibleDescription, Language } from "@/models";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/sections/shared/hooks/use-profile-validation";

export function LegibleDescriptionForm() {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } = useFormSection({
    useStore: useProfileStore,
    useValidation: useProfileValidation,
    stateSelector: (store) => ({
      legibleDescriptions: store.profile?.functionalProfile?.legibleDescription,
    }),
    actionsSelector: (store) => ({
      addEmptyLegibleDescription: store.addEmptyLegibleDescription,
      removeLegibleDescription: store.removeLegibleDescription,
      removeAllLegibleDescriptions: store.removeAllLegibleDescriptions,
      updateTextElement: store.updateTextElement,
      updateLanguage: store.updateLanguage,
      updateUri: store.updateUri,
    }),
    isAddedSelector: (store) => !!store.profile?.functionalProfile?.legibleDescription,
    onAdd: (actions) => actions.addEmptyLegibleDescription(),
    onRemove: (actions) => actions.removeAllLegibleDescriptions(),
  });

  return (
    <FormSection
      title={"Legible Description"}
      description={"Human-readable descriptions of the functional profile (max 4)"}
      required={false}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
    >
      <ArrayField<LegibleDescription>
        label="Descriptions"
        items={state.legibleDescriptions}
        onAdd={actions.addEmptyLegibleDescription}
        onRemove={actions.removeLegibleDescription}
        emptyMessage="No descriptions added"
        maxItems={4}
        renderItem={(item, index) => (
          <div className="space-y-4">
            <TextareaField
              label="Text Element"
              name={`legibleDescription-${index}-textElement`}
              value={item.textElement}
              onChange={(value) => actions.updateTextElement(index, value)}
              placeholder="Enter description text (max 4000 characters)"
              required={true}
              rows={6}
              error={getError(`functionalProfile.legibleDescription.${index}.textElement`)}
            />
            <FormGroup columns={2}>
              <SelectField
                label="Language"
                name={`legibleDescription-${index}-language`}
                options={LANGUAGE_OPTIONS}
                required={true}
                value={item.language}
                onChange={(value) => actions.updateLanguage(index, value as Language)}
                error={getError(`functionalProfile.legibleDescription.${index}.language`)}
              />
              <InputField
                label="URI"
                name={`legibleDescription-${index}-uri`}
                required={false}
                type="text"
                value={item.uri}
                onChange={(value) => actions.updateUri(index, value || undefined)}
                placeholder="Optional URI reference"
                error={getError(`functionalProfile.legibleDescription.${index}.uri`)}
              />
            </FormGroup>
          </div>
        )}
      />
    </FormSection>
  );
}
