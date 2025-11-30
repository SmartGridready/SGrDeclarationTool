"use client";

import { AlternativeNamesForm as SharedAlternativeNamesForm } from "@/sections/shared/sections/alternative-names/alternative-names-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/sections/shared/hooks/use-profile-validation";

export function AlternativeNamesForm() {
  return (
    <SharedAlternativeNamesForm
      useStore={useProfileStore}
      useValidation={useProfileValidation}
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
