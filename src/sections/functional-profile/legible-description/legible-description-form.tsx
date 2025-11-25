import { useShallow } from "zustand/react/shallow";
import { FormSection } from "@/sections/shared/components/forms/form-section";
import { TextareaField } from "@/sections/shared/components/forms/textarea-field";
import { SelectField } from "@/sections/shared/components/forms/select-field";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { LANGUAGE_OPTIONS } from "./legible-description-form-options";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { LegibleDescription, Language } from "@/models";
import { useProfileValidation } from "@/sections/shared/hooks/use-profile-validation";

/**
 * Selects legible description state and actions with shallow comparison to prevent infinite loops.
 * (Prevents unnecessary re-renders)
 */
function useLegibleDescription() {
  return useProfileStore(
    useShallow((state) => ({
      // State
      legibleDescriptions: state.profile?.functionalProfile?.legibleDescription,
      hasLegibleDescription:
        !!state.profile?.functionalProfile?.legibleDescription,
      // Actions
      addEmptyLegibleDescription: state.addEmptyLegibleDescription,
      removeLegibleDescription: state.removeLegibleDescription,
      removeAllLegibleDescriptions: state.removeAllLegibleDescriptions,
      updateTextElement: state.updateTextElement,
      updateLanguage: state.updateLanguage,
      updateUri: state.updateUri,
    }))
  );
}

export function LegibleDescriptionForm() {
  const {
    legibleDescriptions,
    hasLegibleDescription,
    addEmptyLegibleDescription,
    removeLegibleDescription,
    removeAllLegibleDescriptions,
    updateTextElement,
    updateLanguage,
    updateUri,
  } = useLegibleDescription();

  const { getError } = useProfileValidation();

  const handleAdd = () => {
    // Initialize legible description with one empty entry
    addEmptyLegibleDescription();
  };

  const handleRemove = () => {
    // Remove all legible descriptions from profile
    removeAllLegibleDescriptions();
  };

  return (
    <FormSection
      title={"Legible Description"}
      description={
        "Human-readable descriptions of the functional profile (max 4)"
      }
      required={false}
      isAdded={hasLegibleDescription}
      onAdd={handleAdd}
      onRemove={handleRemove}
    >
      <ArrayField<LegibleDescription>
        label="Descriptions"
        items={legibleDescriptions}
        onAdd={addEmptyLegibleDescription}
        onRemove={removeLegibleDescription}
        emptyMessage="No descriptions added"
        renderItem={(item, index) => (
          <div className="space-y-4">
            <TextareaField
              label="Text Element"
              name={`legibleDescription-${index}-textElement`}
              value={item.textElement}
              onChange={(value) => updateTextElement(index, value)}
              placeholder="Enter description text (max 4000 characters)"
              required={true}
              rows={6}
              error={getError(
                `functionalProfile.legibleDescription.${index}.textElement`
              )}
            />
            <FormGroup columns={2}>
              <SelectField
                label="Language"
                name={`legibleDescription-${index}-language`}
                options={LANGUAGE_OPTIONS}
                required={true}
                value={item.language}
                onChange={(value) => updateLanguage(index, value as Language)}
                error={getError(
                  `functionalProfile.legibleDescription.${index}.language`
                )}
              />
              <InputField
                label="URI"
                name={`legibleDescription-${index}-uri`}
                required={false}
                type="text"
                value={item.uri}
                onChange={(value) => updateUri(index, value || undefined)}
                placeholder="Optional URI reference"
                error={getError(
                  `functionalProfile.legibleDescription.${index}.uri`
                )}
              />
            </FormGroup>
          </div>
        )}
      />
    </FormSection>
  );
}
