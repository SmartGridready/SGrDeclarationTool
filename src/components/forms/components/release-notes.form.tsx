import { FormSection } from "@/components/ui/forms/form-section";
import { SelectField } from "@/components/ui/forms/select-field";
import { TextField } from "@/components/ui/forms/text-field";
import { RELEASE_STATE_OPTIONS } from "@/lib/constants/form-options";
import { useProfileStore } from "@/store/profile-store";
import { ReleaseState } from "@/lib/models/generic/base-types";

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
    </FormSection>
  );
}
