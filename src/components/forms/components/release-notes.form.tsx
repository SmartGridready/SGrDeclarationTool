import { FormSection } from "@/components/ui/forms/form-section";
import { SelectField } from "@/components/ui/forms/select-field";
import { TextField } from "@/components/ui/forms/text-field";
import { ArrayField } from "@/components/ui/forms/array-field";
import { FormGroup } from "@/components/ui/forms/form-group";
import { RELEASE_STATE_OPTIONS } from "@/lib/constants/form-options";
import { useProfileStore } from "@/store/profile-store";
import { ReleaseState, ChangeLog } from "@/lib/models/generic/base-types";

export function ReleaseNotesForm() {
  const releaseState = useProfileStore(
    (state) => state.profile?.releaseNotes?.state
  );
  const updateReleaseNotesState = useProfileStore(
    (state) => state.updateReleaseNotesState
  );

  const remarks = useProfileStore(
    (state) => state.profile?.releaseNotes?.remarks
  );
  const updateReleaseNotesRemarks = useProfileStore(
    (state) => state.updateReleaseNotesRemarks
  );

  const changeLogs = useProfileStore(
    (state) => state.profile?.releaseNotes?.changeLog
  );
  const handleAddChangeLog = useProfileStore(
    (state) => state.handleAddChangeLog
  );
  const handleRemoveChangeLog = useProfileStore(
    (state) => state.handleRemoveChangeLog
  );
  const handleUpdateChangeLog = useProfileStore(
    (state) => state.handleUpdateChangeLog
  );

  return (
    <FormSection
      title={"Release Notes"}
      description={"Version and release information"}
      required={false}
    >
      <SelectField
        label={"Release State"}
        name={"releaseState"}
        options={RELEASE_STATE_OPTIONS}
        required={true}
        value={releaseState}
        onChange={(value) => updateReleaseNotesState(value as ReleaseState)}
      />

      <TextField
        label={"Remarks"}
        name={"remarks"}
        required={false}
        value={remarks}
        onChange={(value) => updateReleaseNotesRemarks(value)}
      />

      <ArrayField<ChangeLog>
        label="Change Log"
        items={changeLogs}
        onAdd={handleAddChangeLog}
        onRemove={handleRemoveChangeLog}
        emptyMessage="No change log entries"
        renderItem={(item, index) => (
          <FormGroup columns={2}>
            <TextField
              label="Version"
              name={`changeLog-${index}-version`}
              value={item.version}
              onChange={(value) =>
                handleUpdateChangeLog(index, "version", value)
              }
              placeholder="e.g., 1.0.0"
              required={true}
            />
            <TextField
              label="Date"
              name={`changeLog-${index}-date`}
              type="date"
              value={item.date}
              onChange={(value) => handleUpdateChangeLog(index, "date", value)}
              required={true}
            />
            <TextField
              label="Author"
              name={`changeLog-${index}-author`}
              value={item.author}
              onChange={(value) =>
                handleUpdateChangeLog(index, "author", value)
              }
              placeholder="Author name"
              required={true}
            />
            <TextField
              label="Comment"
              name={`changeLog-${index}-comment`}
              value={item.comment}
              onChange={(value) =>
                handleUpdateChangeLog(index, "comment", value)
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
