"use client";

import { ProfileIdentificationForm as SharedProfileIdentificationForm } from "@/sections/shared/profile-identification/profile-identification-form";
import {
  useFunctionalProfileFormContext,
  buildProfileFieldPath,
} from "@/context/functional-profile-form-context";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";

/**
 * Functional Profile specific profile identification form.
 * Uses the FunctionalProfileFormContext to connect to the store.
 */
export function ProfileIdentificationForm() {
  const { useProfileState, useValidation, profileIdentificationActions, pathPrefix } =
    useFunctionalProfileFormContext();

  const profile = useProfileState((p) => p);
  const useStore = createProfileStoreAdapter(profile, profileIdentificationActions);

  const fieldPathPrefix = buildProfileFieldPath(
    pathPrefix,
    "functionalProfile.functionalProfileIdentification"
  );

  return (
    <SharedProfileIdentificationForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        functionalProfileIdentification:
          store.profile?.functionalProfile?.functionalProfileIdentification,
      })}
      fieldPathPrefix={fieldPathPrefix}
    />
  );
}
