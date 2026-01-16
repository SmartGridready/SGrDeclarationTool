"use client";

import { ReleaseNotesForm as SharedReleaseNotesForm } from "@/sections/shared/release-notes/release-notes-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";
import { useHasProfile, useProfileField } from "@/hooks/use-store-field";

/**
 * Functional Profile specific release notes form.
 * Uses the profile store directly.
 */
export function ReleaseNotesForm() {
  const hasProfile = useHasProfile();
  // Subscribe only to releaseNotes section for targeted re-renders
  const releaseNotes = useProfileField((p) => p?.releaseNotes);
  const store = useProfileStore.getState();
  const useStore = createProfileStoreAdapter(store.profile, store);
  const useValidation = useProfileValidation;

  void releaseNotes;

  if (!hasProfile) {
    return null;
  }

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
      fieldPathPrefix="releaseNotes"
      required={false}
    />
  );
}
