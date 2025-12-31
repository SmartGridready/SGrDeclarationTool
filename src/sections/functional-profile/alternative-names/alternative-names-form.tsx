"use client";

import { AlternativeNamesForm as SharedAlternativeNamesForm } from "@/sections/shared/alternative-names/alternative-names-form";
import { useFunctionalProfileFormContext, buildProfileFieldPath } from "@/context/functional-profile-form-context";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";

/**
 * Functional Profile specific alternative names form.
 * Uses the FunctionalProfileFormContext to connect to the store.
 */
export function AlternativeNamesForm() {
  const { useProfileState, useValidation, alternativeNamesActions, pathPrefix } = useFunctionalProfileFormContext();

  const profile = useProfileState((p) => p);
  const useStore = createProfileStoreAdapter(profile, alternativeNamesActions);

  const fieldPathPrefix = buildProfileFieldPath(pathPrefix, "functionalProfile.alternativeNames");

  return (
    <SharedAlternativeNamesForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        alternativeNames: store.profile?.functionalProfile?.alternativeNames,
      })}
      isAddedSelector={(store) => !!store.profile?.functionalProfile?.alternativeNames}
      fieldPathPrefix={fieldPathPrefix}
      required={false}
      title="Alternative Names"
      description="Alternative naming conventions for the functional profile"
    />
  );
}
