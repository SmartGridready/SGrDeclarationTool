"use client";

import { ProfileIdentificationForm as SharedProfileIdentificationForm } from "@/sections/shared/profile-identification/profile-identification-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";
import { useHasProfile, useProfileField } from "@/hooks/use-store-field";

/**
 * Functional Profile specific profile identification form.
 * Uses the profile store directly.
 */
export function ProfileIdentificationForm() {
  const hasProfile = useHasProfile();
  // Subscribe only to functionalProfileIdentification section for targeted re-renders
  const functionalProfileIdentification = useProfileField((p) => p?.functionalProfile?.functionalProfileIdentification);
  const store = useProfileStore.getState();
  const useStore = createProfileStoreAdapter(store.profile, store);
  const useValidation = useProfileValidation;

  void functionalProfileIdentification;

  if (!hasProfile) {
    return null;
  }

  return (
    <SharedProfileIdentificationForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        functionalProfileIdentification: store.profile?.functionalProfile?.functionalProfileIdentification,
      })}
      fieldPathPrefix="functionalProfile.functionalProfileIdentification"
    />
  );
}
