import { useShallow } from "zustand/react/shallow";
import { FormSection } from "@/components/ui/forms/form-section";
import { SelectField } from "@/components/ui/forms/select-field";
import { InputField } from "@/components/ui/forms/input-field";
import { ArrayField } from "@/components/ui/forms/array-field";
import { FormGroup } from "@/components/ui/forms/form-group";
import { RELEASE_STATE_OPTIONS } from "@/lib/constants/form-options";
import { useProfileStore } from "@/store/profile-store";
import { ReleaseState, ChangeLog } from "@/lib/models/generic/base-types";

/**
 * Selects release notes state and actions with shallow comparison to prevent infinite loops.
 */
function useReleaseNotes() {
  return useProfileStore(
    useShallow((state) => ({
      // State
      releaseState: state.profile?.releaseNotes?.state,
      remarks: state.profile?.releaseNotes?.remarks,
      changeLogs: state.profile?.releaseNotes?.changeLog,
      hasReleaseNotes: !!state.profile?.releaseNotes,
      // Actions
      updateReleaseNotesState: state.updateReleaseNotesState,
      updateReleaseNotesRemarks: state.updateReleaseNotesRemarks,
      addEmptyChangeLog: state.addEmptyChangeLog,
      removeChangeLog: state.removeChangeLog,
      updateChangeLogField: state.updateChangeLogField,
      removeReleaseNotes: state.removeReleaseNotes,
    }))
  );
}

export function ReleaseNotesForm() {
  const {
    releaseState,
    remarks,
    changeLogs,
    hasReleaseNotes,
    updateReleaseNotesState,
    updateReleaseNotesRemarks,
    addEmptyChangeLog,
    removeChangeLog,
    updateChangeLogField,
    removeReleaseNotes,
  } = useReleaseNotes();

  const handleAdd = () => {
    // Initialize release notes with default state
    updateReleaseNotesState("Draft");
  };

  const handleRemove = () => {
    // Remove release notes from profile
    removeReleaseNotes();
  };

  return (
    <FormSection
      title={"Release Notes"}
      description={"Version and release information"}
      required={false}
      isAdded={hasReleaseNotes}
      onAdd={handleAdd}
      onRemove={handleRemove}
    >
      <FormGroup columns={2}>
        <SelectField
          label={"Release State"}
          name={"releaseState"}
          options={RELEASE_STATE_OPTIONS}
          required={true}
          value={releaseState}
          onChange={(value) => updateReleaseNotesState(value as ReleaseState)}
        />

        <InputField
          label={"Remarks"}
          name={"remarks"}
          required={false}
          value={remarks}
          onChange={(value) => updateReleaseNotesRemarks(value)}
        />
      </FormGroup>

      <ArrayField<ChangeLog>
        label="Change Log"
        items={changeLogs}
        onAdd={addEmptyChangeLog}
        onRemove={removeChangeLog}
        emptyMessage="No change log entries"
        renderItem={(item, index) => (
          <FormGroup columns={2}>
            <InputField
              label="Version"
              name={`changeLog-${index}-version`}
              value={item.version}
              onChange={(value) =>
                updateChangeLogField(index, "version", value)
              }
              placeholder="e.g., 1.0.0"
              required={true}
            />
            <InputField
              label="Date"
              name={`changeLog-${index}-date`}
              type="text"
              value={item.date}
              onChange={(value) => updateChangeLogField(index, "date", value)}
              required={true}
            />
            <InputField
              label="Author"
              name={`changeLog-${index}-author`}
              value={item.author}
              onChange={(value) => updateChangeLogField(index, "author", value)}
              placeholder="Author name"
              required={true}
            />
            <InputField
              label="Comment"
              name={`changeLog-${index}-comment`}
              value={item.comment}
              onChange={(value) =>
                updateChangeLogField(index, "comment", value)
              }
              placeholder="Change description"
              required={true}
            />
          </FormGroup>
        )}
      />
    </FormSection>
  );
}
