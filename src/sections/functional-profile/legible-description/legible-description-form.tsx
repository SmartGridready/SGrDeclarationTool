"use client";

import { LegibleDescriptionForm as SharedLegibleDescriptionForm } from "@/sections/shared/sections/legible-description/legible-description-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/sections/shared/hooks/use-profile-validation";

export function LegibleDescriptionForm() {
  return (
    <SharedLegibleDescriptionForm
      useStore={useProfileStore}
      useValidation={useProfileValidation}
      stateSelector={(store) => ({
        legibleDescriptions: store.profile?.functionalProfile?.legibleDescription,
      })}
      isAddedSelector={(store) => !!store.profile?.functionalProfile?.legibleDescription}
      fieldPathPrefix="functionalProfile.legibleDescription"
      required={false}
      title="Legible Description"
      description="Human-readable descriptions of the functional profile (max 4)"
    />
  );
}
