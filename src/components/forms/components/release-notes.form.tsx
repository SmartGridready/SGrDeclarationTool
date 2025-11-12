import { FormSection } from "@/components/ui/forms/form-section";
import { SelectField } from "@/components/ui/forms/select-field";
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

  return (
    <FormSection
      title={"Release Notes"}
      description={"Version and release information"}
    >
      <SelectField
        label={"Release State"}
        name={"releaseState"}
        options={RELEASE_STATE_OPTIONS}
        value={releaseState}
        onChange={(value) => updateReleaseNotesState(value as ReleaseState)}
      />
    </FormSection>
  );
}
