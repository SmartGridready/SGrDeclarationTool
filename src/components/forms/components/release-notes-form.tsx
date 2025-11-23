import { useShallow } from "zustand/react/shallow";
import { FormSection } from "@/components/ui/forms/form-section";
import { SelectField } from "@/components/ui/forms/select-field";
import { InputField } from "@/components/ui/forms/input-field";
import { DateField } from "@/components/ui/forms/date-field";
import { ArrayField } from "@/components/ui/forms/array-field";
import { FormGroup } from "@/components/ui/forms/form-group";
import { RELEASE_STATE_OPTIONS } from "@/lib/constants/form-options";
import { useProfileStore } from "@/store/profile-store";
import { ReleaseState, ChangeLog } from "@/lib/models/generic/base-types";
import { useProfileValidation } from "@/hooks/use-profile-validation";

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
      updateReleaseState: state.updateReleaseState,
      updateRemarks: state.updateRemarks,
      addEmptyChangeLog: state.addEmptyChangeLog,
      removeChangeLog: state.removeChangeLog,
      updateChangeLogField: state.updateChangeLogField,
      addReleaseNotes: state.addReleaseNotes,
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
    updateReleaseState,
    updateRemarks,
    addEmptyChangeLog,
    removeChangeLog,
    updateChangeLogField,
    addReleaseNotes,
    removeReleaseNotes,
  } = useReleaseNotes();

  const { getError } = useProfileValidation();

  const handleAdd = () => {
    // Initialize release notes with default state
    addReleaseNotes();
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
          onChange={(value) => updateReleaseState(value as ReleaseState)}
          error={getError("releaseNotes.state")}
        />

        <InputField
          label={"Remarks"}
          name={"remarks"}
          required={false}
          value={remarks}
          onChange={(value) => updateRemarks(value as string | undefined)}
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
              error={getError(`releaseNotes.changeLog.${index}.version`)}
            />
            <DateField
              label="Date"
              name={`changeLog-${index}-date`}
              value={item.date}
              onChange={(value) => updateChangeLogField(index, "date", value)}
              required={true}
              error={getError(`releaseNotes.changeLog.${index}.date`)}
            />
            <InputField
              label="Author"
              name={`changeLog-${index}-author`}
              value={item.author}
              onChange={(value) => updateChangeLogField(index, "author", value)}
              placeholder="Author name"
              required={true}
              error={getError(`releaseNotes.changeLog.${index}.author`)}
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
              error={getError(`releaseNotes.changeLog.${index}.comment`)}
            />
          </FormGroup>
        )}
      />
    </FormSection>
  );
}
