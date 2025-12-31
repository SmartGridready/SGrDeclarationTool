"use client";

import { ReleaseNotesForm as SharedReleaseNotesForm } from "@/sections/shared/release-notes/release-notes-form";
import { useFunctionalProfileFormContext, buildProfileFieldPath } from "@/context/functional-profile-form-context";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";

/**
 * Functional Profile specific release notes form.
 * Uses the FunctionalProfileFormContext to connect to the store.
 */
export function ReleaseNotesForm() {
  const { useProfileState, useValidation, releaseNotesActions, pathPrefix } = useFunctionalProfileFormContext();

  const profile = useProfileState((p) => p);
  const useStore = createProfileStoreAdapter(profile, releaseNotesActions);

  const fieldPathPrefix = buildProfileFieldPath(pathPrefix, "releaseNotes");

  return (
    <SharedReleaseNotesForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        releaseState: store.profile?.releaseNotes?.state,
        remarks: store.profile?.releaseNotes?.remarks,
        changeLogs: store.profile?.releaseNotes?.changeLog,
      })}
      isAddedSelector={(store) => !!store.profile?.releaseNotes}
      fieldPathPrefix={fieldPathPrefix}
      required={false}
    />
  );
}
