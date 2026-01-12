"use client";

import { ProfileIdentificationForm as SharedProfileIdentificationForm } from "@/sections/shared/profile-identification/profile-identification-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";
import { useShallow } from "zustand/react/shallow";

/**
 * Functional Profile specific profile identification form.
 * Uses the profile store directly.
 */
export function ProfileIdentificationForm() {
  const profile = useProfileStore(useShallow((state) => state.profile));
  const store = useProfileStore.getState();
  const useStore = createProfileStoreAdapter(profile, store);
  const useValidation = useProfileValidation;

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
