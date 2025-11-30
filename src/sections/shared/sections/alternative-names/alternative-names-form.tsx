import { FormSection } from "@/sections/shared/components/forms/form-section";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { useFormSection } from "@/sections/shared/hooks/use-form-section";
import { AlternativeNamesSlice } from "@/sections/shared/sections/alternative-names/alternative-names-slice";
import { AlternativeNames } from "@/models";

interface AlternativeNamesFormProps<TStoreState extends AlternativeNamesSlice> {
  /**
   * Store hook function (e.g., useProfileStore, useDeviceStore)
   */
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  /**
   * Validation hook function that returns an object with getError method
   */
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  /**
   * Selector to get alternativeNames state from the store
   */
  stateSelector: (store: TStoreState) => {
    alternativeNames?: AlternativeNames;
  };
  /**
   * Selector to check if alternativeNames exists (for optional alternativeNames)
   */
  isAddedSelector?: (store: TStoreState) => boolean;
  /**
   * Field path prefix for validation errors (e.g., "alternativeNames" or "device.deviceInformation.alternativeNames")
   */
  fieldPathPrefix?: string;
  /**
   * Whether alternative names are required (if true, add/remove buttons are hidden)
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
    {
      alternativeNames?: AlternativeNames;
    },
    {
      updateSLV1Name: (value: string | undefined) => void;
      updateWorkName: (value: string | undefined) => void;
      updateManufName: (value: string | undefined) => void;
      updateIec61850Name: (value: string | undefined) => void;
      updateSarefName: (value: string | undefined) => void;
      updateEebusName: (value: string | undefined) => void;
      updateSunSpecName: (value: string | undefined) => void;
      updateHpBwpName: (value: string | undefined) => void;
      updateEn17609Name: (value: string | undefined) => void;
      addAlternativeNames: () => void;
      removeAlternativeNames: () => void;
    }
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => ({
      updateSLV1Name: store.updateSLV1Name,
      updateWorkName: store.updateWorkName,
      updateManufName: store.updateManufName,
      updateIec61850Name: store.updateIec61850Name,
      updateSarefName: store.updateSarefName,
      updateEebusName: store.updateEebusName,
      updateSunSpecName: store.updateSunSpecName,
      updateHpBwpName: store.updateHpBwpName,
      updateEn17609Name: store.updateEn17609Name,
      addAlternativeNames: store.addAlternativeNames,
      removeAlternativeNames: store.removeAlternativeNames,
    }),
    // Only include add/remove functionality if not required and not nested
    // Nested subsections don't have add/remove buttons - they're always present
    isAddedSelector: required || nested ? undefined : isAddedSelector,
    onAdd: required || nested ? undefined : (actions) => actions.addAlternativeNames(),
    onRemove: required || nested ? undefined : (actions) => actions.removeAlternativeNames(),
  });

  const altNames = state.alternativeNames;

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
      {/* For nested subsections, always render fields (object is created on first edit) */}
      {/* For sections, only render when added */}
      {(nested || altNames) && (
        <div key={nested ? "nested" : isAdded ? "added" : "removed"} className="space-y-2">
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
