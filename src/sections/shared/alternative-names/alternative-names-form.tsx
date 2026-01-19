"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { useFormSection } from "@/hooks/use-form-section";
import { AlternativeNamesSlice } from "@/sections/shared/alternative-names/alternative-names-slice";
import { AlternativeNames } from "@/models";

interface AlternativeNamesFormProps<TStoreState extends AlternativeNamesSlice> {
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  stateSelector: (store: TStoreState) => {
    alternativeNames?: AlternativeNames;
  };
  isAddedSelector?: (store: TStoreState) => boolean;
  fieldPathPrefix?: string;
  required?: boolean;
  title?: string;
  description?: string;
  nested?: boolean;
}

export function AlternativeNamesForm<TStoreState extends AlternativeNamesSlice>({
  useStore,
  useValidation,
  stateSelector,
  isAddedSelector,
  fieldPathPrefix = "alternativeNames",
  required = false,
  title = "Alternative Names",
  description = "Alternative naming conventions",
  nested = false,
}: AlternativeNamesFormProps<TStoreState>) {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } = useFormSection<
    TStoreState,
    { alternativeNames?: AlternativeNames },
    AlternativeNamesSlice & Record<string, unknown>
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => store as AlternativeNamesSlice & Record<string, unknown>,
    isAddedSelector: required ? undefined : isAddedSelector,
    onAdd: required ? undefined : (actions) => actions.addAlternativeNames(),
    onRemove: required ? undefined : (actions) => actions.removeAlternativeNames(),
  });

  const altNames = state.alternativeNames;

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
      {(required || altNames) && (
        <div key={required ? "required" : isAdded ? "added" : "removed"} className="space-y-2">
          <FormGroup columns={2}>
            <InputField
              label={"SLV1 Name"}
              name={"sLV1Name"}
              required={false}
              type="text"
              value={altNames?.sLV1Name}
              onChange={(value) => actions.updateSLV1Name(value || undefined)}
              error={getError(`${fieldPathPrefix}.sLV1Name`)}
            />
            <InputField
              label={"Work Name"}
              name={"workName"}
              required={false}
              type="text"
              value={altNames?.workName}
              onChange={(value) => actions.updateWorkName(value || undefined)}
              error={getError(`${fieldPathPrefix}.workName`)}
            />
          </FormGroup>

          <FormGroup columns={2}>
            <InputField
              label={"Manufacturer Name"}
              name={"manufName"}
              required={false}
              type="text"
              value={altNames?.manufName}
              onChange={(value) => actions.updateManufName(value || undefined)}
              error={getError(`${fieldPathPrefix}.manufName`)}
            />
            <InputField
              label={"IEC 61850 Name"}
              name={"iec61850Name"}
              required={false}
              type="text"
              value={altNames?.iec61850Name}
              onChange={(value) => actions.updateIec61850Name(value || undefined)}
              error={getError(`${fieldPathPrefix}.iec61850Name`)}
            />
          </FormGroup>

          <FormGroup columns={2}>
            <InputField
              label={"SAREF Name"}
              name={"sarefName"}
              required={false}
              type="text"
              value={altNames?.sarefName}
              onChange={(value) => actions.updateSarefName(value || undefined)}
              error={getError(`${fieldPathPrefix}.sarefName`)}
            />
            <InputField
              label={"EEBus Name"}
              name={"eebusName"}
              required={false}
              type="text"
              value={altNames?.eebusName}
              onChange={(value) => actions.updateEebusName(value || undefined)}
              error={getError(`${fieldPathPrefix}.eebusName`)}
            />
          </FormGroup>

          <FormGroup columns={2}>
            <InputField
              label={"SunSpec Name"}
              name={"sunSpecName"}
              required={false}
              type="text"
              value={altNames?.sunSpecName}
              onChange={(value) => actions.updateSunSpecName(value || undefined)}
              error={getError(`${fieldPathPrefix}.sunSpecName`)}
            />
            <InputField
              label={"HP/BWP Name"}
              name={"hpBwpName"}
              required={false}
              type="text"
              value={altNames?.hpBwpName}
              onChange={(value) => actions.updateHpBwpName(value || undefined)}
              error={getError(`${fieldPathPrefix}.hpBwpName`)}
            />
          </FormGroup>

          <FormGroup columns={2}>
            <InputField
              label={"EN 17609 Name"}
              name={"en17609Name"}
              required={false}
              type="text"
              value={altNames?.en17609Name}
              onChange={(value) => actions.updateEn17609Name(value || undefined)}
              error={getError(`${fieldPathPrefix}.en17609Name`)}
            />
          </FormGroup>
        </div>
      )}
    </FormSection>
  );
}
