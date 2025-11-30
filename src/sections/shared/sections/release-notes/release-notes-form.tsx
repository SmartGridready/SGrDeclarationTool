import { FormSection } from "@/sections/shared/components/forms/form-section";
import { SelectField } from "@/sections/shared/components/forms/select-field";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { DateField } from "@/sections/shared/components/forms/date-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { RELEASE_STATE_OPTIONS } from "@/sections/shared/sections/release-notes/release-notes-form-options";
import { useFormSection } from "@/sections/shared/hooks/use-form-section";
import { ReleaseState, ChangeLog } from "@/models/generic/base-types";
import { ReleaseNotesSlice } from "@/sections/shared/sections/release-notes/release-notes-slice";

interface ReleaseNotesFormProps<TStoreState extends ReleaseNotesSlice> {
  /**
   * Store hook function (e.g., useProfileStore, useDeviceStore)
   */
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  /**
   * Validation hook function that returns an object with getError method
   */
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  /**
   * Selector to get releaseNotes state from the store
   */
  stateSelector: (store: TStoreState) => {
    releaseState?: ReleaseState;
    remarks?: string;
    changeLogs?: ChangeLog[];
  };
  /**
   * Selector to check if releaseNotes exists (for optional releaseNotes)
   */
  isAddedSelector?: (store: TStoreState) => boolean;
  /**
   * Field path prefix for validation errors (e.g., "releaseNotes" or "device.releaseNotes")
   */
  fieldPathPrefix?: string;
  /**
   * Whether release notes are required (if true, add/remove buttons are hidden)
   */
  required?: boolean;
}

export function ReleaseNotesForm<TStoreState extends ReleaseNotesSlice>({
  useStore,
  useValidation,
  stateSelector,
  isAddedSelector,
  fieldPathPrefix = "releaseNotes",
  required = false,
}: ReleaseNotesFormProps<TStoreState>) {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } = useFormSection<
    TStoreState,
    {
      releaseState?: ReleaseState;
      remarks?: string;
      changeLogs?: ChangeLog[];
    },
    {
      updateReleaseState: (state: ReleaseState) => void;
      updateRemarks: (remarks: string | undefined) => void;
      addEmptyChangeLog: () => void;
      removeChangeLog: (index: number) => void;
      updateChangeLogField: (index: number, field: keyof ChangeLog, value: string) => void;
      addReleaseNotes: () => void;
      removeReleaseNotes: () => void;
    }
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => ({
      updateReleaseState: store.updateReleaseState,
      updateRemarks: store.updateRemarks,
      addEmptyChangeLog: store.addEmptyChangeLog,
      removeChangeLog: store.removeChangeLog,
      updateChangeLogField: store.updateChangeLogField,
      addReleaseNotes: store.addReleaseNotes,
      removeReleaseNotes: store.removeReleaseNotes,
    }),
    // Only include add/remove functionality if not required
    isAddedSelector: required ? undefined : isAddedSelector,
    onAdd: required ? undefined : (actions) => actions.addReleaseNotes(),
    onRemove: required ? undefined : (actions) => actions.removeReleaseNotes(),
  });

  return (
    <FormSection
      title={"Release Notes"}
      description={"Version and release information"}
      required={required}
      isAdded={required ? true : isAdded}
      onAdd={required ? undefined : handleAdd}
      onRemove={required ? undefined : handleRemove}
    >
      <FormGroup columns={2}>
        <SelectField
          label={"Release State"}
          name={"releaseState"}
          options={RELEASE_STATE_OPTIONS}
          required={true}
          value={state.releaseState}
          onChange={(value) => actions.updateReleaseState(value as ReleaseState)}
          error={getError(`${fieldPathPrefix}.state`)}
        />

        <InputField
          label={"Remarks"}
          name={"remarks"}
          required={false}
          value={state.remarks}
          onChange={(value) => actions.updateRemarks(value as string | undefined)}
        />
      </FormGroup>

      <ArrayField<ChangeLog>
        label="Change Log"
        items={state.changeLogs}
        onAdd={actions.addEmptyChangeLog}
        onRemove={actions.removeChangeLog}
        emptyMessage="No change log entries"
        renderItem={(item, index) => (
          <FormGroup columns={2}>
            <InputField
              label="Version"
              name={`changeLog-${index}-version`}
              value={item.version}
              onChange={(value) => actions.updateChangeLogField(index, "version", value)}
              placeholder="e.g., 1.0.0"
              required={true}
              error={getError(`${fieldPathPrefix}.changeLog.${index}.version`)}
            />
            <DateField
              label="Date"
              name={`changeLog-${index}-date`}
              value={item.date}
              onChange={(value) => actions.updateChangeLogField(index, "date", value)}
              required={true}
              error={getError(`${fieldPathPrefix}.changeLog.${index}.date`)}
            />
            <InputField
              label="Author"
              name={`changeLog-${index}-author`}
              value={item.author}
              onChange={(value) => actions.updateChangeLogField(index, "author", value)}
              placeholder="Author name"
              required={true}
              error={getError(`${fieldPathPrefix}.changeLog.${index}.author`)}
            />
            <InputField
              label="Comment"
              name={`changeLog-${index}-comment`}
              value={item.comment}
              onChange={(value) => actions.updateChangeLogField(index, "comment", value)}
              placeholder="Change description"
              required={true}
              error={getError(`${fieldPathPrefix}.changeLog.${index}.comment`)}
            />
          </FormGroup>
        )}
      />
    </FormSection>
  );
}
