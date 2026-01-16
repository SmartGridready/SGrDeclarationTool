"use client";

import { AlternativeNamesForm as SharedAlternativeNamesForm } from "@/sections/shared/alternative-names/alternative-names-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";
import { useHasProfile, useProfileField } from "@/hooks/use-store-field";

/**
 * Functional Profile specific alternative names form.
 * Uses the profile store directly.
 */
export function AlternativeNamesForm() {
  const hasProfile = useHasProfile();
  // Subscribe only to alternativeNames section for targeted re-renders
  const alternativeNames = useProfileField((p) => p?.functionalProfile?.alternativeNames);
  const store = useProfileStore.getState();
  const useStore = createProfileStoreAdapter(store.profile, store);
  const useValidation = useProfileValidation;

  void alternativeNames;

  if (!hasProfile) {
    return null;
  }

  return (
    <SharedAlternativeNamesForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        alternativeNames: store.profile?.functionalProfile?.alternativeNames,
      })}
      isAddedSelector={(store) => !!store.profile?.functionalProfile?.alternativeNames}
      fieldPathPrefix="functionalProfile.alternativeNames"
      required={false}
      title="Alternative Names"
      description="Alternative naming conventions for the functional profile"
    />
  );
}
