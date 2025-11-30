import { ReleaseNotesForm as SharedReleaseNotesForm } from "@/sections/shared/sections/release-notes/release-notes-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/sections/shared/hooks/use-profile-validation";

export function ReleaseNotesForm() {
  return (
    <SharedReleaseNotesForm
      useStore={useProfileStore}
      useValidation={useProfileValidation}
      stateSelector={(store) => ({
        releaseState: store.profile?.releaseNotes?.state,
        remarks: store.profile?.releaseNotes?.remarks,
        changeLogs: store.profile?.releaseNotes?.changeLog,
      })}
      isAddedSelector={(store) => !!store.profile?.releaseNotes}
      fieldPathPrefix="releaseNotes"
    />
  );
}
