"use client";

import { ReleaseNotesForm as SharedReleaseNotesForm } from "@/sections/shared/release-notes/release-notes-form";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";
import { StoreState } from "@/sections/functional-profile/functional-profile-store";

/**
 * Functional Profile specific release notes form.
 * Uses the FunctionalProfileFormContext to connect to the store.
 */
export function ReleaseNotesForm() {
  const { useProfileState, useValidation, releaseNotesActions } = useFunctionalProfileFormContext();

  // Create a store hook adapter
  const useStore = <TSelected,>(selector: (store: StoreState) => TSelected): TSelected => {
    const profile = useProfileState((p) => p);
    const adaptedStore = {
      profile,
      ...releaseNotesActions,
    } as StoreState;
    return selector(adaptedStore);
  };

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
