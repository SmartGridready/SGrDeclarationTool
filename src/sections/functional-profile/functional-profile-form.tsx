"use client";

import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { StandaloneFunctionalProfileFormProvider } from "@/sections/functional-profile/functional-profile-form-provider";
import { FunctionalProfileForm as SharedFunctionalProfileForm } from "@/sections/functional-profile/functional-profile-main-form";

/**
 * Standalone Functional Profile Form
 * This wraps the shared FunctionalProfileForm with the provider
 * that connects it to the standalone profile store.
 */
export function FunctionalProfileForm() {
  const { profile } = useProfileStore();

  if (!profile) {
    return null;
  }

  return (
    <StandaloneFunctionalProfileFormProvider>
      <SharedFunctionalProfileForm />
    </StandaloneFunctionalProfileFormProvider>
  );
}
