"use client";

import { FormSection } from "@/components/forms/form-section";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { DateField } from "@/components/forms/date-field";
import { ArrayField } from "@/components/forms/array-field";
import { useFormSection } from "@/hooks/use-form-section";
import { ReleaseNotesSlice } from "@/sections/shared/release-notes/release-notes-slice";
import { ReleaseState, ChangeLog, RELEASE_STATE_VALUES } from "@/models";
import { createFormOptions } from "@/utils/form-options-utils";

const RELEASE_STATE_OPTIONS = createFormOptions(RELEASE_STATE_VALUES);

interface ReleaseNotesFormProps<TStoreState extends ReleaseNotesSlice> {
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  stateSelector: (store: TStoreState) => {
    releaseState?: ReleaseState;
    remarks?: string;
    changeLogs?: ChangeLog[];
  };
  isAddedSelector?: (store: TStoreState) => boolean;
  fieldPathPrefix?: string;
  required?: boolean;
  title?: string;
  description?: string;
  nested?: boolean;
}

export function ReleaseNotesForm<TStoreState extends ReleaseNotesSlice>({
  useStore,
  useValidation,
  stateSelector,
  isAddedSelector,
  fieldPathPrefix = "releaseNotes",
  required = false,
  title = "Release Notes",
  description = "Version and release information",
  nested = false,
}: ReleaseNotesFormProps<TStoreState>) {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } = useFormSection<
    TStoreState,
    { releaseState?: ReleaseState; remarks?: string; changeLogs?: ChangeLog[] },
    ReleaseNotesSlice & Record<string, unknown>
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => store as ReleaseNotesSlice & Record<string, unknown>,
    isAddedSelector: required ? undefined : isAddedSelector,
    onAdd: required ? undefined : (actions) => actions.addReleaseNotes(),
    onRemove: required ? undefined : (actions) => actions.removeReleaseNotes(),
  });

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
              error={getError(`${fieldPathPrefix}.changeLog[${index}].version`)}
            />
            <DateField
              label="Date"
              name={`changeLog-${index}-date`}
              value={item.date}
              onChange={(value) => actions.updateChangeLogField(index, "date", value)}
              required={true}
              error={getError(`${fieldPathPrefix}.changeLog[${index}].date`)}
            />
            <InputField
              label="Author"
              name={`changeLog-${index}-author`}
              value={item.author}
              onChange={(value) => actions.updateChangeLogField(index, "author", value)}
              placeholder="Author name"
              required={true}
              error={getError(`${fieldPathPrefix}.changeLog[${index}].author`)}
            />
            <InputField
              label="Comment"
              name={`changeLog-${index}-comment`}
              value={item.comment}
              onChange={(value) => actions.updateChangeLogField(index, "comment", value)}
              placeholder="Change description"
              required={true}
              error={getError(`${fieldPathPrefix}.changeLog[${index}].comment`)}
            />
          </FormGroup>
        )}
      />
    </FormSection>
  );
}
