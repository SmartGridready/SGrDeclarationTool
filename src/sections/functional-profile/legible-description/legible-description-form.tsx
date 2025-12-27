"use client";

import { LegibleDescriptionForm as SharedLegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import {
  useFunctionalProfileFormContext,
  buildProfileFieldPath,
} from "@/context/functional-profile-form-context";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";

/**
 * Functional Profile specific legible description form.
 * Uses the FunctionalProfileFormContext to connect to the store.
 */
export function LegibleDescriptionForm() {
  const { useProfileState, useValidation, legibleDescriptionActions, pathPrefix } =
    useFunctionalProfileFormContext();

  const profile = useProfileState((p) => p);
  const useStore = createProfileStoreAdapter(profile, legibleDescriptionActions);

  const fieldPathPrefix = buildProfileFieldPath(pathPrefix, "functionalProfile.legibleDescription");

  return (
    <SharedLegibleDescriptionForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        legibleDescriptions: store.profile?.functionalProfile?.legibleDescription,
      })}
      isAddedSelector={(store) => !!store.profile?.functionalProfile?.legibleDescription}
      fieldPathPrefix={fieldPathPrefix}
      required={false}
      title="Legible Description"
      description="Human-readable descriptions for the functional profile (max 4)"
      maxItems={4}
    />
  );
}
