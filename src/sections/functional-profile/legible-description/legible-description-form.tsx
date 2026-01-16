"use client";

import { LegibleDescriptionForm as SharedLegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";
import { useHasProfile, useProfileField } from "@/hooks/use-store-field";

/**
 * Functional Profile specific legible description form.
 * Uses the profile store directly.
 */
export function LegibleDescriptionForm() {
  const hasProfile = useHasProfile();
  // Subscribe only to legibleDescription section for targeted re-renders
  const legibleDescription = useProfileField((p) => p?.functionalProfile?.legibleDescription);
  const store = useProfileStore.getState();
  const useStore = createProfileStoreAdapter(store.profile, store);
  const useValidation = useProfileValidation;

  void legibleDescription;

  if (!hasProfile) {
    return null;
  }

  return (
    <SharedLegibleDescriptionForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        legibleDescriptions: store.profile?.functionalProfile?.legibleDescription,
      })}
      isAddedSelector={(store) => !!store.profile?.functionalProfile?.legibleDescription}
      fieldPathPrefix="functionalProfile.legibleDescription"
      required={false}
      title="Legible Description"
      description="Human-readable descriptions for the functional profile (max 4)"
      maxItems={4}
    />
  );
}
