"use client";

import { ReleaseNotesForm as SharedReleaseNotesForm } from "@/sections/shared/release-notes/release-notes-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";
import { useShallow } from "zustand/react/shallow";

/**
 * Functional Profile specific release notes form.
 * Uses the profile store directly.
 */
export function ReleaseNotesForm() {
  const profile = useProfileStore(useShallow((state) => state.profile));
  const store = useProfileStore.getState();
  const useStore = createProfileStoreAdapter(profile, store);
  const useValidation = useProfileValidation;

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
