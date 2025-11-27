import { FormSection } from "@/sections/shared/components/forms/form-section";
import { SelectField } from "@/sections/shared/components/forms/select-field";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { DateField } from "@/sections/shared/components/forms/date-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { RELEASE_STATE_OPTIONS } from "@/sections/functional-profile/release-notes/release-notes-form-options";
import { useFormSection } from "@/sections/shared/hooks/use-form-section";
import { ReleaseState, ChangeLog } from "@/models/generic/base-types";

export function ReleaseNotesForm() {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } =
    useFormSection({
      stateSelector: (store) => ({
        releaseState: store.profile?.releaseNotes?.state,
        remarks: store.profile?.releaseNotes?.remarks,
        changeLogs: store.profile?.releaseNotes?.changeLog,
      }),
      actionsSelector: (store) => ({
        updateReleaseState: store.updateReleaseState,
        updateRemarks: store.updateRemarks,
        addEmptyChangeLog: store.addEmptyChangeLog,
        removeChangeLog: store.removeChangeLog,
        updateChangeLogField: store.updateChangeLogField,
        addReleaseNotes: store.addReleaseNotes,
        removeReleaseNotes: store.removeReleaseNotes,
      }),
      isAddedSelector: (store) => !!store.profile?.releaseNotes,
      onAdd: (actions) => actions.addReleaseNotes(),
      onRemove: (actions) => actions.removeReleaseNotes(),
    });

  return (
    <FormSection
      title={"Release Notes"}
      description={"Version and release information"}
      required={false}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
    >
      <FormGroup columns={2}>
        <SelectField
          label={"Release State"}
          name={"releaseState"}
          options={RELEASE_STATE_OPTIONS}
          required={true}
          value={state.releaseState}
          onChange={(value) =>
            actions.updateReleaseState(value as ReleaseState)
          }
          error={getError("releaseNotes.state")}
        />

        <InputField
          label={"Remarks"}
          name={"remarks"}
          required={false}
          value={state.remarks}
          onChange={(value) =>
            actions.updateRemarks(value as string | undefined)
          }
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
              onChange={(value) =>
                actions.updateChangeLogField(index, "version", value)
              }
              placeholder="e.g., 1.0.0"
              required={true}
              error={getError(`releaseNotes.changeLog.${index}.version`)}
            />
            <DateField
              label="Date"
              name={`changeLog-${index}-date`}
              value={item.date}
              onChange={(value) =>
                actions.updateChangeLogField(index, "date", value)
              }
              required={true}
              error={getError(`releaseNotes.changeLog.${index}.date`)}
            />
            <InputField
              label="Author"
              name={`changeLog-${index}-author`}
              value={item.author}
              onChange={(value) =>
                actions.updateChangeLogField(index, "author", value)
              }
              placeholder="Author name"
              required={true}
              error={getError(`releaseNotes.changeLog.${index}.author`)}
            />
            <InputField
              label="Comment"
              name={`changeLog-${index}-comment`}
              value={item.comment}
              onChange={(value) =>
                actions.updateChangeLogField(index, "comment", value)
              }
              placeholder="Change description"
              required={true}
              error={getError(`releaseNotes.changeLog.${index}.comment`)}
            />
          </FormGroup>
        )}
      />
    </FormSection>
  );
}
