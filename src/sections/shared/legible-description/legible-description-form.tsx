"use client";

import { FormSection } from "@/components/forms/form-section";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { ArrayField } from "@/components/forms/array-field";
import { useFormSection } from "@/hooks/use-form-section";
import { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { LegibleDescription, Language, LANGUAGE_VALUES } from "@/models";
import { createFormOptions } from "@/utils/form-options-utils";

const LANGUAGE_OPTIONS = createFormOptions(LANGUAGE_VALUES);

interface LegibleDescriptionFormProps<TStoreState extends LegibleDescriptionSlice> {
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  stateSelector: (store: TStoreState) => {
    legibleDescriptions?: LegibleDescription[];
  };
  isAddedSelector?: (store: TStoreState) => boolean;
  fieldPathPrefix?: string;
  required?: boolean;
  title?: string;
  description?: string;
  nested?: boolean;
  maxItems?: number;
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
    { legibleDescriptions?: LegibleDescription[] },
    LegibleDescriptionSlice & Record<string, unknown>
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => store as LegibleDescriptionSlice & Record<string, unknown>,
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
            <div className="space-y-4 min-w-0">
              <TextareaField
                label="Text Element"
                name={`${fieldPathPrefix}-${index}-textElement`}
                value={item.textElement}
                onChange={(value) => actions.updateTextElement(index, value)}
                placeholder="Enter description text (max 4000 characters)"
                required={false}
                rows={6}
                error={getError(`${fieldPathPrefix}[${index}].textElement`)}
              />
              <FormGroup columns={showLabel ? 3 : 2}>
                <SelectField
                  label="Language"
                  name={`${fieldPathPrefix}-${index}-language`}
                  options={LANGUAGE_OPTIONS}
                  required={true}
                  value={item.language}
                  onChange={(value) => actions.updateLanguage(index, value as Language)}
                  error={getError(`${fieldPathPrefix}[${index}].language`)}
                />
                <InputField
                  label="URI"
                  name={`${fieldPathPrefix}-${index}-uri`}
                  required={false}
                  type="text"
                  value={item.uri}
                  onChange={(value) => actions.updateUri(index, value || undefined)}
                  placeholder="Optional URI reference"
                  error={getError(`${fieldPathPrefix}[${index}].uri`)}
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
                    error={getError(`${fieldPathPrefix}[${index}].label`)}
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
