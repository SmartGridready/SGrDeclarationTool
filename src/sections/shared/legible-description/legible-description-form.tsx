import { LANGUAGE_OPTIONS } from "@/sections/shared/legible-description/legible-description-form-options";
import { useFormSection } from "@/hooks/use-form-section";
import { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { LegibleDescription, Language } from "@/models";
import { TextareaField } from "@/components/forms/textarea-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormSection } from "@/components/forms/form-section";
import { FormGroup } from "@/components/forms/form-group";
import { SelectField } from "@/components/forms/select-field";
import { InputField } from "@/components/forms/input-field";

interface LegibleDescriptionFormProps<TStoreState extends LegibleDescriptionSlice> {
  /**
   * Store hook function (e.g., useProfileStore, useDeviceStore)
   */
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  /**
   * Validation hook function that returns an object with getError method
   */
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  /**
   * Selector to get legibleDescriptions state from the store
   */
  stateSelector: (store: TStoreState) => {
    legibleDescriptions?: LegibleDescription[];
  };
  /**
   * Selector to check if legibleDescriptions exists (for optional legibleDescriptions)
   */
  isAddedSelector?: (store: TStoreState) => boolean;
  /**
   * Field path prefix for validation errors (e.g., "legibleDescription" or "device.deviceInformation.legibleDescription")
   */
  fieldPathPrefix?: string;
  /**
   * Whether legible descriptions are required (if true, add/remove buttons are hidden)
   */
  required?: boolean;
  /**
   * Title for the form section
   */
  title?: string;
  /**
   * Description for the form section
   */
  description?: string;
  /**
   * Whether this is a nested section (affects styling)
   */
  nested?: boolean;
  /**
   * Maximum number of items allowed (default: 4)
   */
  maxItems?: number;
  /**
   * Whether to show the label field (for descriptions that extend legible descriptions with a label)
   */
  showLabel?: boolean;
}

export function LegibleDescriptionForm<TStoreState extends LegibleDescriptionSlice>({
  useStore,
  useValidation,
  stateSelector,
  isAddedSelector,
  fieldPathPrefix = "legibleDescription",
  required = false,
  title = "Legible Description",
  description = "Human-readable descriptions (max 4)",
  nested = false,
  maxItems = 4,
  showLabel = false,
}: LegibleDescriptionFormProps<TStoreState>) {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } = useFormSection<
    TStoreState,
    {
      legibleDescriptions?: LegibleDescription[];
    },
    {
      addEmptyLegibleDescription: () => void;
      removeLegibleDescription: (index: number) => void;
      removeAllLegibleDescriptions: () => void;
      updateTextElement: (index: number, textElement: string) => void;
      updateLanguage: (index: number, language: Language) => void;
      updateUri: (index: number, uri: string | undefined) => void;
      updateLabel?: (index: number, label: string | undefined) => void;
    }
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => ({
      addEmptyLegibleDescription: store.addEmptyLegibleDescription,
      removeLegibleDescription: store.removeLegibleDescription,
      removeAllLegibleDescriptions: store.removeAllLegibleDescriptions,
      updateTextElement: store.updateTextElement,
      updateLanguage: store.updateLanguage,
      updateUri: store.updateUri,
      updateLabel: store.updateLabel,
    }),
    // Only include add/remove functionality if not required
    isAddedSelector: required ? undefined : isAddedSelector,
    onAdd: required ? undefined : (actions) => actions.addEmptyLegibleDescription(),
    onRemove: required ? undefined : (actions) => actions.removeAllLegibleDescriptions(),
  });

  const legibleDescriptions = state.legibleDescriptions;

  return (
    <FormSection
      title={title}
      description={description}
      required={required}
      isAdded={required ? true : isAdded}
      onAdd={required ? undefined : handleAdd}
      onRemove={required ? undefined : handleRemove}
      nested={nested}
    >
      {/* Only render fields when added (or required) */}
      {(required || legibleDescriptions) && (
        <ArrayField<LegibleDescription>
          label="Descriptions"
          items={legibleDescriptions}
          onAdd={actions.addEmptyLegibleDescription}
          onRemove={actions.removeLegibleDescription}
          emptyMessage="No descriptions added"
          maxItems={maxItems}
          renderItem={(item, index) => (
            <div className="space-y-4">
              <TextareaField
                label="Text Element"
                name={`${fieldPathPrefix}-${index}-textElement`}
                value={item.textElement}
                onChange={(value) => actions.updateTextElement(index, value)}
                placeholder="Enter description text (max 4000 characters)"
                required={true}
                rows={6}
                error={getError(`${fieldPathPrefix}.${index}.textElement`)}
              />
              <FormGroup columns={showLabel ? 3 : 2}>
                <SelectField
                  label="Language"
                  name={`${fieldPathPrefix}-${index}-language`}
                  options={LANGUAGE_OPTIONS}
                  required={true}
                  value={item.language}
                  onChange={(value) => actions.updateLanguage(index, value as Language)}
                  error={getError(`${fieldPathPrefix}.${index}.language`)}
                />
                <InputField
                  label="URI"
                  name={`${fieldPathPrefix}-${index}-uri`}
                  required={false}
                  type="text"
                  value={item.uri}
                  onChange={(value) => actions.updateUri(index, value || undefined)}
                  placeholder="Optional URI reference"
                  error={getError(`${fieldPathPrefix}.${index}.uri`)}
                />
                {showLabel && (
                  <InputField
                    label="Label"
                    name={`${fieldPathPrefix}-${index}-label`}
                    required={false}
                    type="text"
                    value={(item as { label?: string }).label || ""}
                    onChange={(value) => actions.updateLabel?.(index, value || undefined)}
                    placeholder="Optional label"
                    error={getError(`${fieldPathPrefix}.${index}.label`)}
                  />
                )}
              </FormGroup>
            </div>
          )}
        />
      )}
    </FormSection>
  );
}
