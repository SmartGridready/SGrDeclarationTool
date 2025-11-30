import { FormSection } from "@/sections/shared/components/forms/form-section";
import { TextareaField } from "@/sections/shared/components/forms/textarea-field";
import { SelectField } from "@/sections/shared/components/forms/select-field";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { LANGUAGE_OPTIONS } from "@/sections/shared/sections/legible-description/legible-description-form-options";
import { useFormSection } from "@/sections/shared/hooks/use-form-section";
import { LegibleDescriptionSlice } from "@/sections/shared/sections/legible-description/legible-description-slice";
import { LegibleDescription, Language } from "@/models";

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
    }),
    // Only include add/remove functionality if not required and not nested
    // Nested subsections don't have add/remove buttons - they're always present
    isAddedSelector: required || nested ? undefined : isAddedSelector,
    onAdd: required || nested ? undefined : (actions) => actions.addEmptyLegibleDescription(),
    onRemove: required || nested ? undefined : (actions) => actions.removeAllLegibleDescriptions(),
  });

  const legibleDescriptions = state.legibleDescriptions;

  return (
    <FormSection
      title={title}
      description={description}
      required={required || nested}
      isAdded={required || nested ? true : isAdded}
      onAdd={required || nested ? undefined : handleAdd}
      onRemove={required || nested ? undefined : handleRemove}
      nested={nested}
    >
      {/* For nested subsections, always render fields (array is created on first edit) */}
      {/* For sections, only render when added */}
      {(nested || legibleDescriptions) && (
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
              <FormGroup columns={2}>
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
              </FormGroup>
            </div>
          )}
        />
      )}
    </FormSection>
  );
}
